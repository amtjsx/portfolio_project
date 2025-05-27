module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blogs", {
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
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "blog_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      excerpt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      featured_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      featured_image_caption: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reading_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Estimated reading time in minutes",
      },
      status: {
        type: Sequelize.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft",
      },
      visibility: {
        type: Sequelize.ENUM("public", "private", "password_protected"),
        allowNull: false,
        defaultValue: "public",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "For password-protected posts",
      },
      meta_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      meta_keywords: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      allow_comments: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      views_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likes_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      comments_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      published_at: {
        type: Sequelize.DATE,
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
        type: Sequelize.DATE,
        allowNull: true,
      },
    })

    // Add indexes
    await queryInterface.addIndex("blogs", ["user_id"])
    await queryInterface.addIndex("blogs", ["portfolio_id"])
    await queryInterface.addIndex("blogs", ["category_id"])
    await queryInterface.addIndex("blogs", ["slug"])
    await queryInterface.addIndex("blogs", ["status"])
    await queryInterface.addIndex("blogs", ["visibility"])
    await queryInterface.addIndex("blogs", ["is_featured"])
    await queryInterface.addIndex("blogs", ["published_at"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blogs")
  },
}
