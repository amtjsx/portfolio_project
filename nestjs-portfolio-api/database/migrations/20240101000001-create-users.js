module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      linkedin_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      github_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      twitter_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "user", "guest"),
        allowNull: false,
        defaultValue: "user",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profile_completeness: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })

    // Add indexes
    await queryInterface.addIndex("users", ["email"])
    await queryInterface.addIndex("users", ["username"])
    await queryInterface.addIndex("users", ["status"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users")
  },
}
