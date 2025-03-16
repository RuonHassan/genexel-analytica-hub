import React from 'react';
import DOMPurify from 'dompurify';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

const RichTextRenderer = ({ content, className = '' }: RichTextRendererProps) => {
  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div 
      className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none ${className}
        [&_ul]:list-disc [&_ul]:ml-4 
        [&_ol]:list-decimal [&_ol]:ml-4
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2
        [&_p]:mb-4
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic
        [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:my-4
        [&_code]:font-mono [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded
        [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4
        [&_a]:text-blue-600 [&_a]:underline
      `}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default RichTextRenderer; 