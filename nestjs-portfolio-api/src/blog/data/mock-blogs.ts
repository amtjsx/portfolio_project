export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "web-development-trends-2024",
    title: "Web Development Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.",
    content: `
      <p>The web development landscape is constantly evolving, and 2024 brings exciting new trends and technologies that are reshaping how we build digital experiences.</p>
      
      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are becoming indispensable for modern developers.</p>
      
      <h2>2. Server Components and Hybrid Rendering</h2>
      <p>The rise of server components in frameworks like Next.js and Remix is changing how we think about client-server architecture. This hybrid approach offers the best of both worlds: server-side performance and client-side interactivity.</p>
      
      <h2>3. Edge Computing</h2>
      <p>Edge functions and distributed computing are bringing applications closer to users, resulting in faster response times and better user experiences globally.</p>
      
      <h2>4. WebAssembly Goes Mainstream</h2>
      <p>WebAssembly is no longer just for performance-critical applications. We're seeing more use cases, from running entire applications to enhancing JavaScript performance.</p>
      
      <h2>5. Enhanced Developer Experience</h2>
      <p>Tools focusing on developer experience continue to evolve. From better error messages to intuitive debugging tools, the focus is on making developers more productive.</p>
      
      <h2>Conclusion</h2>
      <p>Staying updated with these trends is crucial for any web developer looking to build modern, efficient, and user-friendly applications. The future of web development is bright, and these trends are just the beginning.</p>
    `,
    author: "Alex Morgan",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Web Development",
    image: "/placeholder.svg?height=600&width=800&text=Web+Development+Trends",
    featured: true,
  },
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Deep dive into React Hooks and learn how to build more efficient and maintainable React applications.",
    content: `
      <p>React Hooks have transformed how we write React components. This guide will help you master the most important hooks and patterns.</p>
      
      <h2>Understanding useState</h2>
      <p>The useState hook is the foundation of state management in functional components. It provides a simple way to add state to your components.</p>
      
      <pre><code>const [count, setCount] = useState(0);</code></pre>
      
      <h2>The Power of useEffect</h2>
      <p>useEffect handles side effects in your components, replacing lifecycle methods from class components.</p>
      
      <h2>Custom Hooks</h2>
      <p>Creating custom hooks allows you to extract and reuse stateful logic across multiple components.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Always follow the Rules of Hooks</li>
        <li>Keep hooks at the top level of your component</li>
        <li>Use custom hooks for complex logic</li>
      </ul>
    `,
    author: "Alex Morgan",
    date: "March 10, 2024",
    readTime: "8 min read",
    category: "Frontend",
    image: "/placeholder.svg?height=600&width=800&text=React+Hooks",
  },
  {
    slug: "ux-principles-for-developers",
    title: "Essential UX Design Principles for Developers",
    excerpt:
      "Learn the fundamental UX principles that every developer should know to create better user experiences.",
    content: `
      <p>Great user experience is not just the responsibility of designers. As developers, understanding UX principles can significantly improve the quality of your applications.</p>
      
      <h2>1. Consistency is Key</h2>
      <p>Users should feel familiar with your interface. Consistent design patterns, colors, and interactions reduce cognitive load.</p>
      
      <h2>2. Feedback and Response</h2>
      <p>Every user action should have a clear response. Whether it's a button click or form submission, users need to know their action was registered.</p>
      
      <h2>3. Accessibility First</h2>
      <p>Building accessible applications isn't optional. Consider users with disabilities from the start of your development process.</p>
      
      <h2>4. Performance is UX</h2>
      <p>A beautiful interface that loads slowly is a poor user experience. Optimize performance as part of your UX strategy.</p>
    `,
    author: "Alex Morgan",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800&text=UX+Design+Principles",
  },
  {
    slug: "comparing-frontend-frameworks",
    title: "React vs Vue vs Angular: Choosing the Right Framework",
    excerpt:
      "A detailed comparison of the three major frontend frameworks to help you make an informed decision.",
    content: `
      <p>Choosing the right frontend framework is crucial for your project's success. Let's compare the three major players in the frontend ecosystem.</p>
      
      <h2>React: The Flexible Library</h2>
      <p>React's component-based architecture and vast ecosystem make it a popular choice for projects of all sizes.</p>
      
      <h2>Vue: The Progressive Framework</h2>
      <p>Vue offers a gentle learning curve and excellent documentation, making it ideal for beginners and rapid prototyping.</p>
      
      <h2>Angular: The Complete Framework</h2>
      <p>Angular provides a full-featured framework with everything built-in, perfect for large enterprise applications.</p>
      
      <h2>Making the Choice</h2>
      <p>Consider your team's expertise, project requirements, and long-term maintenance when choosing a framework.</p>
    `,
    author: "Alex Morgan",
    date: "February 28, 2024",
    readTime: "10 min read",
    category: "Frontend",
    image: "/placeholder.svg?height=600&width=800&text=Frontend+Frameworks",
  },
  {
    slug: "optimizing-portfolio-performance",
    title: "Optimizing Your Portfolio Website for Maximum Performance",
    excerpt:
      "Tips and techniques to make your portfolio website lightning fast and improve user engagement.",
    content: `
      <p>Your portfolio website is often the first impression potential clients or employers have of your work. Making it fast and responsive is crucial.</p>
      
      <h2>Image Optimization</h2>
      <p>Images often account for the majority of page weight. Use modern formats like WebP and implement lazy loading.</p>
      
      <h2>Code Splitting</h2>
      <p>Don't load everything at once. Use dynamic imports to split your code and load components as needed.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implement proper caching headers and consider using a service worker for offline functionality.</p>
      
      <h2>Performance Monitoring</h2>
      <p>Use tools like Lighthouse and Web Vitals to continuously monitor and improve your site's performance.</p>
    `,
    author: "Alex Morgan",
    date: "February 20, 2024",
    readTime: "7 min read",
    category: "Web Development",
    image: "/placeholder.svg?height=600&width=800&text=Portfolio+Optimization",
  },
  {
    slug: "responsive-design-best-practices",
    title: "Responsive Design Best Practices in 2024",
    excerpt:
      "Modern techniques and patterns for creating truly responsive web applications that work on any device.",
    content: `
      <p>Responsive design is no longer optional. With users accessing websites from countless devices, creating adaptive experiences is essential.</p>
      
      <h2>Mobile-First Approach</h2>
      <p>Start with mobile design and progressively enhance for larger screens. This ensures a solid foundation for all users.</p>
      
      <h2>Fluid Typography</h2>
      <p>Use CSS clamp() and viewport units to create typography that scales smoothly across all screen sizes.</p>
      
      <h2>Container Queries</h2>
      <p>The new CSS container queries allow components to adapt based on their container size, not just the viewport.</p>
      
      <h2>Testing Across Devices</h2>
      <p>Don't just resize your browser. Test on real devices to ensure your responsive design works in practice.</p>
    `,
    author: "Alex Morgan",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800&text=Responsive+Design",
  },
];

export const categories = [
  { name: "Web Development", count: 2 },
  { name: "Frontend", count: 2 },
  { name: "Design", count: 2 },
  { name: "Backend", count: 0 },
  { name: "Career", count: 0 },
  { name: "Tools", count: 0 },
];
