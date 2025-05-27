/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the first user ID
    const users = await queryInterface.sequelize.query(`SELECT id FROM users LIMIT 1;`, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })
    const userId = users[0]?.id

    // Get the first portfolio ID
    const portfolios = await queryInterface.sequelize.query(`SELECT id FROM portfolios LIMIT 1;`, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })
    const portfolioId = portfolios[0]?.id

    if (!userId || !portfolioId) {
      console.log("No users or portfolios found, skipping experience seeding")
      return
    }

    await queryInterface.bulkInsert("experiences", [
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: userId,
        portfolio_id: portfolioId,
        company_name: "Tech Innovations Inc.",
        position: "Senior Full Stack Developer",
        employment_type: "full_time",
        location: "San Francisco, CA",
        is_remote: true,
        start_date: "2022-01-01",
        end_date: null,
        is_current: true,
        description: "Leading development of enterprise web applications using modern technologies.",
        responsibilities: JSON.stringify([
          "Architected and implemented scalable backend services using Node.js and NestJS",
          "Developed responsive frontend interfaces with React and TypeScript",
          "Managed PostgreSQL databases and implemented efficient data models",
          "Led a team of 5 developers and mentored junior engineers",
          "Implemented CI/CD pipelines and automated testing strategies",
        ]),
        achievements: JSON.stringify([
          "Reduced API response times by 40% through optimization",
          "Implemented microservices architecture that improved system reliability",
          "Introduced TypeScript which reduced bugs by 25%",
          "Launched 3 major product features that increased user engagement by 30%",
        ]),
        technologies: JSON.stringify([
          "TypeScript",
          "Node.js",
          "NestJS",
          "React",
          "PostgreSQL",
          "Docker",
          "AWS",
          "GraphQL",
        ]),
        company_url: "https://techinnovations.example.com",
        company_logo_url: "https://via.placeholder.com/150",
        display_order: 0,
        is_highlighted: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: userId,
        portfolio_id: portfolioId,
        company_name: "Digital Solutions LLC",
        position: "Frontend Developer",
        employment_type: "full_time",
        location: "New York, NY",
        is_remote: false,
        start_date: "2020-03-15",
        end_date: "2021-12-31",
        is_current: false,
        description: "Developed and maintained client-facing web applications.",
        responsibilities: JSON.stringify([
          "Built responsive web applications using React and Redux",
          "Collaborated with UX/UI designers to implement pixel-perfect designs",
          "Optimized application performance and loading times",
          "Implemented unit and integration tests using Jest and React Testing Library",
          "Participated in code reviews and agile development processes",
        ]),
        achievements: JSON.stringify([
          "Improved website performance score from 65 to 95",
          "Reduced bundle size by 30% through code splitting",
          "Implemented a component library that accelerated development by 40%",
        ]),
        technologies: JSON.stringify(["JavaScript", "React", "Redux", "HTML5", "CSS3", "SASS", "Webpack", "Jest"]),
        company_url: "https://digitalsolutions.example.com",
        company_logo_url: "https://via.placeholder.com/150",
        display_order: 1,
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: userId,
        portfolio_id: portfolioId,
        company_name: "Startup Ventures",
        position: "Backend Developer",
        employment_type: "contract",
        location: "Austin, TX",
        is_remote: true,
        start_date: "2019-06-01",
        end_date: "2020-02-28",
        is_current: false,
        description: "Developed RESTful APIs and microservices for a fintech startup.",
        responsibilities: JSON.stringify([
          "Designed and implemented RESTful APIs using Node.js and Express",
          "Developed microservices architecture for scalable backend systems",
          "Managed MongoDB databases and implemented data models",
          "Implemented authentication and authorization systems",
          "Created comprehensive API documentation",
        ]),
        achievements: JSON.stringify([
          "Built a payment processing system that handled $2M in transactions",
          "Reduced API error rates by 60% through improved error handling",
          "Implemented automated testing that increased code coverage to 85%",
        ]),
        technologies: JSON.stringify([
          "Node.js",
          "Express",
          "MongoDB",
          "Redis",
          "Docker",
          "Kubernetes",
          "AWS Lambda",
          "Swagger",
        ]),
        company_url: "https://startupventures.example.com",
        company_logo_url: "https://via.placeholder.com/150",
        display_order: 2,
        is_highlighted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("experiences", null, {})
  },
}
