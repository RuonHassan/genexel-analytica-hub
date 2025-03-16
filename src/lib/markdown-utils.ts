/**
 * Markdown and HTML utility functions
 */
import MarkdownIt from 'markdown-it';
// @ts-ignore - html-to-markdown doesn't have TypeScript definitions
import { convert } from 'html-to-markdown';
import DOMPurify from 'dompurify';
// @ts-ignore - markdown-it-attrs might not have TypeScript definitions
import markdownItAttrs from 'markdown-it-attrs';

// Initialize markdown parser with proper configuration
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: ["''", "\"\""], // Smart quotes configuration
}).use(markdownItAttrs); // Add support for attributes if needed

// Configure DOMPurify to preserve important whitespace
DOMPurify.setConfig({
  KEEP_CONTENT: true,
  WHOLE_DOCUMENT: true,
  SANITIZE_DOM: true
});

/**
 * Converts markdown to HTML
 * @param markdown - The markdown string to convert
 * @returns The HTML string
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  try {
    // Check if it's already HTML content
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(markdown);
    if (isHtml) return markdown;
    
    // Normalize line endings
    let normalizedMarkdown = markdown
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');
    
    // Preserve consecutive newlines by converting them to special placeholder
    normalizedMarkdown = normalizedMarkdown.replace(/\n\n+/g, match => {
      // For each pair of newlines, we'll create an empty paragraph
      const paragraphs = Array(match.length - 1).fill('<p>&nbsp;</p>').join('');
      return '\n' + paragraphs + '\n';
    });
    
    // Convert to HTML
    let result = md.render(normalizedMarkdown);
    
    // Ensure empty paragraphs are preserved
    result = result.replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>');
    
    return result;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return '';
  }
};

/**
 * Converts HTML to markdown
 * @param html - The HTML string to convert
 * @returns The markdown string
 */
export const htmlToMarkdown = (html: string): string => {
  if (!html) return '';
  try {
    // If it appears to be already in markdown format, return as is
    if (html.includes('**') && !/<\/?[a-z][\s\S]*>/i.test(html)) return html;
    
    // Preprocess the HTML to fix common issues
    let cleanHtml = html
      // Preserve non-breaking spaces in empty paragraphs (don't convert to regular spaces)
      .replace(/<p>&nbsp;<\/p>/g, '<p>​</p>') // Use zero-width space as marker
      .replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '<p>​</p>')
      .replace(/<div>\s*<br\s*\/?>\s*<\/div>/g, '<div>​</div>')
      .replace(/<div>\s*&nbsp;\s*<\/div>/g, '<div>​</div>')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Fix spacing around block elements
      .replace(/<\/(p|div|h[1-6]|blockquote|pre|table|tr|li)>\s+/g, '</$1>\n')
      .replace(/\s+<(p|div|h[1-6]|blockquote|pre|table|tr|li)/g, '\n<$1');
      
    // Use the convert function with improved selector configuration
    let markdown = convert(cleanHtml, {
      selectors: [
        { selector: 'img', format: 'markdown' },
        { selector: 'a', format: 'markdown' },
        { selector: 'p', format: 'markdown' },
        { selector: 'h1', format: 'markdown' },
        { selector: 'h2', format: 'markdown' },
        { selector: 'h3', format: 'markdown' },
        { selector: 'ul', format: 'markdown' },
        { selector: 'ol', format: 'markdown' },
        { selector: 'li', format: 'markdown' },
        { selector: 'blockquote', format: 'markdown' },
        { selector: 'code', format: 'markdown' },
        { selector: 'pre', format: 'markdown' },
        { selector: 'strong', format: 'markdown' },
        { selector: 'b', format: 'markdown' },
        { selector: 'em', format: 'markdown' },
        { selector: 'i', format: 'markdown' },
        { selector: 'u', format: 'markdown' },
        { selector: 'table', format: 'markdown' },
        { selector: 'tr', format: 'markdown' },
        { selector: 'td', format: 'markdown' },
        { selector: 'th', format: 'markdown' },
      ]
    });
    
    // Convert our zero-width space markers back to double line breaks
    markdown = markdown.replace(/​/g, '\n\n');
    
    // Normalize line endings in the generated markdown
    return markdown
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Ensure consistent spacing for empty lines
      .replace(/\n{3,}/g, '\n\n\n')
      // Trim extra whitespace
      .trim();
  } catch (error) {
    console.error('Error converting HTML to markdown:', error);
    return '';
  }
};

/**
 * Sanitizes and renders content as HTML
 * Automatically detects if the content is markdown or HTML
 * @param content - The content to render
 * @returns Sanitized HTML
 */
export const renderContent = (content: string): string => {
  if (!content) return '';
  try {
    // Check if content is already HTML
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
    
    let htmlContent;
    // If it's already HTML, just sanitize it
    if (isHtml) {
      htmlContent = content;
    } else {
      // Otherwise, convert markdown to HTML
      htmlContent = md.render(content);
    }
    
    // Sanitize the HTML and ensure consistent spacing
    const sanitized = DOMPurify.sanitize(htmlContent);
    
    // Apply additional spacing and line break normalization
    let finalHtml = sanitized
      // Ensure list items have proper spacing
      .replace(/<\/li><li>/g, '</li>\n<li>')
      // Ensure paragraphs have proper spacing
      .replace(/<\/p><p>/g, '</p>\n<p>')
      // Ensure headings have proper spacing
      .replace(/<\/h([1-6])><h([1-6])>/g, '</h$1>\n<h$2>')
      // Ensure empty paragraphs are preserved
      .replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>')
      // Normalize any excessive whitespace
      .replace(/\s{2,}/g, ' ');
    
    // Double check for consecutive empty paragraphs and preserve them
    // This regex looks for sequences of empty paragraphs and keeps them intact
    finalHtml = finalHtml.replace(/(<p>&nbsp;<\/p>)+/g, match => match);
    
    return finalHtml;
  } catch (error) {
    console.error('Error rendering content:', error);
    return DOMPurify.sanitize(content); // Fallback to sanitized content
  }
}; 