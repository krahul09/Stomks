"use client";

import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "Understanding Technical Analysis: A Beginner's Guide",
      excerpt:
        "Learn the fundamentals of technical analysis and how to use it in your trading strategy.",
      author: "John Doe",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "Trading Basics",
    },
    {
      title: "Top 5 Trading Strategies for Beginners",
      excerpt:
        "Discover proven trading strategies that can help you get started in the market.",
      author: "Jane Smith",
      date: "2024-03-14",
      readTime: "7 min read",
      category: "Strategies",
    },
    {
      title: "Risk Management: Protecting Your Trading Capital",
      excerpt:
        "Essential tips and techniques for managing risk in your trading portfolio.",
      author: "Mike Johnson",
      date: "2024-03-13",
      readTime: "6 min read",
      category: "Risk Management",
    },
    {
      title: "The Psychology of Trading: Mastering Your Mindset",
      excerpt:
        "Understanding the psychological aspects of trading and how to maintain discipline.",
      author: "Sarah Wilson",
      date: "2024-03-12",
      readTime: "8 min read",
      category: "Psychology",
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Trading Blog
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Insights, strategies, and tips to improve your trading skills
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 py-12">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group flex flex-col space-y-4 rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
          >
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {post.author}
              </span>
            </div>
            <h2 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">
              {post.title}
            </h2>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <Link
              href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Read More
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
