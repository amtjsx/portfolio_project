module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("portfolios", {
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
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      theme: {
        type: Sequelize.ENUM("modern", "classic", "minimal", "creative"),
        allowNull: false,
        defaultValue: "modern",
      },
      primary_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#3B82F6",
      },
      secondary_color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#1E40AF",
      },
      visibility: {
        type: Sequelize.ENUM("public", "private", "unlisted"),
        allowNull: false,
        defaultValue: "public",
      },
      custom_domain: {
        type: Sequelize.STRING,
        allowNull: true,
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
      sections: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          about: true,
          skills: true,
          experience: true,
          education: true,
          projects: true,
          contact: true,
          testimonials: false,
          blog: false,
        },
      },
      settings: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          showContactForm: true,
          allowDownloadResume: true,
          enableAnalytics: true,
          enableComments: false,
          maintenanceMode: false,
        },
      },
      resume_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      cover_image_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      profile_image_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.addIndex("portfolios", ["user_id"])
    await queryInterface.addIndex("portfolios", ["is_published"])
    await queryInterface.addIndex("portfolios", ["is_featured"])
    await queryInterface.addIndex("portfolios", ["visibility"])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("portfolios")
  },
}
