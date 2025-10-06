import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface RichTextRendererProps {
  content?: string;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) {
    return <div className="text-gray-500 italic">Content is missing</div>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        img: ({ src, alt, ...props }) => {
          const imageSrc = (src as string) || "";
          const imageAlt = (alt as string) || "";

          if (imageSrc && imageSrc.startsWith("http")) {
            return (
              <span className="block my-6">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </span>
            );
          }

          return (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-lg shadow-lg w-full h-auto my-6"
              {...props}
            />
          );
        },

        a: ({ href, ...props }) => {
          const linkHref = (href as string) || "";
          const isExternal = linkHref.startsWith("http");

          return (
            <a
              href={linkHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-blue-600 underline hover:text-blue-800 transition-colors font-medium"
              {...props}
            />
          );
        },

        pre: ({ children, ...props }) => (
          <pre
            className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto my-6 shadow-md"
            {...props}
          >
            {children}
          </pre>
        ),

        code: ({ className, children, ...props }) => {
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },

        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-blue-500 pl-4 pr-4 italic text-gray-600 bg-blue-50 py-3 my-4 rounded-r-lg"
            {...props}
          />
        ),

        h1: ({ ...props }) => (
          <h1
            className="text-4xl font-bold text-gray-900 mb-6 mt-8"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-3xl font-bold text-gray-900 mb-4 mt-6"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="text-2xl font-bold text-gray-900 mb-3 mt-5"
            {...props}
          />
        ),
        h4: ({ ...props }) => (
          <h4
            className="text-xl font-bold text-gray-900 mb-2 mt-4"
            {...props}
          />
        ),

        p: ({ ...props }) => (
          <p className="text-gray-700 leading-relaxed mb-4" {...props} />
        ),

        ul: ({ ...props }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
        ),
        li: ({ ...props }) => <li className="text-gray-700" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
