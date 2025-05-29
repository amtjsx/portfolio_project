/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("skills", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      proficiency_level: {
        type: Sequelize.ENUM("beginner", "intermediate", "advanced", "expert"),
        allowNull: false,
        defaultValue: "intermediate",
      },
      years_of_experience: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      last_used_date: {
        type: Sequelize.DATE,
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
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      endorsement_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
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
          model: "skill_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })

    // Add indexes
    await queryInterface.addIndex("skills", ["user_id"])
    await queryInterface.addIndex("skills", ["portfolio_id"])
    await queryInterface.addIndex("skills", ["category_id"])
    await queryInterface.addIndex("skills", ["proficiency_level"])
    await queryInterface.addIndex("skills", ["is_featured"])
    await queryInterface.addIndex("skills", ["display_order"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("skills")
  },
}
