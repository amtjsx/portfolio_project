module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "portfolios",
      [
        {
          user_id: 1,
          title: "John Doe - Full Stack Developer",
          subtitle: "Passionate about creating amazing web experiences",
          summary:
            "Experienced full-stack developer with 5+ years of expertise in modern web technologies. Specialized in React, Node.js, and cloud architecture. Passionate about creating scalable, user-friendly applications that solve real-world problems.",
          theme: "modern",
          primary_color: "#3B82F6",
          secondary_color: "#1E40AF",
          visibility: "public",
          custom_domain: "johndoe.dev",
          meta_title: "John Doe - Full Stack Developer Portfolio",
          meta_description:
            "Experienced full-stack developer specializing in React, Node.js, and modern web technologies.",
          meta_keywords: JSON.stringify(["full stack developer", "react", "nodejs", "web development"]),
          sections: JSON.stringify({
            about: true,
            skills: true,
            experience: true,
            education: true,
            projects: true,
            contact: true,
            testimonials: true,
            blog: false,
          }),
          social_links: JSON.stringify({
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            twitter: "https://twitter.com/johndoe",
            instagram: "https://instagram.com/johndoe",
          }),
          analytics: JSON.stringify({
            totalViews: 1250,
            uniqueVisitors: 890,
            lastViewedAt: "2024-01-15T14:30:00.000Z",
            popularPages: ["/", "/projects", "/about", "/contact"],
          }),
          settings: JSON.stringify({
            showContactForm: true,
            allowDownloadResume: true,
            enableAnalytics: true,
            enableComments: true,
            maintenanceMode: false,
          }),
          is_published: true,
          is_featured: true,
          published_at: new Date("2023-01-15"),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("portfolios", null, {})
  },
}
