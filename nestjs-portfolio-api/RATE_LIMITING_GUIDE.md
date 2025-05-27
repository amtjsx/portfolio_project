# Rate Limiting Guide

This API implements rate limiting to prevent abuse and ensure fair usage. Rate limiting restricts the number of requests a client can make within a specific time period.

## Rate Limit Tiers

The API uses three tiers of rate limiting:

1. **Short-term limits**: 3 requests per second
   - Applied to authentication endpoints (login, register, etc.)
   - Prevents brute force attacks

2. **Medium-term limits**: 20 requests per minute
   - Applied to most API endpoints
   - Ensures fair usage for all clients

3. **Long-term limits**: 100 requests per hour
   - Applied globally
   - Prevents sustained abuse

## Rate Limit Headers

The API includes the following headers in responses:

- `X-RateLimit-Short-Limit`: Maximum number of requests allowed per second
- `X-RateLimit-Short-Remaining`: Number of requests remaining in the current second

- `X-RateLimit-Medium-Limit`: Maximum number of requests allowed per minute
- `X-RateLimit-Medium-Remaining`: Number of requests remaining in the current minute

- `X-RateLimit-Long-Limit`: Maximum number of requests allowed per hour
- `X-RateLimit-Long-Remaining`: Number of requests remaining in the current hour

## Rate Limit Responses

When a rate limit is exceeded, the API returns:

- Status code: `429 Too Many Requests`
- Response body:
  \`\`\`json
  {
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests",
    "error": "Too Many Requests"
  }
  \`\`\`

## Best Practices

To avoid hitting rate limits:

1. **Cache responses** when appropriate
2. **Implement exponential backoff** when retrying requests
3. **Batch operations** instead of making multiple individual requests
4. **Monitor rate limit headers** and adjust request rates accordingly

## Configuration

Rate limits can be configured using environment variables:

\`\`\`
# Short-term limits (per second)
THROTTLE_SHORT_TTL=1000
THROTTLE_SHORT_LIMIT=3

# Medium-term limits (per minute)
THROTTLE_MEDIUM_TTL=60000
THROTTLE_MEDIUM_LIMIT=20

# Long-term limits (per hour)
THROTTLE_LONG_TTL=3600000
THROTTLE_LONG_LIMIT=100
\`\`\`

## Redis Storage

Rate limiting data is stored in Redis for distributed environments. Configure Redis using:

\`\`\`
REDIS_URL=redis://username:password@host:port
# Or individual settings
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
\`\`\`

If Redis is not configured, the system will fall back to in-memory storage (not recommended for production).
\`\`\`

Let's create an interceptor to handle rate limit exceeded responses:
