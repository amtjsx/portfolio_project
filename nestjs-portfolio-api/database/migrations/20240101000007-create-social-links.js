module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("social_links", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      platform: {
        type: Sequelize.ENUM(
          "linkedin",
          "github",
          "twitter",
          "instagram",
          "facebook",
          "youtube",
          "dribbble",
          "behance",
          "medium",
          "dev",
          "stackoverflow",
          "codepen",
          "discord",
          "telegram",
          "whatsapp",
          "tiktok",
          "snapchat",
          "pinterest",
          "reddit",
          "twitch",
          "spotify",
          "website",
          "blog",
          "other",
        ),
        allowNull: false,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      icon_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      show_in_nav: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      open_in_new_tab: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      follower_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      last_active_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      click_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
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
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })

    // Add indexes
    await queryInterface.addIndex("social_links", ["user_id"])
    await queryInterface.addIndex("social_links", ["portfolio_id"])
    await queryInterface.addIndex("social_links", ["platform"])
    await queryInterface.addIndex("social_links", ["is_active"])
    await queryInterface.addIndex("social_links", ["show_in_nav"])
    await queryInterface.addIndex("social_links", ["display_order"])
    await queryInterface.addIndex("social_links", ["click_count"])

    // Add unique constraint for user + platform combination
    await queryInterface.addIndex("social_links", ["user_id", "platform"], {
      unique: true,
      name: "unique_user_platform",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("social_links")
  },
}
