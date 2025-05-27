const bcrypt = require("bcrypt")

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10)

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "johndoe",
          email: "john@example.com",
          password: hashedPassword,
          first_name: "John",
          last_name: "Doe",
          bio: "Full Stack Developer passionate about creating amazing web experiences",
          location: "New York, USA",
          website: "https://johndoe.com",
          linkedin_url: "https://linkedin.com/in/johndoe",
          github_url: "https://github.com/johndoe",
          role: "admin",
          status: "active",
          is_email_verified: true,
          profile_completeness: 85,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  },
}
