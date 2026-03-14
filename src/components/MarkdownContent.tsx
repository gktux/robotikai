"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;

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
        {content}
      </ReactMarkdown>
    </div>
  );
}
