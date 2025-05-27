const { v4: uuidv4 } = require("uuid")

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const users = await queryInterface.sequelize.query("SELECT id FROM users LIMIT 3", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    if (!users.length) return

    const now = new Date()

    // Sample images
    const images = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        original_name: "profile-photo.jpg",
        filename: "image-1653671234567-123456789.jpg",
        path: "./uploads/images/image-1653671234567-123456789.jpg",
        mimetype: "image/jpeg",
        size: 256000,
        category: "avatar",
        status: "ready",
        width: 800,
        height: 800,
        title: "Profile Photo",
        alt_text: "Professional headshot of a developer",
        caption: "Professional headshot",
        description: "My professional profile photo for the portfolio",
        focal_point_x: 0.5,
        focal_point_y: 0.5,
        dominant_color: "#336699",
        tags: JSON.stringify(["profile", "headshot", "professional"]),
        metadata: JSON.stringify({
          format: "jpeg",
          space: "srgb",
          channels: 3,
          depth: "8",
          density: 72,
        }),
        url: "/api/images/image-1653671234567-123456789.jpg",
        is_public: true,
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
      {
        id: uuidv4(),
        user_id: users[0].id,
        original_name: "project-screenshot.png",
        filename: "image-1653671234568-123456790.png",
        path: "./uploads/images/image-1653671234568-123456790.png",
        mimetype: "image/png",
        size: 512000,
        category: "project",
        status: "ready",
        width: 1920,
        height: 1080,
        title: "Project Screenshot",
        alt_text: "Screenshot of my latest web application",
        caption: "Dashboard view of my portfolio project",
        description: "A screenshot showing the main dashboard of my portfolio project",
        focal_point_x: 0.5,
        focal_point_y: 0.5,
        dominant_color: "#f5f5f5",
        tags: JSON.stringify(["project", "screenshot", "dashboard"]),
        metadata: JSON.stringify({
          format: "png",
          space: "srgb",
          channels: 4,
          depth: "8",
          density: 72,
        }),
        url: "/api/images/image-1653671234568-123456790.png",
        is_public: true,
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        original_name: "portfolio-banner.webp",
        filename: "image-1653671234569-123456791.webp",
        path: "./uploads/images/image-1653671234569-123456791.webp",
        mimetype: "image/webp",
        size: 384000,
        category: "portfolio",
        status: "ready",
        width: 1600,
        height: 400,
        title: "Portfolio Banner",
        alt_text: "Banner image for my portfolio website",
        caption: "My skills and expertise",
        description: "A banner image showcasing my skills and expertise for my portfolio website",
        focal_point_x: 0.5,
        focal_point_y: 0.5,
        dominant_color: "#222222",
        tags: JSON.stringify(["portfolio", "banner", "header"]),
        metadata: JSON.stringify({
          format: "webp",
          space: "srgb",
          channels: 4,
          depth: "8",
          density: 72,
        }),
        url: "/api/images/image-1653671234569-123456791.webp",
        is_public: true,
        created_at: now,
        updated_at: now,
        deleted_at: null,
      },
    ]

    await queryInterface.bulkInsert("images", images)

    // Sample image variants
    const imageVariants = []

    // For each image, create variants
    for (const image of images) {
      const sizes = ["thumbnail", "small", "medium", "large"]
      const formats = ["webp", "jpeg"]

      for (const size of sizes) {
        for (const format of formats) {
          // Calculate dimensions based on size
          let width, height
          const aspectRatio = image.width / image.height

          switch (size) {
            case "thumbnail":
              width = 150
              height = Math.round(150 / aspectRatio)
              break
            case "small":
              width = 300
              height = Math.round(300 / aspectRatio)
              break
            case "medium":
              width = 600
              height = Math.round(600 / aspectRatio)
              break
            case "large":
              width = 1200
              height = Math.round(1200 / aspectRatio)
              break
          }

          imageVariants.push({
            id: uuidv4(),
            image_id: image.id,
            size: size,
            format: format,
            filename: `${image.filename.split(".")[0]}-${size}.${format}`,
            path: `./uploads/images/variants/${image.filename.split(".")[0]}-${size}.${format}`,
            mimetype: `image/${format === "jpeg" ? "jpeg" : format}`,
            size: Math.round(image.size * (width / image.width) * 0.8), // Approximate size
            width: width,
            height: height,
            url: `/api/images/${image.id}/${size}/${format}`,
            quality: 80,
            created_at: now,
            updated_at: now,
            deleted_at: null,
          })
        }
      }
    }

    await queryInterface.bulkInsert("image_variants", imageVariants)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("image_variants", null, {})
    await queryInterface.bulkDelete("images", null, {})
  },
}
