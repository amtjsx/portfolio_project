module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
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
      original_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      category: {
        type: Sequelize.ENUM("avatar", "portfolio", "project", "blog", "general"),
        allowNull: false,
        defaultValue: "general",
      },
      status: {
        type: Sequelize.ENUM("pending", "processing", "ready", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alt_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      focal_point_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.5,
      },
      focal_point_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.5,
      },
      dominant_color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_public: {
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
    await queryInterface.addIndex("images", ["user_id"])
    await queryInterface.addIndex("images", ["category"])
    await queryInterface.addIndex("images", ["status"])
    await queryInterface.addIndex("images", ["filename"])
    await queryInterface.addIndex("images", ["is_public"])
    await queryInterface.addIndex("images", ["deleted_at"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("images")
  },
}
