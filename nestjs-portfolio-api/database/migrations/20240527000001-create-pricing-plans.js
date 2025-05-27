module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pricing_plans", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
      },
      billing_interval: {
        type: Sequelize.ENUM("month", "year", "one-time"),
        allowNull: false,
        defaultValue: "month",
      },
      trial_period_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      features: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      limits: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          portfolios: 1,
          projects: 10,
          storage: 100,
          customDomain: false,
          analytics: false,
          removeWatermark: false,
          prioritySupport: false,
        },
      },
      tier: {
        type: Sequelize.ENUM("free", "basic", "pro", "enterprise", "custom"),
        allowNull: false,
        defaultValue: "basic",
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
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_custom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      original_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      discount_valid_until: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      external_plan_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_provider: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.addIndex("pricing_plans", ["is_active"])
    await queryInterface.addIndex("pricing_plans", ["is_featured"])
    await queryInterface.addIndex("pricing_plans", ["tier"])
    await queryInterface.addIndex("pricing_plans", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pricing_plans")
  },
}
