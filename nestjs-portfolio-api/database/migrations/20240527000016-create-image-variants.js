module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("image_variants", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      image_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "images",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      size: {
        type: Sequelize.ENUM("thumbnail", "small", "medium", "large", "original"),
        allowNull: false,
      },
      format: {
        type: Sequelize.ENUM("jpeg", "png", "webp", "avif", "gif"),
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
      width: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quality: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 100,
        },
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
    await queryInterface.addIndex("image_variants", ["image_id"])
    await queryInterface.addIndex("image_variants", ["size"])
    await queryInterface.addIndex("image_variants", ["format"])
    await queryInterface.addIndex("image_variants", ["filename"])
    await queryInterface.addIndex("image_variants", ["deleted_at"])
    await queryInterface.addIndex("image_variants", ["image_id", "size", "format"], {
      unique: true,
      where: {
        deleted_at: null,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("image_variants")
  },
}
