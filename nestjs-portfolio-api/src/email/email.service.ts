import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

interface EmailOptions {
  to: string
  subject: string
  template: string
  context: Record<string, any>
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(private configService: ConfigService) {}

  async sendEmail(options: EmailOptions): Promise<void> {
    // In a real application, you would integrate with an email service like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Nodemailer with SMTP

    this.logger.log(`Sending email to: ${options.to}`)
    this.logger.log(`Subject: ${options.subject}`)
    this.logger.log(`Template: ${options.template}`)
    this.logger.log(`Context: ${JSON.stringify(options.context, null, 2)}`)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For development, log the email content
    if (this.configService.get("NODE_ENV") === "development") {
      this.logEmailContent(options)
    }

    this.logger.log(`Email sent successfully to: ${options.to}`)
  }

  private logEmailContent(options: EmailOptions): void {
    const templates = {
      "email-verification": this.getEmailVerificationTemplate(options.context),
      "password-reset": this.getPasswordResetTemplate(options.context),
      "login-verification": this.getLoginVerificationTemplate(options.context),
    }

    const content = templates[options.template] || "Template not found"

    console.log("\n" + "=".repeat(60))
    console.log(`📧 EMAIL CONTENT (${options.template})`)
    console.log("=".repeat(60))
    console.log(`To: ${options.to}`)
    console.log(`Subject: ${options.subject}`)
    console.log("-".repeat(60))
    console.log(content)
    console.log("=".repeat(60) + "\n")
  }

  private getEmailVerificationTemplate(context: any): string {
    return `
Hello ${context.firstName} ${context.lastName},

Welcome to our platform! Please verify your email address using the code below:

🔐 Verification Code: ${context.code}

This code will expire in ${context.expiresIn}.

If you didn't create an account, please ignore this email.

Best regards,
The Portfolio Team
    `.trim()
  }

  private getPasswordResetTemplate(context: any): string {
    return `
Hello ${context.firstName} ${context.lastName},

You requested a password reset for your account. Use the code below to reset your password:

🔐 Reset Code: ${context.code}

This code will expire in ${context.expiresIn}.

If you didn't request a password reset, please ignore this email and your password will remain unchanged.

Best regards,
The Portfolio Team
    `.trim()
  }

  private getLoginVerificationTemplate(context: any): string {
    return `
Hello ${context.firstName} ${context.lastName},

We detected a login attempt to your account. Use the code below to complete your login:

🔐 Login Code: ${context.code}

This code will expire in ${context.expiresIn}.

If this wasn't you, please secure your account immediately.

Best regards,
The Portfolio Team
    `.trim()
  }
}
