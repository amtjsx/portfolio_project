const { v4: uuidv4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the first user from the database
    const users = await queryInterface.sequelize.query("SELECT id FROM users LIMIT 1;", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    if (users.length === 0) {
      console.log("No users found, skipping skill categories seeder")
      return
    }

    const userId = users[0].id

    // Create skill categories
    const categories = [
      {
        id: uuidv4(),
        name: "Programming Languages",
        description: "Programming languages I am proficient in",
        icon: "code",
        color: "#3498db",
        display_order: 0,
        is_visible: true,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Frameworks & Libraries",
        description: "Frameworks and libraries I work with",
        icon: "layers",
        color: "#2ecc71",
        display_order: 1,
        is_visible: true,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Tools & Technologies",
        description: "Development tools and technologies",
        icon: "tool",
        color: "#e74c3c",
        display_order: 2,
        is_visible: true,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "Soft Skills",
        description: "Professional soft skills",
        icon: "users",
        color: "#9b59b6",
        display_order: 3,
        is_visible: true,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert("skill_categories", categories)

    // Store categories for use in the skills seeder
    global.skillCategories = categories
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("skill_categories", null, {})
  },
}
