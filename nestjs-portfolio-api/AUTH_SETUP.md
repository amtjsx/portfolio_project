# Authentication Setup Guide

This guide explains how to set up and use the authentication system in the NestJS Portfolio API.

## Overview

The authentication system provides:
- JWT-based authentication
- User registration and login
- Password reset functionality
- Role-based access control
- Profile management
- Secure password hashing with bcrypt

## Environment Variables

Add these environment variables to your `.env` file or Vercel environment:

\`\`\`bash
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
\`\`\`

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "location": "New York, USA"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "abc123def456...",
  "token_type": "Bearer",
  "expires_in": 604800,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  },
  "message": "Registration successful"
}
\`\`\`

#### POST /api/auth/login
Login with email and password.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "Password123!"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "abc123def456...",
  "token_type": "Bearer",
  "expires_in": 604800,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
\`\`\`

#### POST /api/auth/refresh
Refresh an expired access token.

**Request Body:**
\`\`\`json
{
  "refresh_token": "abc123def456..."
}
\`\`\`

#### POST /api/auth/forgot-password
Request a password reset token.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com"
}
\`\`\`

#### POST /api/auth/reset-password
Reset password using a reset token.

**Request Body:**
\`\`\`json
{
  "token": "reset-token-here",
  "password": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
\`\`\`

#### PUT /api/auth/change-password
Change password (requires authentication).

**Headers:**
\`\`\`
Authorization: Bearer your-jwt-token
\`\`\`

**Request Body:**
\`\`\`json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
\`\`\`

### Profile Endpoints

#### GET /api/auth/profile
Get current user profile (requires authentication).

**Headers:**
\`\`\`
Authorization: Bearer your-jwt-token
\`\`\`

#### PUT /api/auth/profile
Update user profile (requires authentication).

**Headers:**
\`\`\`
Authorization: Bearer your-jwt-token
\`\`\`

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Full Stack Developer",
  "phone": "+1 (555) 123-4567",
  "location": "New York, USA",
  "website": "https://johndoe.com",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe"
}
\`\`\`

#### GET /api/auth/me
Get current user info with permissions.

**Headers:**
\`\`\`
Authorization: Bearer your-jwt-token
\`\`\`

#### POST /api/auth/logout
Logout current user (requires authentication).

**Headers:**
\`\`\`
Authorization: Bearer your-jwt-token
\`\`\`

## Using Authentication in Frontend

### Login Example
\`\`\`javascript
const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Store tokens
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
\`\`\`

### Making Authenticated Requests
\`\`\`javascript
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    await refreshToken();
    // Retry the request
    return makeAuthenticatedRequest(url, options);
  }

  return response;
};
\`\`\`

### Token Refresh Example
\`\`\`javascript
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      return data;
    } else {
      // Refresh failed, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    // Redirect to login
    window.location.href = '/login';
  }
};
\`\`\`

## Role-Based Access Control

### Available Roles
- **admin**: Full access to all resources
- **user**: Access to own resources only
- **guest**: Read-only access to public resources

### Using Role Guards

\`\`\`typescript
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  
  @Get('users')
  @Roles('admin')
  getAllUsers() {
    // Only admins can access this
  }
  
  @Get('analytics')
  @Roles('admin', 'user')
  getAnalytics() {
    // Admins and users can access this
  }
}
\`\`\`

### Making Endpoints Public

\`\`\`typescript
import { Public } from '../auth/decorators/public.decorator';

@Controller('public')
export class PublicController {
  
  @Get('portfolios')
  @Public()
  getPublicPortfolios() {
    // This endpoint is public, no authentication required
  }
}
\`\`\`

## Password Requirements

Passwords must meet these requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Configurable token expiration
4. **Refresh Tokens**: Secure token refresh mechanism
5. **Rate Limiting**: (Can be added with @nestjs/throttler)
6. **Input Validation**: Comprehensive validation with class-validator
7. **Role-Based Access**: Fine-grained permission control

## Error Handling

The API returns consistent error responses:

\`\`\`json
{
  "statusCode": 401,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
\`\`\`

Common error codes:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials/token)
- **403**: Forbidden (insufficient permissions)
- **409**: Conflict (user already exists)

## Testing Authentication

Use the Swagger UI at `/api/docs` to test authentication endpoints:

1. Register a new user or login
2. Copy the access token from the response
3. Click "Authorize" in Swagger UI
4. Enter: `Bearer your-access-token-here`
5. Test protected endpoints

## Production Considerations

1. **Environment Variables**: Use strong, unique JWT secrets
2. **HTTPS**: Always use HTTPS in production
3. **Token Storage**: Consider secure storage options for tokens
4. **Rate Limiting**: Implement rate limiting for auth endpoints
5. **Monitoring**: Monitor failed login attempts
6. **Email Service**: Implement real email service for password resets
7. **Session Management**: Consider implementing session blacklisting
