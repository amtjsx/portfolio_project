/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing users
    const users = await queryInterface.sequelize.query("SELECT id, email FROM users LIMIT 3", {
      type: Sequelize.QueryTypes.SELECT,
    })

    if (users.length === 0) {
      console.log("No users found, skipping verification codes seeding")
      return
    }

    const verificationCodes = []
    const now = new Date()

    users.forEach((user, index) => {
      // Add some expired codes for testing
      verificationCodes.push({
        code: `${100000 + index}`,
        type: "email_verification",
        userId: user.id,
        email: user.email,
        expiresAt: new Date(now.getTime() - 60 * 60 * 1000), // 1 hour ago (expired)
        isUsed: false,
        attempts: 0,
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Test Browser)",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      })

      // Add some valid codes for testing
      verificationCodes.push({
        code: `${200000 + index}`,
        type: "email_verification",
        userId: user.id,
        email: user.email,
        expiresAt: new Date(now.getTime() + 15 * 60 * 1000), // 15 minutes from now
        isUsed: false,
        attempts: 0,
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Test Browser)",
        createdAt: now,
        updatedAt: now,
      })

      // Add some used codes for testing
      verificationCodes.push({
        code: `${300000 + index}`,
        type: "password_reset",
        userId: user.id,
        email: user.email,
        expiresAt: new Date(now.getTime() + 15 * 60 * 1000),
        isUsed: true,
        attempts: 1,
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Test Browser)",
        createdAt: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
        updatedAt: new Date(now.getTime() - 25 * 60 * 1000), // 25 minutes ago
      })
    })

    await queryInterface.bulkInsert("verification_codes", verificationCodes, {})

    console.log(`✅ Seeded ${verificationCodes.length} verification codes`)
    console.log("📧 Test codes available:")
    users.forEach((user, index) => {
      console.log(`   User ${user.email}: Valid code ${200000 + index}`)
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("verification_codes", null, {})
  },
}
