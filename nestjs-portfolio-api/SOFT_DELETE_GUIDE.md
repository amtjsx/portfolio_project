# Soft Delete Implementation Guide

This guide explains how soft delete functionality is implemented in the NestJS Portfolio API.

## What is Soft Delete?

Soft delete is a pattern where records are not physically removed from the database when deleted. Instead, they are marked as "deleted" by setting a `deletedAt` timestamp. This allows for data recovery and maintains referential integrity.

## Benefits of Soft Delete

- **Data Recovery**: Accidentally deleted data can be restored
- **Audit Trail**: Maintains a history of deleted records
- **Referential Integrity**: Prevents orphaned records in related tables
- **Analytics**: Allows for analysis of deleted data

## Implementation Details

### Database Schema

All tables have a `deleted_at` column that is:
- `NULL` for active records
- Contains a timestamp for deleted records

### Model Configuration

Models are configured with:
- `paranoid: true` in the Sequelize model options
- Default scope that excludes soft-deleted records
- Additional scopes to include or only show deleted records

### Available Methods

#### Finding Records

- `findAll()`: Returns only active records (not soft-deleted)
- `findAllWithDeleted()`: Returns all records including soft-deleted ones
- `findOnlyDeleted()`: Returns only soft-deleted records

#### Managing Records

- `softDelete(id)`: Marks a record as deleted by setting `deletedAt`
- `restore(id)`: Restores a soft-deleted record by setting `deletedAt` to null
- `permanentDelete(id)`: Permanently removes a record from the database

## API Endpoints

For each resource (users, portfolios, projects, etc.), the following endpoints are available:

- `GET /resource`: Get all active records
- `GET /resource/with-deleted`: Get all records including deleted ones (admin only)
- `GET /resource/only-deleted`: Get only deleted records (admin only)
- `DELETE /resource/:id`: Soft delete a record
- `DELETE /resource/:id/permanent`: Permanently delete a record (admin only)
- `POST /resource/:id/restore`: Restore a soft-deleted record (admin only)

## Usage Examples

### Soft Delete a User

\`\`\`bash
DELETE /api/users/123e4567-e89b-12d3-a456-426614174000
\`\`\`

### Restore a Deleted User

\`\`\`bash
POST /api/users/123e4567-e89b-12d3-a456-426614174000/restore
\`\`\`

### Permanently Delete a User

\`\`\`bash
DELETE /api/users/123e4567-e89b-12d3-a456-426614174000/permanent
\`\`\`

### Get All Users Including Deleted

\`\`\`bash
GET /api/users/with-deleted
\`\`\`

## Best Practices

1. Always use soft delete for user-initiated deletions
2. Use permanent delete only for administrative purposes or data cleanup
3. Consider implementing a scheduled job to permanently delete records that have been soft-deleted for a long time
4. Ensure proper access controls for restoration and permanent deletion
\`\`\`

Let's add the necessary imports to the User model:
