module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("coupons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      discount_type: {
        type: Sequelize.ENUM("percentage", "fixed_amount"),
        allowNull: false,
        defaultValue: "percentage",
      },
      discount_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      max_discount_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      min_purchase_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      max_redemptions: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      redemption_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      applicable_plan_ids: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      first_time_only: {
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
    await queryInterface.addIndex("coupons", ["code"])
    await queryInterface.addIndex("coupons", ["is_active"])
    await queryInterface.addIndex("coupons", ["expires_at"])
    await queryInterface.addIndex("coupons", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("coupons")
  },
}
