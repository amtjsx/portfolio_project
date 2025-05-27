module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blog_categories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "blog_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
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
    await queryInterface.addIndex("blog_categories", ["slug"])
    await queryInterface.addIndex("blog_categories", ["parent_id"])
    await queryInterface.addIndex("blog_categories", ["is_active"])
    await queryInterface.addIndex("blog_categories", ["display_order"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blog_categories")
  },
}
