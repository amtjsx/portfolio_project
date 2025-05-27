import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsArray, IsBoolean, IsOptional, IsIn } from "class-validator"

export class CreateProjectDto {
  @ApiProperty({
    description: "Project title",
    example: "E-commerce Platform",
  })
  @IsString()
  title: string

  @ApiProperty({
    description: "Short project description",
    example: "Full-stack e-commerce solution with React and Node.js",
  })
  @IsString()
  description: string

  @ApiProperty({
    description: "Detailed project description",
    example: "A comprehensive e-commerce platform featuring user authentication...",
    required: false,
  })
  @IsOptional()
  @IsString()
  longDescription?: string

  @ApiProperty({
    description: "Technologies used in the project",
    example: ["React", "Node.js", "PostgreSQL"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  technologies: string[]

  @ApiProperty({
    description: "Project category",
    example: "web",
  })
  @IsString()
  category: string

  @ApiProperty({
    description: "GitHub repository URL",
    example: "https://github.com/username/project",
    required: false,
  })
  @IsOptional()
  @IsString()
  githubUrl?: string

  @ApiProperty({
    description: "Live demo URL",
    example: "https://project-demo.com",
    required: false,
  })
  @IsOptional()
  @IsString()
  liveUrl?: string

  @ApiProperty({
    description: "Project image URL (use /api/upload/image endpoint to upload)",
    example: "/api/upload/files/image-1234567890-987654321.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({
    description: "Whether the project is featured",
    example: true,
  })
  @IsBoolean()
  featured: boolean

  @ApiProperty({
    description: "Project start date",
    example: "2023-01-01",
  })
  @IsString()
  startDate: string

  @ApiProperty({
    description: "Project end date",
    example: "2023-06-30",
    required: false,
  })
  @IsOptional()
  @IsString()
  endDate?: string

  @ApiProperty({
    description: "Project status",
    example: "completed",
    enum: ["completed", "in-progress", "planned"],
  })
  @IsIn(["completed", "in-progress", "planned"])
  status: "completed" | "in-progress" | "planned"
}
