module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("visitors", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      visitor_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      portfolio_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "portfolios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      first_visit: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      last_visit: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      visit_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      page_views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      total_time_spent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      first_referrer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      last_referrer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      first_landing_page: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_landing_page: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primary_device: {
        type: Sequelize.ENUM("desktop", "mobile", "tablet"),
        allowNull: true,
      },
      primary_browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primary_os: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_bot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      engagement_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      metadata: {
        type: Sequelize.JSON,
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
    })

    // Add indexes
    await queryInterface.addIndex("visitors", ["visitor_id"])
    await queryInterface.addIndex("visitors", ["portfolio_id"])
    await queryInterface.addIndex("visitors", ["user_id"])
    await queryInterface.addIndex("visitors", ["first_visit"])
    await queryInterface.addIndex("visitors", ["last_visit"])
    await queryInterface.addIndex("visitors", ["country"])
    await queryInterface.addIndex("visitors", ["is_bot"])
    await queryInterface.addIndex("visitors", ["engagement_score"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("visitors")
  },
}
