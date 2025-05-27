"use client"
const { v4: uuidv4 } = require("uuid")

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs from the database
    const users = await queryInterface.sequelize.query("SELECT id FROM users LIMIT 2", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    // Get portfolio IDs from the database
    const portfolios = await queryInterface.sequelize.query("SELECT id FROM portfolios LIMIT 2", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    // Get category IDs from the database
    const categories = await queryInterface.sequelize.query("SELECT id FROM blog_categories", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    if (users.length === 0 || portfolios.length === 0 || categories.length === 0) {
      console.log("Skipping blog seed: missing required data")
      return
    }

    const now = new Date()
    const publishedDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago

    const blogs = [
      {
        id: uuidv4(),
        user_id: users[0].id,
        portfolio_id: portfolios[0].id,
        category_id: categories[0].id,
        title: "Getting Started with React Hooks",
        slug: "getting-started-with-react-hooks",
        subtitle: "A comprehensive guide to React Hooks",
        content: `
# Getting Started with React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class. They let you "hook into" React state and lifecycle features from function components.

## Why Hooks?

Hooks solve several problems in React:

- It's hard to reuse stateful logic between components
- Complex components become hard to understand
- Classes confuse both people and machines

## Basic Hooks

### useState

The useState hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The useEffect hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Rules of Hooks

Hooks are JavaScript functions, but they impose two additional rules:

1. Only call Hooks at the top level. Don't call Hooks inside loops, conditions, or nested functions.
2. Only call Hooks from React function components. Don't call Hooks from regular JavaScript functions.

## Custom Hooks

Building your own Hooks lets you extract component logic into reusable functions.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
\`\`\`

## Conclusion

React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They also offer a new powerful way to combine them.
        `,
        excerpt:
          "Learn how to use React Hooks to add state and other React features to functional components without writing classes.",
        featured_image_url: "https://example.com/images/react-hooks.jpg",
        featured_image_caption: "React Hooks illustration",
        reading_time: 8,
        status: "published",
        visibility: "public",
        meta_title: "Getting Started with React Hooks - A Comprehensive Guide",
        meta_description:
          "Learn how to use React Hooks to add state and other React features to functional components without writing classes.",
        meta_keywords: JSON.stringify(["react", "hooks", "useState", "useEffect", "javascript"]),
        allow_comments: true,
        is_featured: true,
        views_count: 245,
        likes_count: 32,
        comments_count: 8,
        published_at: publishedDate,
        created_at: publishedDate,
        updated_at: now,
      },
      {
        id: uuidv4(),
        user_id: users[0].id,
        portfolio_id: portfolios[0].id,
        category_id: categories[1].id,
        title: "Building a Portfolio Website with Next.js",
        slug: "building-portfolio-website-nextjs",
        subtitle: "Create a professional portfolio with Next.js and Tailwind CSS",
        content: `
# Building a Portfolio Website with Next.js

A professional portfolio website is essential for developers and designers to showcase their work and skills. In this article, we'll walk through building a portfolio website using Next.js and Tailwind CSS.

## Why Next.js?

Next.js is a React framework that provides features like:

- Server-side rendering
- Static site generation
- API routes
- Built-in CSS and Sass support
- Fast refresh
- Image optimization

These features make it an excellent choice for building a portfolio website.

## Getting Started

First, let's create a new Next.js project:

\`\`\`bash
npx create-next-app my-portfolio
cd my-portfolio
\`\`\`

## Adding Tailwind CSS

Tailwind CSS is a utility-first CSS framework that makes styling your application faster and easier:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your tailwind.config.js file:

\`\`\`js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Creating the Layout

Let's create a basic layout component:

\`\`\`jsx
// components/Layout.js
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title = 'My Portfolio' }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="My professional portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}
\`\`\`

## Building the Home Page

Now, let's create the home page:

\`\`\`jsx
// pages/index.js
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <Layout title="John Doe | Web Developer">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  )
}
\`\`\`

## Deployment

Once your portfolio is ready, you can deploy it to Vercel with just a few clicks:

1. Push your code to GitHub
2. Go to vercel.com and sign in with GitHub
3. Import your repository
4. Deploy

## Conclusion

Building a portfolio with Next.js and Tailwind CSS is a great way to showcase your work while also demonstrating your technical skills. The combination provides a fast, responsive, and visually appealing website that will impress potential employers or clients.
        `,
        excerpt:
          "Learn how to build a professional portfolio website using Next.js and Tailwind CSS, from setup to deployment.",
        featured_image_url: "https://example.com/images/nextjs-portfolio.jpg",
        featured_image_caption: "Next.js Portfolio Website",
        reading_time: 10,
        status: "published",
        visibility: "public",
        meta_title: "Building a Portfolio Website with Next.js and Tailwind CSS",
        meta_description:
          "Learn how to build a professional portfolio website using Next.js and Tailwind CSS, from setup to deployment.",
        meta_keywords: JSON.stringify(["next.js", "portfolio", "tailwind css", "react", "web development"]),
        allow_comments: true,
        is_featured: true,
        views_count: 189,
        likes_count: 27,
        comments_count: 5,
        published_at: publishedDate,
        created_at: publishedDate,
        updated_at: now,
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        portfolio_id: portfolios[1].id,
        category_id: categories[2].id,
        title: "Mastering TypeScript: Tips and Tricks",
        slug: "mastering-typescript-tips-tricks",
        subtitle: "Advanced TypeScript techniques for better code",
        content: `
# Mastering TypeScript: Tips and Tricks

TypeScript has become an essential tool for JavaScript developers, providing static typing and improved tooling. In this article, we'll explore some advanced TypeScript techniques that will help you write better code.

## Utility Types

TypeScript comes with several utility types that can help you transform existing types:

### Partial

Makes all properties in a type optional:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// All properties are optional
type PartialUser = Partial<User>;
\`\`\`

### Pick

Creates a type by picking the set of properties from another type:

\`\`\`typescript
// Only has id and name properties
type UserBasicInfo = Pick<User, 'id' | 'name'>;
\`\`\`

### Omit

Creates a type by omitting properties from another type:

\`\`\`typescript
// Has all properties except email
type UserWithoutEmail = Omit<User, 'email'>;
\`\`\`

## Type Guards

Type guards help you narrow down the type of an object within a conditional block:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows that value is a string here
    console.log(value.toUpperCase());
  }
}
\`\`\`

## Discriminated Unions

Discriminated unions are a pattern where you use a common property to differentiate between different types:

\`\`\`typescript
type Success = {
  status: 'success';
  data: any;
};

type Error = {
  status: 'error';
  error: string;
};

type Response = Success | Error;

function handleResponse(response: Response) {
  if (response.status === 'success') {
    // TypeScript knows this is a Success type
    console.log(response.data);
  } else {
    // TypeScript knows this is an Error type
    console.log(response.error);
  }
}
\`\`\`

## Mapped Types

Mapped types allow you to create new types based on old ones by mapping over property types:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

const readonlyUser: Readonly<User> = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// Error: Cannot assign to 'name' because it is a read-only property
readonlyUser.name = 'Jane';
\`\`\`

## Conclusion

These advanced TypeScript techniques can help you write more type-safe and maintainable code. By leveraging TypeScript's powerful type system, you can catch errors at compile time rather than runtime, leading to more robust applications.
        `,
        excerpt:
          "Explore advanced TypeScript techniques including utility types, type guards, discriminated unions, and mapped types.",
        featured_image_url: "https://example.com/images/typescript.jpg",
        featured_image_caption: "TypeScript Code",
        reading_time: 7,
        status: "published",
        visibility: "public",
        meta_title: "Mastering TypeScript: Advanced Tips and Tricks",
        meta_description:
          "Explore advanced TypeScript techniques including utility types, type guards, discriminated unions, and mapped types.",
        meta_keywords: JSON.stringify(["typescript", "javascript", "web development", "programming", "type safety"]),
        allow_comments: true,
        is_featured: false,
        views_count: 142,
        likes_count: 18,
        comments_count: 3,
        published_at: publishedDate,
        created_at: publishedDate,
        updated_at: now,
      },
    ]

    await queryInterface.bulkInsert("blogs", blogs)

    // Get tag IDs from the database
    const tags = await queryInterface.sequelize.query("SELECT id FROM blog_tags", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    })

    // Create blog-tag mappings
    const tagMappings = []

    // For the first blog (React Hooks)
    const reactHooksTags = ["javascript", "react"]
    for (const tagName of reactHooksTags) {
      const tag = tags.find((t) => t.slug === tagName)
      if (tag) {
        tagMappings.push({
          id: uuidv4(),
          blog_id: blogs[0].id,
          tag_id: tag.id,
          created_at: now,
          updated_at: now,
        })
      }
    }

    // For the second blog (Next.js Portfolio)
    const nextjsTags = ["react", "portfolio", "javascript"]
    for (const tagName of nextjsTags) {
      const tag = tags.find((t) => t.slug === tagName)
      if (tag) {
        tagMappings.push({
          id: uuidv4(),
          blog_id: blogs[1].id,
          tag_id: tag.id,
          created_at: now,
          updated_at: now,
        })
      }
    }

    // For the third blog (TypeScript)
    const typescriptTags = ["typescript", "javascript"]
    for (const tagName of typescriptTags) {
      const tag = tags.find((t) => t.slug === tagName)
      if (tag) {
        tagMappings.push({
          id: uuidv4(),
          blog_id: blogs[2].id,
          tag_id: tag.id,
          created_at: now,
          updated_at: now,
        })
      }
    }

    // Insert tag mappings
    if (tagMappings.length > 0) {
      await queryInterface.bulkInsert("blog_tag_maps", tagMappings)

      // Update tag usage counts
      for (const tag of tags) {
        const count = tagMappings.filter((m) => m.tag_id === tag.id).length
        if (count > 0) {
          await queryInterface.sequelize.query(`UPDATE blog_tags SET usage_count = ${count} WHERE id = '${tag.id}'`)
        }
      }
    }

    // Create some comments
    const comments = [
      {
        id: uuidv4(),
        blog_id: blogs[0].id,
        user_id: users[1].id,
        content:
          "Great article! I've been using hooks for a while now and they've completely changed how I write React components.",
        status: "approved",
        likes_count: 3,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        blog_id: blogs[0].id,
        user_id: null,
        author_name: "Jane Smith",
        author_email: "jane@example.com",
        author_website: "https://janesmith.com",
        author_ip: "192.168.1.1",
        content: "Thanks for the clear explanation. I was confused about the rules of hooks before reading this.",
        status: "approved",
        likes_count: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        blog_id: blogs[1].id,
        user_id: users[1].id,
        content:
          "I just built my portfolio with Next.js and Tailwind CSS following this guide. It was much easier than I expected!",
        status: "approved",
        likes_count: 2,
        created_at: now,
        updated_at: now,
      },
    ]

    await queryInterface.bulkInsert("blog_comments", comments)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("blog_tag_maps", null, {})
    await queryInterface.bulkDelete("blog_comments", null, {})
    await queryInterface.bulkDelete("blogs", null, {})
  },
}
