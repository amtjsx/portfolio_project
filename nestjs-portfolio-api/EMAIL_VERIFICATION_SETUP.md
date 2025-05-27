# Email Verification Setup Guide

## 📧 Email Verification System

The portfolio API now includes a comprehensive email verification system with 6-digit codes.

### Features

- **6-digit verification codes** - Cryptographically secure random codes
- **Multiple verification types** - Email verification, password reset, login verification
- **Rate limiting** - Maximum 3 codes per hour per email
- **Attempt tracking** - Maximum 5 attempts per code
- **Automatic expiration** - Codes expire after 15 minutes
- **IP and User Agent tracking** - Security audit trail
- **Email templates** - Professional email templates for different verification types

### API Endpoints

#### Email Verification
- `POST /api/auth/verify-email` - Verify email with 6-digit code
- `POST /api/auth/resend-verification` - Resend verification code
- `GET /api/auth/verification-status` - Get verification status (authenticated)

### Usage Examples

#### 1. Register User (sends verification email)
\`\`\`bash
POST /api/auth/register
{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "location": "New York, USA"
}
\`\`\`

Response includes `requiresEmailVerification: true`

#### 2. Verify Email
\`\`\`bash
POST /api/auth/verify-email
{
  "email": "john@example.com",
  "code": "123456"
}
\`\`\`

#### 3. Resend Verification Code
\`\`\`bash
POST /api/auth/resend-verification
{
  "email": "john@example.com"
}
\`\`\`

#### 4. Check Verification Status
\`\`\`bash
GET /api/auth/verification-status
Authorization: Bearer <token>
\`\`\`

### Security Features

- **Rate Limiting**: 3 codes per hour per email
- **Attempt Limiting**: 5 attempts per code
- **Automatic Cleanup**: Expired codes are cleaned up
- **IP Tracking**: Track verification attempts by IP
- **User Agent Tracking**: Security audit trail

### Database Schema

The `verification_codes` table includes:
- `code` - 6-digit verification code
- `type` - Verification type (email_verification, password_reset, login_verification)
- `userId` - Associated user ID
- `email` - Email address
- `expiresAt` - Expiration timestamp
- `isUsed` - Whether code has been used
- `attempts` - Number of verification attempts
- `ipAddress` - IP address of request
- `userAgent` - User agent of request

### Email Service Integration

The system includes a mock email service that logs email content in development. In production, integrate with:

- **SendGrid**
- **AWS SES**
- **Mailgun**
- **Nodemailer with SMTP**

### Environment Variables

Add these to your environment:
\`\`\`env
# Email Service (when integrating real email provider)
EMAIL_SERVICE_API_KEY=your_email_service_api_key
EMAIL_FROM_ADDRESS=noreply@yourportfolio.com
EMAIL_FROM_NAME="Portfolio Platform"

# Development settings
NODE_ENV=development
\`\`\`

### Migration and Seeding

Run the new migration and seeder:
\`\`\`bash
# Run migration
npx sequelize-cli db:migrate

# Run seeder (creates test verification codes)
npx sequelize-cli db:seed:all
\`\`\`

### Testing

The seeder creates test verification codes:
- User emails with valid codes (format: 200000, 200001, 200002...)
- Expired codes for testing expiration
- Used codes for testing validation

### Email Templates

The system includes three email templates:
1. **Email Verification** - Welcome email with verification code
2. **Password Reset** - Password reset code email
3. **Login Verification** - Two-factor authentication code

### Rate Limiting

- **3 codes per hour** per email address
- **5 attempts per code** before invalidation
- **15-minute expiration** for all codes
- **Automatic cleanup** of expired codes

### Error Handling

- Invalid codes return appropriate error messages
- Expired codes are handled gracefully
- Rate limiting prevents abuse
- Attempt tracking prevents brute force attacks

### Next Steps

1. **Integrate Real Email Service** - Replace mock service with actual email provider
2. **Add Email Templates** - Create HTML email templates
3. **Add Two-Factor Authentication** - Use login verification codes for 2FA
4. **Add Admin Dashboard** - Monitor verification statistics
5. **Add Email Preferences** - Allow users to manage email settings
