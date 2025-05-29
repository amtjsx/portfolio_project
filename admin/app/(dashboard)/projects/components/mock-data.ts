// Mock data for demonstration purposes
// In a real application, this would come from your API

export const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    longDescription:
      "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. The application uses React for the frontend, Node.js with Express for the backend, and PostgreSQL for data storage.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
      "Express.js",
    ],
    category: "web",
    githubUrl: "https://github.com/example/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=ecommerce platform dashboard",
    featured: true,
    startDate: "2023-01-15",
    endDate: "2023-04-20",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates",
    longDescription:
      "A modern task management application that enables teams to collaborate effectively. Built with Next.js and featuring real-time updates via WebSockets, drag-and-drop task organization, team collaboration tools, and comprehensive project analytics.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "WebSockets",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    category: "web",
    githubUrl: "https://github.com/example/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=task management kanban board",
    featured: true,
    startDate: "2023-05-01",
    endDate: "2023-07-15",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "Real-time weather monitoring dashboard with data visualization",
    longDescription:
      "An interactive weather dashboard that provides real-time weather data and forecasts. Features include location-based weather updates, interactive maps, historical data charts, and weather alerts.",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Vuex", "SCSS"],
    category: "web",
    githubUrl: "https://github.com/example/weather-dashboard",
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=weather dashboard with charts",
    featured: false,
    startDate: "2023-03-10",
    endDate: "2023-04-05",
    status: "completed" as const,
  },
  {
    id: "4",
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile app for fitness tracking and workout planning",
    longDescription:
      "A comprehensive fitness tracking application built with React Native. Features include workout logging, progress tracking, nutrition monitoring, social features, and integration with wearable devices.",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
    category: "mobile",
    githubUrl: "https://github.com/example/fitness-tracker",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=mobile fitness app interface",
    featured: false,
    startDate: "2023-06-01",
    endDate: "2023-09-30",
    status: "completed" as const,
  },
  {
    id: "5",
    title: "AI Content Generator",
    description: "AI-powered content generation tool using OpenAI GPT",
    longDescription:
      "An intelligent content generation platform that leverages OpenAI's GPT models to create high-quality content. Features include multiple content types, customizable templates, collaboration tools, and content optimization suggestions.",
    technologies: [
      "Next.js",
      "OpenAI API",
      "Prisma",
      "TypeScript",
      "Tailwind CSS",
      "Vercel AI SDK",
    ],
    category: "web",
    githubUrl: "https://github.com/example/ai-content-generator",
    liveUrl: "https://ai-content-demo.vercel.app",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=AI content generation interface",
    featured: false,
    startDate: "2023-08-15",
    status: "in-progress" as const,
  },
  {
    id: "6",
    title: "DevOps Monitoring Suite",
    description:
      "Comprehensive monitoring and alerting system for cloud infrastructure",
    longDescription:
      "A complete DevOps monitoring solution that provides real-time insights into cloud infrastructure performance. Includes custom dashboards, automated alerting, log aggregation, and performance analytics.",
    technologies: [
      "Python",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "AWS",
    ],
    category: "devops",
    githubUrl: "https://github.com/example/devops-monitoring",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=devops monitoring dashboard",
    featured: false,
    startDate: "2023-09-01",
    status: "in-progress" as const,
  },
  {
    id: "7",
    title: "Blockchain Voting System",
    description:
      "Secure and transparent voting system built on blockchain technology",
    longDescription:
      "A decentralized voting platform that ensures transparency and security through blockchain technology. Features include voter authentication, real-time vote counting, audit trails, and smart contract integration.",
    technologies: [
      "Solidity",
      "Web3.js",
      "React",
      "Ethereum",
      "IPFS",
      "MetaMask",
    ],
    category: "web",
    githubUrl: "https://github.com/example/blockchain-voting",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=blockchain voting interface",
    featured: false,
    startDate: "2023-10-01",
    status: "planned" as const,
  },
  {
    id: "8",
    title: "Data Analytics Platform",
    description:
      "Business intelligence platform with advanced data visualization",
    longDescription:
      "A comprehensive data analytics platform that helps businesses make data-driven decisions. Features include data ingestion from multiple sources, advanced visualization tools, predictive analytics, and automated reporting.",
    technologies: [
      "Python",
      "Pandas",
      "Plotly",
      "FastAPI",
      "PostgreSQL",
      "Redis",
    ],
    category: "data",
    githubUrl: "https://github.com/example/data-analytics",
    imageUrl:
      "/placeholder.svg?height=400&width=600&query=data analytics dashboard",
    featured: false,
    startDate: "2023-11-01",
    status: "planned" as const,
  },
];
