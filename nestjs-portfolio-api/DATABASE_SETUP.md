# Database Setup Guide

This guide will help you set up the PostgreSQL database for the NestJS Portfolio API.

## Prerequisites

- PostgreSQL 12+ installed locally or access to a cloud PostgreSQL instance
- Node.js 18+ installed
- All environment variables configured in Vercel

## Environment Variables

Make sure these environment variables are set:

\`\`\`bash
DB_HOST=localhost          # Your database host
DB_PORT=5432              # Database port (default: 5432)
DB_USERNAME=postgres      # Database username
DB_PASSWORD=your_password # Database password
DB_NAME=portfolio_db      # Production database name
DB_NAME_TEST=portfolio_db_test # Test database name
\`\`\`

## Local Development Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
\`\`\`bash
brew install postgresql
brew services start postgresql
\`\`\`

**Ubuntu/Debian:**
\`\`\`bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
\`\`\`

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### 2. Create Database

\`\`\`bash
# Connect to PostgreSQL
psql -U postgres

# Create databases
CREATE DATABASE portfolio_db;
CREATE DATABASE portfolio_db_test;

# Create user (optional)
CREATE USER portfolio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
GRANT ALL PRIVILEGES ON DATABASE portfolio_db_test TO portfolio_user;

# Exit psql
\q
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run Migrations

\`\`\`bash
# Run all migrations to create tables
npm run db:migrate

# Seed initial data
npm run db:seed
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run start:dev
\`\`\`

## Production Setup

### Cloud Database Options

1. **Vercel Postgres** (Recommended for Vercel deployment)
2. **AWS RDS**
3. **Google Cloud SQL**
4. **DigitalOcean Managed Databases**
5. **Heroku Postgres**

### Vercel Postgres Setup

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Create a new Postgres database
4. Copy the connection details to your environment variables

## Database Commands

### Migration Commands

\`\`\`bash
# Run pending migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Create new migration
npx sequelize-cli migration:generate --name migration-name
\`\`\`

### Seeder Commands

\`\`\`bash
# Run all seeders
npm run db:seed

# Undo all seeders
npm run db:seed:undo

# Create new seeder
npx sequelize-cli seed:generate --name seeder-name
\`\`\`

## Database Schema

### Tables Created

1. **users** - User accounts and profiles
2. **portfolios** - Portfolio configurations
3. **projects** - Project information
4. **technical_skills** - Technical skills and proficiency
5. **contacts** - Contact form submissions
6. **uploaded_files** - File upload tracking

### Relationships

- Users have many portfolios, projects, technical skills, contacts, and uploaded files
- Portfolios belong to users and have many projects
- Projects belong to users and portfolios
- All other entities belong to users

## API Endpoints

### Database Health Check

\`\`\`bash
GET /api/database/health    # Check database connection
GET /api/database/info      # Get database information
GET /api/database/stats     # Get database statistics
\`\`\`

### Testing Database Connection

\`\`\`bash
# Test the API
curl http://localhost:3000/api/database/health

# Expected response:
{
  "status": "healthy",
  "connected": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Check if PostgreSQL is running
   - Verify connection details in environment variables

2. **Authentication failed**
   - Check username and password
   - Ensure user has proper permissions

3. **Database does not exist**
   - Create the database manually
   - Run migrations after database creation

4. **Migration errors**
   - Check if tables already exist
   - Verify migration files are correct

### Reset Database

\`\`\`bash
# Drop all tables and recreate
npm run db:migrate:undo:all
npm run db:migrate
npm run db:seed
\`\`\`

## Security Considerations

1. **Password Hashing** - User passwords are automatically hashed using bcrypt
2. **SQL Injection Protection** - Sequelize provides built-in protection
3. **Environment Variables** - Never commit database credentials to version control
4. **Connection Pooling** - Configured for optimal performance and security

## Performance Optimization

1. **Indexes** - Added on frequently queried columns
2. **Connection Pooling** - Configured with appropriate limits
3. **Query Optimization** - Use includes for efficient joins
4. **Pagination** - Implement for large datasets

## Backup and Recovery

### Local Backup

\`\`\`bash
# Create backup
pg_dump -U postgres portfolio_db > backup.sql

# Restore backup
psql -U postgres portfolio_db < backup.sql
\`\`\`

### Production Backup

Most cloud providers offer automated backups. Configure according to your provider's documentation.

## Monitoring

The API includes built-in database monitoring endpoints:

- Connection health checks
- Query performance statistics
- Table statistics and row counts
- Model relationship verification

Access these at `/api/database/*` endpoints when the server is running.
