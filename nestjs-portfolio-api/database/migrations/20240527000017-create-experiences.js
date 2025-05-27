/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("experiences", {
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
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employment_type: {
        type: Sequelize.ENUM(
          "full_time",
          "part_time",
          "contract",
          "freelance",
          "internship",
          "apprenticeship",
          "volunteer",
        ),
        allowNull: false,
        defaultValue: "full_time",
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_remote: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      responsibilities: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      achievements: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      technologies: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      company_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_logo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_highlighted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addIndex("experiences", ["user_id"])
    await queryInterface.addIndex("experiences", ["portfolio_id"])
    await queryInterface.addIndex("experiences", ["is_current"])
    await queryInterface.addIndex("experiences", ["start_date"])
    await queryInterface.addIndex("experiences", ["company_name"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("experiences")
  },
}
