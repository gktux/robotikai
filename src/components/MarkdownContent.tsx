"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import DOMPurify from "isomorphic-dompurify";

export function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;

  // Security: Sanitize HTML content to prevent XSS attacks while allowing safe tags from the editor
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ["iframe"], // Allow iframes for videos if needed
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-img:rounded-2xl prose-img:shadow-lg prose-img:mx-auto prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline markdown-container">
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]} 
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            if (!props.src) return null;
            // eslint-disable-next-line @next/next/no-img-element
            return <img {...props} alt={props.alt || ""} />;
          }
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}
