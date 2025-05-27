import { Injectable } from "@nestjs/common"
import { Sequelize } from "sequelize-typescript"

@Injectable()
export class DatabaseService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate()
      return true
    } catch (error) {
      console.error("Database connection failed:", error)
      return false
    }
  }

  async getDatabaseInfo() {
    try {
      const [results] = await this.sequelize.query(`
        SELECT 
          current_database() as database_name,
          version() as version,
          current_user as current_user,
          inet_server_addr() as server_address,
          inet_server_port() as server_port
      `)

      return results[0]
    } catch (error) {
      throw new Error(`Failed to get database info: ${error.message}`)
    }
  }

  async getTableStats() {
    try {
      const [results] = await this.sequelize.query(`
        SELECT 
          schemaname,
          tablename,
          attname,
          n_distinct,
          correlation
        FROM pg_stats 
        WHERE schemaname = 'public'
        ORDER BY tablename, attname
      `)

      return results
    } catch (error) {
      throw new Error(`Failed to get table stats: ${error.message}`)
    }
  }

  async syncDatabase(force = false) {
    try {
      await this.sequelize.sync({ force })
      return { message: "Database synchronized successfully" }
    } catch (error) {
      throw new Error(`Failed to sync database: ${error.message}`)
    }
  }

  async getConnectionInfo() {
    const config = this.sequelize.config
    return {
      // dialect: config.dialect,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      pool: config.pool,
    }
  }

  async getModelStats() {
    const models = this.sequelize.models
    const stats = {}

    for (const [modelName, model] of Object.entries(models)) {
      try {
        const count = await model.count()
        stats[modelName] = {
          count,
          tableName: model.tableName,
          attributes: Object.keys(model.rawAttributes),
        }
      } catch (error) {
        stats[modelName] = {
          error: error.message,
        }
      }
    }

    return stats
  }
}
