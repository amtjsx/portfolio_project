module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blog_likes", {
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
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })

    // Add indexes and unique constraint
    await queryInterface.addIndex("blog_likes", ["blog_id"])
    await queryInterface.addIndex("blog_likes", ["user_id"])
    await queryInterface.addIndex("blog_likes", ["blog_id", "user_id"], {
      unique: true,
      name: "blog_user_like_unique",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blog_likes")
  },
}
