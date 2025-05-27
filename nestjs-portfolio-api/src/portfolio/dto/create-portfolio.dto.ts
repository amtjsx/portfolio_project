import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsHexColor,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class CreatePortfolioDto {
  @ApiProperty({
    description: "Portfolio title",
    example: "John Doe - Full Stack Developer",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Portfolio subtitle",
    example: "Passionate about creating amazing web experiences",
  })
  @IsString()
  subtitle: string;

  @ApiProperty({
    description: "Professional summary",
    example: "Experienced developer with 5+ years in web development...",
  })
  @IsString()
  summary: string;

  @ApiProperty({
    description: "Portfolio theme",
    example: "modern",
    enum: ["modern", "classic", "minimal", "creative"],
  })
  @IsIn(["modern", "classic", "minimal", "creative"])
  theme: "modern" | "classic" | "minimal" | "creative";

  @ApiProperty({
    description: "Primary color for the portfolio",
    example: "#3B82F6",
  })
  @IsHexColor()
  primaryColor: string;

  @ApiProperty({
    description: "Secondary color for the portfolio",
    example: "#1E40AF",
  })
  @IsHexColor()
  secondaryColor: string;

  @ApiProperty({
    description: "Portfolio visibility",
    example: "public",
    enum: ["public", "private", "unlisted"],
  })
  @IsIn(["public", "private", "unlisted"])
  visibility: "public" | "private" | "unlisted";

  @ApiProperty({
    description: "Custom domain for the portfolio",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  customDomain?: string;

  @ApiProperty({
    description: "SEO meta title",
    required: false,
  })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiProperty({
    description: "SEO meta description",
    required: false,
  })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({
    description: "SEO keywords",
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metaKeywords?: string[];

  @ApiProperty({
    description: "Portfolio sections configuration",
    example: {
      about: true,
      skills: true,
      experience: true,
      education: true,
      projects: true,
      contact: true,
      testimonials: false,
      blog: false,
    },
  })
  @IsObject()
  sections: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    contact: boolean;
    testimonials: boolean;
    blog: boolean;
  };

  @ApiProperty({
    description: "Social media links",
    required: false,
    example: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  })
  @IsOptional()
  @IsObject()
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    dribbble?: string;
    behance?: string;
  };

  @ApiProperty({
    description: "Portfolio settings",
    example: {
      showContactForm: true,
      allowDownloadResume: true,
      enableAnalytics: true,
      enableComments: false,
      maintenanceMode: false,
    },
  })
  @IsObject()
  settings: {
    showContactForm: boolean;
    allowDownloadResume: boolean;
    enableAnalytics: boolean;
    enableComments: boolean;
    maintenanceMode: boolean;
  };

  @ApiProperty({
    description: "Resume/CV file URL",
    required: false,
    example: "/api/upload/files/resume-1234567890-123456789.pdf",
  })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiProperty({
    description: "Portfolio cover image URL",
    required: false,
    example: "/api/upload/files/image-1234567890-987654321.jpg",
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    description: "Profile avatar URL",
    required: false,
    example: "/api/upload/files/image-1234567890-555555555.jpg",
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: "Portfolio publication status",
    example: true,
  })
  @IsBoolean()
  isPublished: boolean;
}
