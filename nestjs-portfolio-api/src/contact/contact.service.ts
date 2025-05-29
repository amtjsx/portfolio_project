import { Injectable } from "@nestjs/common";
import { User } from "../user/models/user.model";
import { CreateContactDto } from "./dto/create-contact.dto";
import { Contact } from "./models/contact.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact) private readonly contactModel: typeof Contact
  ) {}

  async create(createContactDto: CreateContactDto, user: User) {
    const exist = await this.contactModel.findByPk(user.id);

    if (exist) {
      await exist.update({
        ...createContactDto,
        status: "new",
      });

      return {
        message: "Contact form updated successfully",
        id: exist.id,
        contact: exist,
      };
    }

    const contact = await this.contactModel.create({
      ...createContactDto,
      status: "new",
      userId: user.id,
      id: user.id,
    });

    // Here you would typically send an email notification
    // or integrate with an email service

    return {
      message: "Contact form submitted successfully",
      id: contact.id,
      contact,
    };
  }

  async findAll() {
    const contacts = await this.contactModel.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: contacts,
      total: contacts.length,
    };
  }

  async findOne(id: number) {
    const contact = await this.contactModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          required: false,
        },
      ],
    });

    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  async updateStatus(
    id: number,
    status: "new" | "read" | "replied" | "archived"
  ) {
    const contact = await this.contactModel.findByPk(id);

    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }

    await contact.update({ status });
    return contact;
  }

  async findByStatus(status: "new" | "read" | "replied" | "archived") {
    const contacts = await this.contactModel.findAll({
      where: { status },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: contacts,
      total: contacts.length,
      status,
    };
  }

  async findByUserId(userId: string) {
    const contacts = await this.contactModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return {
      data: contacts,
      total: contacts.length,
    };
  }

  async getContactStats() {
    const total = await this.contactModel.count();
    const newCount = await this.contactModel.count({
      where: { status: "new" },
    });
    const readCount = await this.contactModel.count({
      where: { status: "read" },
    });
    const repliedCount = await this.contactModel.count({
      where: { status: "replied" },
    });
    const archivedCount = await this.contactModel.count({
      where: { status: "archived" },
    });

    return {
      total,
      new: newCount,
      read: readCount,
      replied: repliedCount,
      archived: archivedCount,
    };
  }

  getContactInfo() {
    return {
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      address: "Your City, Your Country",
      availability: "Available for freelance projects",
      responseTime: "Usually responds within 24 hours",
      socialMedia: {
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
      },
    };
  }
}
