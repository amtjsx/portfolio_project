module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pricing_features", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      pricing_plan_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "pricing_plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      feature_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "features",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      value: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      limit: {
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
    await queryInterface.addIndex("pricing_features", ["pricing_plan_id"])
    await queryInterface.addIndex("pricing_features", ["feature_id"])
    await queryInterface.addIndex("pricing_features", ["pricing_plan_id", "feature_id"], {
      unique: true,
      where: {
        deleted_at: null,
      },
    })
    await queryInterface.addIndex("pricing_features", ["deleted_at"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pricing_features")
  },
}
