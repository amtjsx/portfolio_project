import { NotFoundException } from "@nestjs/common"
import { ModelCtor } from "sequelize"
import { BaseModel } from "../models/base.model"

export class BaseService<T extends BaseModel<T>> {
  constructor(protected readonly model: ModelCtor<T>) {}

  /**
   * Find all records (excluding soft-deleted by default)
   */
  async findAll(options: any = {}): Promise<T[]> {
    return this.model.findAll(options)
  }

  /**
   * Find all records including soft-deleted ones
   */
  async findAllWithDeleted(options: any = {}): Promise<T[]> {
    return this.model.scope("withDeleted").findAll(options)
  }

  /**
   * Find only soft-deleted records
   */
  async findOnlyDeleted(options: any = {}): Promise<T[]> {
    return this.model.scope("onlyDeleted").findAll(options)
  }

  /**
   * Find one record by ID (excluding soft-deleted by default)
   */
  async findById(id: string, options: any = {}): Promise<T> {
    const record = await this.model.findByPk(id, options)
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`)
    }
    return record
  }

  /**
   * Find one record by ID including soft-deleted ones
   */
  async findByIdWithDeleted(id: string, options: any = {}): Promise<T> {
    const record = await this.model.scope("withDeleted").findByPk(id, options)
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`)
    }
    return record
  }

  /**
   * Soft delete a record
   */
  async softDelete(id: string): Promise<void> {
    const record = await this.findById(id)
    await record.softDelete()
  }

  /**
   * Restore a soft-deleted record
   */
  async restore(id: string): Promise<T> {
    const record = await this.findByIdWithDeleted(id)
    if (!record.deletedAt) {
      throw new NotFoundException(`Record with ID ${id} is not deleted`)
    }
    await record.restore()
    return record
  }

  /**
   * Permanently delete a record
   */
  async permanentDelete(id: string): Promise<void> {
    const record = await this.findByIdWithDeleted(id)
    await record.destroy({ force: true })
  }
}
