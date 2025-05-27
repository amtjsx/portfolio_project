module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("educations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      institution_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      institution_logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      institution_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      field_of_study: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      education_type: {
        type: Sequelize.ENUM(
          "bachelors",
          "masters",
          "doctorate",
          "associate",
          "certificate",
          "diploma",
          "high_school",
          "vocational",
          "online_course",
          "self_study",
          "other",
        ),
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      is_current: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_remote: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      gpa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      courses: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      honors: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      activities: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      projects: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      achievements: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      skills: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      is_highlighted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      certificate_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      verification_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      verification_method: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      additional_info: {
        type: Sequelize.JSONB,
        allowNull: true,
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

    // Add indexes for better query performance
    await queryInterface.addIndex("educations", ["user_id"])
    await queryInterface.addIndex("educations", ["portfolio_id"])
    await queryInterface.addIndex("educations", ["is_current"])
    await queryInterface.addIndex("educations", ["start_date"])
    await queryInterface.addIndex("educations", ["education_type"])
    await queryInterface.addIndex("educations", ["is_highlighted"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("educations")
  },
}
