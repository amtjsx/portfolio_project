module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blog_tag_maps", {
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
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "blog_tags",
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
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })

    // Add indexes and unique constraint
    await queryInterface.addIndex("blog_tag_maps", ["blog_id"])
    await queryInterface.addIndex("blog_tag_maps", ["tag_id"])
    await queryInterface.addIndex("blog_tag_maps", ["blog_id", "tag_id"], {
      unique: true,
      name: "blog_tag_unique",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blog_tag_maps")
  },
}
