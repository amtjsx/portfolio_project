module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("technical_skills", {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      category: {
        type: Sequelize.ENUM("frontend", "backend", "database", "devops", "mobile", "other"),
        allowNull: false,
      },
      years_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      icon_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      website_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_currently_using: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      last_used: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      certifications: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      projects_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
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
        allowNull: true,
        type: Sequelize.DATE,
      },
    })

    // Add indexes
    await queryInterface.addIndex("technical_skills", ["user_id"])
    await queryInterface.addIndex("technical_skills", ["category"])
    await queryInterface.addIndex("technical_skills", ["level"])
    await queryInterface.addIndex("technical_skills", ["is_currently_using"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("technical_skills")
  },
}
