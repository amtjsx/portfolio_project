# UUID Migration Guide

This document provides guidance on migrating from auto-incrementing integer IDs to UUIDs in the NestJS Portfolio API.

## Overview

We've updated all models to use UUID primary keys instead of auto-incrementing integers. This change provides several benefits:

- **Security**: UUIDs don't expose sequential numbering of resources
- **Scalability**: Better for distributed systems and database sharding
- **Uniqueness**: Globally unique across all tables and databases
- **Predictability**: IDs can be generated client-side before insertion

## Key Changes

1. All primary key fields changed from `INTEGER` to `UUID`
2. All foreign key references updated to use UUID
3. Added `BeforeCreate` hooks to generate UUIDs automatically
4. Updated all migration files to use UUID fields
5. Added the `uuid` package for UUID generation

## Database Migration

To migrate an existing database:

1. **Backup your database first!**
2. Create new migration tables with UUID fields
3. Copy data from old tables to new tables, generating UUIDs for each record
4. Update foreign key references
5. Drop old tables
6. Rename new tables to original names

## Code Changes

The following changes were made to the codebase:

1. Updated all model definitions to use `DataType.UUID` for primary keys
2. Added `BeforeCreate` hooks to generate UUIDs if not provided
3. Updated all foreign key references to use UUID type
4. Updated all migration files to use UUID fields
5. Added the `uuid` package as a dependency

## API Changes

The API now expects and returns UUIDs instead of integers for all ID fields. This affects:

- URL parameters (e.g., `/users/:id`)
- Request bodies (e.g., `userId` fields)
- Response bodies (all ID fields)

## Example Usage

\`\`\`typescript
// Creating a new user
const user = await User.create({
  // No need to specify id, it will be generated automatically
  username: 'johndoe',
  email: 'john@example.com',
  // ...
});

// The user now has a UUID
console.log(user.id); // e.g., '123e4567-e89b-12d3-a456-426614174000'

// Finding a user by UUID
const foundUser = await User.findByPk('123e4567-e89b-12d3-a456-426614174000');
\`\`\`

## Testing

Ensure all tests are updated to work with UUIDs instead of integers. This includes:

- Test fixtures
- Expected response values
- Request parameters

## Troubleshooting

If you encounter issues with the UUID migration:

1. Check that all foreign key references are correctly typed as UUID
2. Ensure UUIDs are properly formatted in requests
3. Verify that all models have the `BeforeCreate` hook for UUID generation
4. Check that all migration files are using the correct UUID type
