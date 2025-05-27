module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("payments", {
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
      subscription_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "succeeded", "failed", "refunded"),
        allowNull: false,
        defaultValue: "pending",
      },
      payment_method: {
        type: Sequelize.ENUM("card", "paypal", "bank_transfer", "other"),
        allowNull: false,
        defaultValue: "card",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      external_payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      receipt_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      invoice_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refund_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refund_reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      refund_amount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addIndex("payments", ["user_id"])
    await queryInterface.addIndex("payments", ["subscription_id"])
    await queryInterface.addIndex("payments", ["status"])
    await queryInterface.addIndex("payments", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("payments")
  },
}
