import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsDate,
  IsBoolean,
  IsEnum,
  IsUrl,
  IsArray,
  IsObject,
  IsNumber,
} from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { EducationType } from "../models/education.model"

export class CreateEducationDto {
  @ApiProperty({ description: "Institution name" })
  @IsNotEmpty()
  @IsString()
  institutionName: string

  @ApiPropertyOptional({ description: "Institution logo URL" })
  @IsOptional()
  @IsString()
  institutionLogo?: string

  @ApiPropertyOptional({ description: "Institution website URL" })
  @IsOptional()
  @IsUrl()
  institutionUrl?: string

  @ApiProperty({ description: "Degree or qualification obtained" })
  @IsNotEmpty()
  @IsString()
  degree: string

  @ApiProperty({ description: "Field of study" })
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string

  @ApiPropertyOptional({
    description: "Type of education",
    enum: EducationType,
    enumName: "EducationType",
  })
  @IsOptional()
  @IsEnum(EducationType)
  educationType?: EducationType

  @ApiProperty({ description: "Start date of education" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @ApiPropertyOptional({ description: "End date of education (leave empty if current)" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date

  @ApiPropertyOptional({ description: "Whether this is current education" })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean

  @ApiPropertyOptional({ description: "Location of the institution" })
  @IsOptional()
  @IsString()
  location?: string

  @ApiPropertyOptional({ description: "Whether education was remote/online" })
  @IsOptional()
  @IsBoolean()
  isRemote?: boolean

  @ApiPropertyOptional({ description: "GPA or grade achieved" })
  @IsOptional()
  @IsString()
  gpa?: string

  @ApiPropertyOptional({ description: "Description of education" })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({ description: "List of courses taken" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  courses?: string[]

  @ApiPropertyOptional({ description: "Honors received" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  honors?: string[]

  @ApiPropertyOptional({ description: "Activities participated in" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activities?: string[]

  @ApiPropertyOptional({ description: "Projects completed during education" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[]

  @ApiPropertyOptional({ description: "Achievements during education" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[]

  @ApiPropertyOptional({ description: "Skills acquired during education" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[]

  @ApiPropertyOptional({ description: "Whether to highlight this education" })
  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean

  @ApiPropertyOptional({ description: "Display order for sorting" })
  @IsOptional()
  @IsNumber()
  displayOrder?: number

  @ApiPropertyOptional({ description: "URL to certificate or diploma" })
  @IsOptional()
  @IsUrl()
  certificateUrl?: string

  @ApiPropertyOptional({ description: "Additional information (JSON)" })
  @IsOptional()
  @IsObject()
  additionalInfo?: object
}
