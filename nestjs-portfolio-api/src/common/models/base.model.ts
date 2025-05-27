import { Column, DataType, Model } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"

export class BaseModel<T> extends Model<T> {
  @ApiProperty({ description: "Soft delete timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
  })
  deletedAt: Date

  /**
   * Soft delete the record by setting deletedAt to current timestamp
   */
  async softDelete(): Promise<void> {
    this.deletedAt = new Date()
    await this.save()
  }

  /**
   * Restore a soft-deleted record by setting deletedAt to null
   */
  async restore(): Promise<void> {
    this.deletedAt = null
    await this.save()
  }

  /**
   * Check if the record is soft-deleted
   */
  isSoftDeleted(): boolean {
    return this.deletedAt !== null
  }
}
