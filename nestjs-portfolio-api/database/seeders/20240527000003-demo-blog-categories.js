const { v4: uuidv4 } = require("uuid")

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date()

    // Create parent categories first
    const parentCategories = [
      {
        id: uuidv4(),
        name: "Web Development",
        slug: "web-development",
        description: "Articles about web development technologies and practices",
        meta_title: "Web Development Articles",
        meta_description: "Learn about the latest web development technologies and best practices",
        meta_keywords: JSON.stringify(["web development", "frontend", "backend", "javascript"]),
        color: "#3B82F6",
        display_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "Design",
        slug: "design",
        description: "Articles about UI/UX design and graphic design",
        meta_title: "Design Articles",
        meta_description: "Learn about UI/UX design principles and graphic design techniques",
        meta_keywords: JSON.stringify(["design", "UI/UX", "graphic design", "user experience"]),
        color: "#EC4899",
        display_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "Career",
        slug: "career",
        description: "Articles about career development in tech",
        meta_title: "Tech Career Articles",
        meta_description: "Learn about career development in the tech industry",
        meta_keywords: JSON.stringify(["career", "tech industry", "job search", "professional development"]),
        color: "#10B981",
        display_order: 3,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ]

    // Insert parent categories
    await queryInterface.bulkInsert("blog_categories", parentCategories)

    // Create child categories with references to parents
    const childCategories = [
      {
        id: uuidv4(),
        name: "Frontend",
        slug: "frontend",
        description: "Articles about frontend development",
        parent_id: parentCategories[0].id, // Web Development
        meta_title: "Frontend Development Articles",
        meta_description: "Learn about frontend development technologies and frameworks",
        meta_keywords: JSON.stringify(["frontend", "react", "vue", "angular", "javascript"]),
        color: "#60A5FA",
        display_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "Backend",
        slug: "backend",
        description: "Articles about backend development",
        parent_id: parentCategories[0].id, // Web Development
        meta_title: "Backend Development Articles",
        meta_description: "Learn about backend development technologies and frameworks",
        meta_keywords: JSON.stringify(["backend", "node.js", "express", "django", "ruby on rails"]),
        color: "#1E40AF",
        display_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "UI Design",
        slug: "ui-design",
        description: "Articles about user interface design",
        parent_id: parentCategories[1].id, // Design
        meta_title: "UI Design Articles",
        meta_description: "Learn about user interface design principles and techniques",
        meta_keywords: JSON.stringify(["UI design", "interface design", "visual design", "design systems"]),
        color: "#F472B6",
        display_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "UX Design",
        slug: "ux-design",
        description: "Articles about user experience design",
        parent_id: parentCategories[1].id, // Design
        meta_title: "UX Design Articles",
        meta_description: "Learn about user experience design principles and techniques",
        meta_keywords: JSON.stringify(["UX design", "user experience", "usability", "user research"]),
        color: "#BE185D",
        display_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "Job Search",
        slug: "job-search",
        description: "Articles about finding jobs in tech",
        parent_id: parentCategories[2].id, // Career
        meta_title: "Tech Job Search Articles",
        meta_description: "Learn about finding jobs in the tech industry",
        meta_keywords: JSON.stringify(["job search", "tech jobs", "interviews", "resume"]),
        color: "#059669",
        display_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: "Freelancing",
        slug: "freelancing",
        description: "Articles about freelancing in tech",
        parent_id: parentCategories[2].id, // Career
        meta_title: "Tech Freelancing Articles",
        meta_description: "Learn about freelancing in the tech industry",
        meta_keywords: JSON.stringify(["freelancing", "self-employed", "clients", "contracts"]),
        color: "#34D399",
        display_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ]

    // Insert child categories
    await queryInterface.bulkInsert("blog_categories", childCategories)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("blog_categories", null, {})
  },
}
