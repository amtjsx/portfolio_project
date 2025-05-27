/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("verification_codes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("email_verification", "password_reset", "login_verification"),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      attempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_agent: {
        type: Sequelize.TEXT,
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

    // Add indexes for performance
    await queryInterface.addIndex("verification_codes", ["email", "type", "is_used"])
    await queryInterface.addIndex("verification_codes", ["user_id", "type"])
    await queryInterface.addIndex("verification_codes", ["expires_at"])
    await queryInterface.addIndex("verification_codes", ["code", "email", "type"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("verification_codes")
  },
}
