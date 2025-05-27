module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blog_comments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      blog_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "blogs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "blog_comments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author_name: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "For guest comments",
      },
      author_email: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "For guest comments",
      },
      author_website: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "For guest comments",
      },
      author_ip: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "For tracking and spam prevention",
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "spam", "trash"),
        allowNull: false,
        defaultValue: "pending",
      },
      likes_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_pinned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addIndex("blog_comments", ["blog_id"])
    await queryInterface.addIndex("blog_comments", ["user_id"])
    await queryInterface.addIndex("blog_comments", ["parent_id"])
    await queryInterface.addIndex("blog_comments", ["status"])
    await queryInterface.addIndex("blog_comments", ["is_pinned"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blog_comments")
  },
}
