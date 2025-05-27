module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("analytics", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      portfolio_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      visitor_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      page_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      page_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referrer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      referrer_domain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ip_address: {
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
      device_type: {
        type: Sequelize.ENUM("desktop", "mobile", "tablet"),
        allowNull: true,
      },
      operating_system: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      browser_version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      screen_resolution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      time_on_page: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      scroll_depth: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      is_bot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_unique_visitor: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_returning_visitor: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      utm_source: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_medium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_campaign: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_term: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utm_content: {
        /**
         * The type of the custom data.
         * This can be a string or any other primitive type.
         * It is up to the developer to decide how to use this field.
         */
        type: Sequelize.STRING,
        allowNull: true,
      },
      custom_data: {
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
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })

    // Add indexes for performance
    await queryInterface.addIndex("analytics", ["portfolio_id", "created_at"])
    await queryInterface.addIndex("analytics", ["visitor_id", "created_at"])
    await queryInterface.addIndex("analytics", ["page_path", "created_at"])
    await queryInterface.addIndex("analytics", ["referrer_domain", "created_at"])
    await queryInterface.addIndex("analytics", ["device_type"])
    await queryInterface.addIndex("analytics", ["country"])
    await queryInterface.addIndex("analytics", ["is_bot"])
    await queryInterface.addIndex("analytics", ["session_id"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("analytics")
  },
}
