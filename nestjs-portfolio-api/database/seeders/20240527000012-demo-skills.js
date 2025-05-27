const { v4: uuidv4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the first user and portfolio from the database
    const users = await queryInterface.sequelize.query("SELECT id FROM users LIMIT 1;", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    const portfolios = await queryInterface.sequelize.query("SELECT id FROM portfolios LIMIT 1;", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    if (users.length === 0 || portfolios.length === 0 || !global.skillCategories) {
      console.log("Missing required data, skipping skills seeder")
      return
    }

    const userId = users[0].id
    const portfolioId = portfolios[0].id

    // Get category IDs
    const categories = global.skillCategories
    const programmingCategoryId = categories[0].id
    const frameworksCategoryId = categories[1].id
    const toolsCategoryId = categories[2].id
    const softSkillsCategoryId = categories[3].id

    // Create skills
    const skills = [
      // Programming Languages
      {
        id: uuidv4(),
        name: "JavaScript",
        description: "Modern JavaScript including ES6+ features",
        proficiency_level: "expert",
        years_of_experience: 6,
        last_used_date: new Date(),
        icon: "javascript",
        color: "#f1e05a",
        is_featured: true,
        display_order: 0,
        endorsement_count: 12,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: programmingCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "TypeScript",
        description: "Static typing for JavaScript with advanced type features",
        proficiency_level: "advanced",
        years_of_experience: 4,
        last_used_date: new Date(),
        icon: "typescript",
        color: "#2b7489",
        is_featured: true,
        display_order: 1,
        endorsement_count: 8,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: programmingCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Python",
        description: "Python for data analysis and backend development",
        proficiency_level: "intermediate",
        years_of_experience: 3,
        last_used_date: new Date(),
        icon: "python",
        color: "#3572A5",
        is_featured: false,
        display_order: 2,
        endorsement_count: 5,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: programmingCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Frameworks & Libraries
      {
        id: uuidv4(),
        name: "React",
        description: "Building user interfaces with React and React ecosystem",
        proficiency_level: "expert",
        years_of_experience: 5,
        last_used_date: new Date(),
        icon: "react",
        color: "#61dafb",
        is_featured: true,
        display_order: 0,
        endorsement_count: 15,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: frameworksCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Node.js",
        description: "Server-side JavaScript with Express and NestJS",
        proficiency_level: "advanced",
        years_of_experience: 4,
        last_used_date: new Date(),
        icon: "node",
        color: "#68a063",
        is_featured: true,
        display_order: 1,
        endorsement_count: 10,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: frameworksCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Next.js",
        description: "React framework for production-grade applications",
        proficiency_level: "advanced",
        years_of_experience: 3,
        last_used_date: new Date(),
        icon: "nextjs",
        color: "#000000",
        is_featured: false,
        display_order: 2,
        endorsement_count: 7,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: frameworksCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Tools & Technologies
      {
        id: uuidv4(),
        name: "Git",
        description: "Version control and collaboration with Git",
        proficiency_level: "expert",
        years_of_experience: 6,
        last_used_date: new Date(),
        icon: "git",
        color: "#F05032",
        is_featured: false,
        display_order: 0,
        endorsement_count: 9,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: toolsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Docker",
        description: "Containerization and deployment with Docker",
        proficiency_level: "intermediate",
        years_of_experience: 2,
        last_used_date: new Date(),
        icon: "docker",
        color: "#2496ED",
        is_featured: false,
        display_order: 1,
        endorsement_count: 4,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: toolsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "AWS",
        description: "Cloud infrastructure and services with AWS",
        proficiency_level: "intermediate",
        years_of_experience: 2,
        last_used_date: new Date(),
        icon: "aws",
        color: "#FF9900",
        is_featured: false,
        display_order: 2,
        endorsement_count: 3,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: toolsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Soft Skills
      {
        id: uuidv4(),
        name: "Team Leadership",
        description: "Leading development teams and mentoring junior developers",
        proficiency_level: "advanced",
        years_of_experience: 3,
        last_used_date: new Date(),
        icon: "users",
        color: "#3498db",
        is_featured: true,
        display_order: 0,
        endorsement_count: 6,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: softSkillsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Project Management",
        description: "Managing project timelines, resources, and deliverables",
        proficiency_level: "intermediate",
        years_of_experience: 2,
        last_used_date: new Date(),
        icon: "clipboard",
        color: "#2ecc71",
        is_featured: false,
        display_order: 1,
        endorsement_count: 4,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: softSkillsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Communication",
        description: "Clear and effective communication with team members and stakeholders",
        proficiency_level: "expert",
        years_of_experience: 5,
        last_used_date: new Date(),
        icon: "message-circle",
        color: "#9b59b6",
        is_featured: false,
        display_order: 2,
        endorsement_count: 8,
        user_id: userId,
        portfolio_id: portfolioId,
        category_id: softSkillsCategoryId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert("skills", skills)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("skills", null, {})
  },
}
