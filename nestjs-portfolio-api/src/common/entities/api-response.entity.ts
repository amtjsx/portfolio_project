import { ApiProperty } from "@nestjs/swagger"

export class ApiResponseEntity<T> {
  @ApiProperty({ description: "Response data" })
  data: T

  @ApiProperty({ description: "Total count of items", example: 10 })
  total?: number

  @ApiProperty({ description: "Response message", example: "Success" })
  message?: string

  @ApiProperty({ description: "Response status", example: "success" })
  status?: string
}

export class ProjectEntity {
  @ApiProperty({ description: "Project ID", example: 1 })
  id: number

  @ApiProperty({ description: "Project title", example: "E-commerce Platform" })
  title: string

  @ApiProperty({ description: "Project description", example: "Full-stack e-commerce solution" })
  description: string

  @ApiProperty({ description: "Detailed description", required: false })
  longDescription?: string

  @ApiProperty({ description: "Technologies used", example: ["React", "Node.js"] })
  technologies: string[]

  @ApiProperty({ description: "Project category", example: "web" })
  category: string

  @ApiProperty({ description: "GitHub URL", required: false })
  githubUrl?: string

  @ApiProperty({ description: "Live demo URL", required: false })
  liveUrl?: string

  @ApiProperty({ description: "Project image URL", required: false })
  imageUrl?: string

  @ApiProperty({ description: "Featured project flag", example: true })
  featured: boolean

  @ApiProperty({ description: "Start date", example: "2023-01-01" })
  startDate: string

  @ApiProperty({ description: "End date", required: false })
  endDate?: string

  @ApiProperty({ description: "Project status", example: "completed" })
  status: string
}
