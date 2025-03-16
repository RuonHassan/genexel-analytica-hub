import React, { useCallback, useState, useEffect, useRef } from 'react';
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
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  PilcrowSquare,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { markdownToHtml, htmlToMarkdown } from '@/lib/markdown-utils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { uploadImage } from '@/lib/supabase';

interface RichTextEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'italic',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-4 my-4 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-4 my-4 space-y-1',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1 mb-1',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'my-4 leading-relaxed min-h-[1.5em]',
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic my-6 py-1',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'font-mono bg-gray-100 px-1 rounded text-sm',
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: 'my-8 border-t border-gray-300',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
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
    content: (() => {
      try {
        return markdownToHtml(content);
      } catch (error) {
        console.error('Error converting initial content to HTML:', error);
        // Return the content as-is if conversion fails
        return content;
      }
    })(),
    onUpdate: ({ editor }) => {
      try {
        const html = editor.getHTML();
        const markdown = htmlToMarkdown(html);
        onChange(markdown);
      } catch (error) {
        console.error('Error in editor update:', error);
        // If conversion fails, at least try to get the raw HTML
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
      },
      handleKeyDown: (view, event) => {
        // We'll let the default behavior handle Enter key
        // This is just a hook if we need custom behavior in the future
        return false;
      },
    },
  });

  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content) {
      try {
        const currentContent = htmlToMarkdown(editor.getHTML());
        if (content !== currentContent) {
          const html = markdownToHtml(content);
          editor.commands.setContent(html);
        }
      } catch (error) {
        console.error('Error updating editor content:', error);
        // Fallback to setting content directly if conversion fails
        try {
          editor.commands.setContent(content);
        } catch (innerError) {
          console.error('Fallback content setting also failed:', innerError);
        }
      }
    }
  }, [content, editor]);

  const handleSetLink = useCallback(() => {
    if (!editor) return;

    try {
      if (linkUrl) {
        // Validate URL
        new URL(linkUrl);
        
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: linkUrl })
          .run();
        
        toast.success('Link added successfully');
      } else {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        toast.success('Link removed');
      }
    } catch (e) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLinkUrl('');
    setIsLinkModalOpen(false);
  }, [editor, linkUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleAddImage = async () => {
    if (!editor) return;

    if (selectedFile) {
      try {
        setIsUploading(true);
        
        // First, upload the image to Supabase storage
        const imageUrl = await uploadImage(selectedFile, 'article-images');
        
        // Log the URL for debugging
        console.log('Image uploaded to Supabase. URL:', imageUrl);
        
        // Then insert the image URL into the editor
        editor
          .chain()
          .focus()
          .setImage({ 
            src: imageUrl,
            alt: selectedFile.name,
            title: selectedFile.name
          })
          .run();
        
        toast.success('Image uploaded and added successfully');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setIsImageModalOpen(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
      return;
    }

    try {
      if (!imageUrl) {
        toast.error('Please enter an image URL or select a file');
        return;
      }

      // Validate URL
      new URL(imageUrl);
      
      editor
        .chain()
        .focus()
        .setImage({ 
          src: imageUrl,
          alt: 'Image',
          title: 'Image'
        })
        .run();
      
      toast.success('Image added successfully');
      setImageUrl('');
      setIsImageModalOpen(false);
    } catch (e) {
      toast.error('Please enter a valid image URL');
    }
  };

  // Toolbar item style 
  const toolbarItemClass = "p-1.5 rounded hover:bg-gray-200 transition-colors";
  const activeToolbarItemClass = "bg-gray-200 text-gray-900";

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md overflow-hidden w-full">
      {/* Main toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 w-full overflow-x-auto">
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

      {/* Link Dialog */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetLink}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageModalOpen} onOpenChange={(open) => {
        setIsImageModalOpen(open);
        if (!open) {
          setSelectedFile(null);
          setImageUrl('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-4">
              <div className="grid gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="image">Upload Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>
                {selectedFile && (
                  <p className="text-sm text-gray-500">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="url" className="mt-4">
              <div className="grid gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={isUploading}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageModalOpen(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddImage}
              disabled={(!imageUrl && !selectedFile) || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Add Image'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full max-w-none p-4 min-h-[300px] focus:outline-none overflow-x-auto
          [&_.ProseMirror]:min-h-[250px] 
          [&_.ProseMirror]:max-w-none
          [&_.ProseMirror]:w-full
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ul]:my-4
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4 [&_.ProseMirror_ol]:my-4
          [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_li]:pl-1
          [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:my-6
          [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:my-5
          [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:my-4
          [&_.ProseMirror_p]:my-4 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_p]:min-h-[1.5em]
          [&_.ProseMirror_p:empty]:min-h-[1.5em] [&_.ProseMirror_p:empty]:before:content-['_'] [&_.ProseMirror_p:empty]:before:opacity-0
          [&_.ProseMirror_p+p]:mt-4
          [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-6 [&_.ProseMirror_blockquote]:py-1
          [&_.ProseMirror_pre]:bg-gray-100 [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:my-4 [&_.ProseMirror_pre]:overflow-auto
          [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm
          [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:my-6 [&_.ProseMirror_img]:mx-auto
          [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:font-medium
          [&_.ProseMirror_strong]:font-bold [&_.ProseMirror_b]:font-bold
          [&_.ProseMirror_em]:italic [&_.ProseMirror_i]:italic
          [&_.ProseMirror_u]:underline
          [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:my-6
          [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-gray-300 [&_.ProseMirror_th]:p-2 [&_.ProseMirror_th]:bg-gray-100 [&_.ProseMirror_th]:font-semibold
          [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-gray-300 [&_.ProseMirror_td]:p-2
          [&_.ProseMirror_mark]:bg-yellow-200 [&_.ProseMirror_mark]:p-0 [&_.ProseMirror_mark]:rounded-sm
          [&_.ProseMirror_hr]:my-8 [&_.ProseMirror_hr]:border-t [&_.ProseMirror_hr]:border-gray-300
        "
      />
    </div>
  );
};

export default RichTextEditor; 