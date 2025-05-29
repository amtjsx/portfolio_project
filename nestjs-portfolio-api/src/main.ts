import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { RateLimitExceptionFilter } from "./common/rate-limiting/rate-limit-exception.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Register global filters
  app.useGlobalFilters(new RateLimitExceptionFilter());

  // Enable CORS for frontend integration
  app.enableCors({
    origin: ["http://localhost:1000", "http://localhost:3000"], // Add your frontend URLs
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix("api");

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Portfolio API")
    .setDescription(
      "Backend API for portfolio website with projects, contact, and personal information"
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth" // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addTag("auth", "Authentication endpoints")
    .addTag("portfolio", "Personal information endpoints")
    .addTag("projects", "Project management endpoints")
    .addTag("contact", "Contact form and information endpoints")
    .addTag("health", "Health check endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "Portfolio API Documentation",
    customfavIcon: "/favicon.ico",
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
      docExpansion: "none",
    },
  });

  const port = process.env.PORT || 1002;
  await app.listen(port);

  console.log(`Portfolio API is running on: http://localhost:${port}/api`);
  console.log(
    `API Documentation available at: http://localhost:${port}/api/docs`
  );
}

bootstrap();
