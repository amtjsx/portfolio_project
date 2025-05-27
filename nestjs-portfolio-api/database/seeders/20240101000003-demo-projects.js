module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "projects",
      [
        {
          user_id: 1,
          portfolio_id: 1,
          title: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React and Node.js",
          long_description:
            "A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
          technologies: JSON.stringify(["React", "Node.js", "PostgreSQL", "Stripe", "Redux"]),
          category: "web",
          github_url: "https://github.com/yourusername/ecommerce-platform",
          live_url: "https://your-ecommerce-demo.com",
          image_url: "/placeholder.svg?height=300&width=400&query=ecommerce platform",
          featured: true,
          start_date: "2023-01-01",
          end_date: "2023-06-30",
          status: "completed",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          portfolio_id: 1,
          title: "Task Management App",
          description: "Collaborative task management application",
          long_description:
            "A real-time collaborative task management application with team features, project organization, and progress tracking.",
          technologies: JSON.stringify(["Vue.js", "Express.js", "MongoDB", "Socket.io"]),
          category: "web",
          github_url: "https://github.com/yourusername/task-manager",
          live_url: "https://your-task-manager.com",
          image_url: "/placeholder.svg?height=300&width=400&query=task management app",
          featured: true,
          start_date: "2023-07-01",
          end_date: null,
          status: "in-progress",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          portfolio_id: 1,
          title: "Weather Mobile App",
          description: "React Native weather application",
          long_description:
            "A cross-platform mobile weather application with location-based forecasts, weather alerts, and beautiful UI.",
          technologies: JSON.stringify(["React Native", "TypeScript", "Weather API"]),
          category: "mobile",
          github_url: "https://github.com/yourusername/weather-app",
          image_url: "/placeholder.svg?height=300&width=400&query=weather mobile app",
          featured: false,
          start_date: "2023-03-01",
          end_date: "2023-04-15",
          status: "completed",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("projects", null, {})
  },
}
