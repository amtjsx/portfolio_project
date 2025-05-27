import { ApiProperty } from "@nestjs/swagger"

export class FileUploadResponseDto {
  @ApiProperty({ description: "File ID", example: 1234567890 })
  id: number

  @ApiProperty({ description: "User ID", example: 1 })
  userId: string

  @ApiProperty({ description: "Original file name", example: "resume.pdf" })
  originalName: string

  @ApiProperty({ description: "Stored file name", example: "resume-1234567890-123456789.pdf" })
  filename: string

  @ApiProperty({ description: "File path", example: "./uploads/resumes/resume-1234567890-123456789.pdf" })
  path: string

  @ApiProperty({ description: "File MIME type", example: "application/pdf" })
  mimetype: string

  @ApiProperty({ description: "File size in bytes", example: 1024000 })
  size: number

  @ApiProperty({ description: "File type", example: "resume", enum: ["resume", "image", "avatar", "projectImage"] })
  type: "resume" | "image" | "avatar" | "projectImage"

  @ApiProperty({ description: "File URL", example: "/api/upload/files/resume-1234567890-123456789.pdf" })
  url: string

  @ApiProperty({ description: "Upload timestamp", example: "2024-01-01T00:00:00.000Z" })
  uploadedAt: string
}

export class MultipleFileUploadResponseDto {
  @ApiProperty({ description: "Uploaded files", type: [FileUploadResponseDto] })
  uploadedFiles: FileUploadResponseDto[]

  @ApiProperty({ description: "Total number of files", example: 3 })
  totalFiles: number

  @ApiProperty({ description: "Total size of all files", example: 2048000 })
  totalSize: number

  @ApiProperty({ description: "Success message", example: "Successfully uploaded 3 files" })
  message: string
}
