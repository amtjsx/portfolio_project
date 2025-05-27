module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("features", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      key: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.ENUM("core", "branding", "analytics", "support", "storage", "advanced"),
        allowNull: false,
        defaultValue: "core",
      },
      type: {
        type: Sequelize.ENUM("boolean", "numeric", "text"),
        allowNull: false,
        defaultValue: "boolean",
      },
      icon: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_premium: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })

    // Add indexes
    await queryInterface.addIndex("features", ["key"])
    await queryInterface.addIndex("features", ["category"])
    await queryInterface.addIndex("features", ["is_active"])
    await queryInterface.addIndex("features", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("features")
  },
}
