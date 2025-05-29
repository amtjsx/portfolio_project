import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("contact")
@Controller("contact")
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: "Submit contact form" })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({
    status: 201,
    description: "Contact form submitted successfully",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Contact form submitted successfully",
        },
        id: { type: "number", example: 1 },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createContactDto: CreateContactDto, @Request() req: any) {
    return this.contactService.create(createContactDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: "Get all contact submissions (Admin only)" })
  @ApiResponse({
    status: 200,
    description: "Contact submissions retrieved successfully",
    schema: {
      type: "object",
      properties: {
        data: { type: "array", items: { type: "object" } },
        total: { type: "number", example: 5 },
      },
    },
  })
  findAll() {
    return this.contactService.findAll();
  }

  @Get("stats")
  @ApiOperation({ summary: "Get contact statistics" })
  @ApiResponse({
    status: 200,
    description: "Contact statistics retrieved successfully",
  })
  getStats() {
    return this.contactService.getContactStats();
  }

  @Get("status/:status")
  @ApiOperation({ summary: "Get contacts by status" })
  @ApiParam({ name: "status", enum: ["new", "read", "replied", "archived"] })
  @ApiResponse({
    status: 200,
    description: "Contacts by status retrieved successfully",
  })
  findByStatus(
    @Param("status") status: "new" | "read" | "replied" | "archived"
  ) {
    return this.contactService.findByStatus(status);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get contacts for a specific user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "User contacts retrieved successfully",
  })
  findByUserId(@Param("userId") userId: string) {
    return this.contactService.findByUserId(userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific contact by ID" })
  @ApiParam({ name: "id", description: "Contact ID", example: 1 })
  @ApiResponse({ status: 200, description: "Contact retrieved successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  findOne(@Param("id") id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update contact status" })
  @ApiParam({ name: "id", description: "Contact ID", example: 1 })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["new", "read", "replied", "archived"],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Contact status updated successfully",
  })
  updateStatus(
    @Param("id") id: string,
    body: { status: "new" | "read" | "replied" | "archived" }
  ) {
    return this.contactService.updateStatus(+id, body.status);
  }

  @Get("info")
  @ApiOperation({ summary: "Get contact information" })
  @ApiResponse({
    status: 200,
    description: "Contact information retrieved successfully",
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "your.email@example.com" },
        phone: { type: "string", example: "+1 (555) 123-4567" },
        address: { type: "string", example: "Your City, Your Country" },
        availability: {
          type: "string",
          example: "Available for freelance projects",
        },
        responseTime: {
          type: "string",
          example: "Usually responds within 24 hours",
        },
        socialMedia: {
          type: "object",
          properties: {
            linkedin: { type: "string" },
            github: { type: "string" },
            twitter: { type: "string" },
          },
        },
      },
    },
  })
  getContactInfo() {
    return this.contactService.getContactInfo();
  }
}
