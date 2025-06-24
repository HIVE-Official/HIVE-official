import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../lib/utils";

interface MarkdownPageProps {
  content: string;
  className?: string;
}

/**
 * A component designed to render Markdown content with consistent brand styling.
 * It leverages react-markdown and the @tailwindcss/typography plugin to display
 * formatted text for pages like legal documents, guides, or blog posts.
 */
export const MarkdownPage = ({ content, className }: MarkdownPageProps) => {
  return (
    <div
      className={cn(
        "prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};
