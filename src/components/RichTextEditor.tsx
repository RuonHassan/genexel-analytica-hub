import React, { useCallback, useState, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Button } from './ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Code, 
  Quote, 
  Link as LinkIcon,
  ImageIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  Table as TableIcon,
  Highlighter,
  Undo,
  Redo,
  PilcrowSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MarkdownIt from 'markdown-it';
// @ts-ignore - html-to-markdown doesn't have TypeScript definitions
import { convert } from 'html-to-markdown';

interface RichTextEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Initialize markdown parser
  const md = new MarkdownIt({
    html: false,
    breaks: true,
    linkify: true,
  });

  // Convert markdown to HTML for the editor
  const markdownToHtml = (markdown: string) => {
    if (!markdown) return '';
    return md.render(markdown);
  };

  // Convert editor HTML to markdown
  const htmlToMarkdown = (html: string) => {
    if (!html) return '';
    return convert(html);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-2 rounded my-2 font-mono text-sm',
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-200',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: markdownToHtml(content),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = htmlToMarkdown(html);
      onChange(markdown);
    },
  });

  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== htmlToMarkdown(editor.getHTML())) {
      editor.commands.setContent(markdownToHtml(content));
    }
  }, [content, editor]);

  // Helper functions for link and image handling
  const setLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // Update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run();
    setLinkUrl('');
    setIsLinkModalOpen(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setIsImageModalOpen(false);
    }
  }, [editor, imageUrl]);

  // Toolbar item style 
  const toolbarItemClass = "p-1.5 rounded hover:bg-gray-200 transition-colors";
  const activeToolbarItemClass = "bg-gray-200 text-gray-900";

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Main toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <div className="flex items-center space-x-1 pr-2 border-r">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(toolbarItemClass, editor.isActive('bold') && activeToolbarItemClass)}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(toolbarItemClass, editor.isActive('italic') && activeToolbarItemClass)}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(toolbarItemClass, editor.isActive('underline') && activeToolbarItemClass)}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 px-2 border-r">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(toolbarItemClass, editor.isActive('heading', { level: 1 }) && activeToolbarItemClass)}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(toolbarItemClass, editor.isActive('heading', { level: 2 }) && activeToolbarItemClass)}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(toolbarItemClass, editor.isActive('heading', { level: 3 }) && activeToolbarItemClass)}
            title="Heading 3"
          >
            <PilcrowSquare className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 px-2 border-r">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(toolbarItemClass, editor.isActive('bulletList') && activeToolbarItemClass)}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(toolbarItemClass, editor.isActive('orderedList') && activeToolbarItemClass)}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 px-2 border-r">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(toolbarItemClass, editor.isActive('blockquote') && activeToolbarItemClass)}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn(toolbarItemClass, editor.isActive('codeBlock') && activeToolbarItemClass)}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            type="button" 
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(toolbarItemClass, editor.isActive('highlight') && activeToolbarItemClass)}
            title="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 px-2 border-r">
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className={cn(toolbarItemClass, editor.isActive('link') && activeToolbarItemClass)}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className={toolbarItemClass}
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={cn(toolbarItemClass, editor.isActive('table') && activeToolbarItemClass)}
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 px-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={cn(toolbarItemClass, !editor.can().undo() && "opacity-50 cursor-not-allowed")}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={cn(toolbarItemClass, !editor.can().redo() && "opacity-50 cursor-not-allowed")}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="p-3 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 p-2 border rounded"
              autoFocus
            />
            <Button
              onClick={setLink}
              size="sm"
            >
              Save
            </Button>
            <Button
              onClick={() => setIsLinkModalOpen(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="p-3 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 p-2 border rounded"
              autoFocus
            />
            <Button
              onClick={addImage}
              size="sm"
            >
              Add
            </Button>
            <Button
              onClick={() => setIsImageModalOpen(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Bubble menu for quick formatting when text is selected */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center bg-white border shadow-lg rounded-md p-1 space-x-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn("p-1 rounded hover:bg-gray-100", editor.isActive('bold') && "bg-gray-200")}
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn("p-1 rounded hover:bg-gray-100", editor.isActive('italic') && "bg-gray-200")}
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn("p-1 rounded hover:bg-gray-100", editor.isActive('underline') && "bg-gray-200")}
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={cn("p-1 rounded hover:bg-gray-100", editor.isActive('highlight') && "bg-gray-200")}
            >
              <Highlighter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsLinkModalOpen(true)}
              className={cn("p-1 rounded hover:bg-gray-100", editor.isActive('link') && "bg-gray-200")}
            >
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* The actual editor content */}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none" 
      />
    </div>
  );
};

export default RichTextEditor; 