import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

export const databaseConfig = (
  configService: ConfigService
): SequelizeModuleOptions => ({
  dialect: "mysql",
  host: configService.get("DATABASE_HOST", "localhost"),
  port: configService.get("DATABASE_PORT", 3306),
  username: configService.get("DATABASE_USERNAME", "root"),
  password: configService.get("DATABASE_PASSWORD", "new_password"),
  database: configService.get("DATABASE_NAME", "portfolio"),
  autoLoadModels: true,
  synchronize: false,
  // configService.get("NODE_ENV") === "development",
  logging:
    configService.get("NODE_ENV") === "development" ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});
