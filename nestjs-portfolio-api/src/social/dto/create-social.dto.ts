import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

export class CreateSocialDto {
  @ApiProperty({
    description: "Portfolio ID this social link belongs to",
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsString()
  portfolioId?: string;

  @ApiProperty({
    description: "Social media platform",
    example: "linkedin",
    enum: [
      "linkedin",
      "github",
      "twitter",
      "instagram",
      "facebook",
      "youtube",
      "dribbble",
      "behance",
      "medium",
      "dev",
      "stackoverflow",
      "codepen",
      "discord",
      "telegram",
      "whatsapp",
      "tiktok",
      "snapchat",
      "pinterest",
      "reddit",
      "twitch",
      "spotify",
      "website",
      "blog",
      "other",
    ],
  })
  @IsIn([
    "linkedin",
    "github",
    "twitter",
    "instagram",
    "facebook",
    "youtube",
    "dribbble",
    "behance",
    "medium",
    "dev",
    "stackoverflow",
    "codepen",
    "discord",
    "telegram",
    "whatsapp",
    "tiktok",
    "snapchat",
    "pinterest",
    "reddit",
    "twitch",
    "spotify",
    "website",
    "blog",
    "other",
  ])
  platform:
    | "linkedin"
    | "github"
    | "twitter"
    | "instagram"
    | "facebook"
    | "youtube"
    | "dribbble"
    | "behance"
    | "medium"
    | "dev"
    | "stackoverflow"
    | "codepen"
    | "discord"
    | "telegram"
    | "whatsapp"
    | "tiktok"
    | "snapchat"
    | "pinterest"
    | "reddit"
    | "twitch"
    | "spotify"
    | "website"
    | "blog"
    | "other";

  @ApiProperty({
    description: "Social media profile URL",
    example: "https://linkedin.com/in/johndoe",
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: "Display label for the social link",
    example: "Professional LinkedIn",
    required: false,
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({
    description: "Username or handle on the platform",
    example: "johndoe",
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: "Custom icon URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiProperty({
    description: "Display order for sorting",
    example: 1,
    minimum: 0,
    maximum: 999,
  })
  @IsInt()
  @Min(0)
  @Max(999)
  displayOrder: number;

  @ApiProperty({
    description: "Whether the link is active/visible",
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: "Whether to show in main navigation",
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  showInNav?: boolean;

  @ApiProperty({
    description: "Whether to open link in new tab",
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  openInNewTab?: boolean;

  @ApiProperty({
    description: "Link description or bio",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Follower count (if applicable)",
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  followerCount?: number;

  @ApiProperty({
    description: "Additional metadata",
    required: false,
    example: {
      profilePicture: "https://example.com/avatar.jpg",
      bio: "Software Developer",
      location: "New York, USA",
      isBusinessAccount: false,
    },
  })
  @IsOptional()
  metadata?: {
    profilePicture?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate?: string;
    isBusinessAccount?: boolean;
    customFields?: Record<string, any>;
  };
}
