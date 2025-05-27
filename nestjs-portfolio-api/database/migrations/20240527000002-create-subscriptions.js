module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      plan_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pricing_plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      status: {
        type: Sequelize.ENUM("active", "canceled", "expired", "past_due", "trialing", "unpaid"),
        allowNull: false,
        defaultValue: "active",
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      trial_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      current_period_start: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      current_period_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      external_subscription_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      auto_renew: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      cancellation_reason: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex("subscriptions", ["user_id"])
    await queryInterface.addIndex("subscriptions", ["plan_id"])
    await queryInterface.addIndex("subscriptions", ["status"])
    await queryInterface.addIndex("subscriptions", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("subscriptions")
  },
}
