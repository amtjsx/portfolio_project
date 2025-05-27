import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./create-contact.dto";

@Injectable()
export class ContactService {
  private contacts = [];

  create(createContactDto: CreateContactDto) {
    const newContact = {
      id: this.contacts.length + 1,
      ...createContactDto,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    this.contacts.push(newContact);

    // Here you would typically send an email notification
    // or save to a database

    return {
      message: "Contact form submitted successfully",
      id: newContact.id,
    };
  }

  findAll() {
    return {
      data: this.contacts,
      total: this.contacts.length,
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
