"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import TextAlign from "@tiptap/extension-text-align";
import React from "react";
import { TextSelection } from "@tiptap/pm/state";
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2,
  List, ListOrdered, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Undo, Redo,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ 
        inline: false,
        allowBase64: true,
      }),
      ResizeImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Use useEffect to update editor content when 'value' prop changes (e.g., when data is fetched)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Handle the custom delete button click from within the editor
  React.useEffect(() => {
    if (!editor) return;

    // Monitor the DOM to inject delete buttons into any new image wrappers (like on initial load)
    const observer = new MutationObserver((mutations) => {
      const wrappers = editor.view.dom.querySelectorAll('.Tiptap-ImageResize-wrapper');
      wrappers.forEach(wrapper => {
        if (!wrapper.querySelector('.delete-image-btn')) {
          const btn = document.createElement('button');
          btn.className = 'delete-image-btn';
          btn.innerHTML = '✕';
          btn.type = 'button';
          btn.title = 'Remove Image';
          // Ensure button is at a high z-index and has absolute positioning
          btn.style.position = 'absolute';
          btn.style.top = '-10px';
          btn.style.right = '-10px';
          btn.style.zIndex = '1000';
          wrapper.appendChild(btn);
        }
      });
    });

    observer.observe(editor.view.dom, { childList: true, subtree: true, attributes: true });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('delete-image-btn')) {
        e.preventDefault();
        e.stopPropagation();

        const wrapper = target.closest('.Tiptap-ImageResize-wrapper') as HTMLElement;
        if (!wrapper) return;

        console.log('Delete button clicked for image wrapper');
        
        const img = wrapper.querySelector('img');
        const src = img?.getAttribute('src');

        if (src) {
          let deleted = false;
          editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'image' && node.attrs.src === src) {
              editor.chain().focus().setNodeSelection(pos).deleteSelection().run();
              deleted = true;
              return false;
            }
            return true;
          });

          if (!deleted) {
            try {
              const pos = editor.view.posAtDOM(wrapper, 0);
              editor.chain().focus().setNodeSelection(pos).deleteSelection().run();
            } catch {
              // Fallback failed silently
            }
          }
        }
      }
    };

    const view = editor.view.dom;
    view.addEventListener('click', handleClick);
    return () => {
      view.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, [editor]);

  if (!editor) return null;

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        editor?.chain().focus().setImage({ src: result }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const ToolBtn = ({ active, onClick, children, title }: any) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "p-1.5 rounded transition-colors",
        active ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-md border border-input bg-background overflow-hidden">
      <div className="flex flex-wrap gap-0.5 border-b border-input bg-muted/40 p-2">
        <ToolBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <Bold size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <Italic size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
          <UnderlineIcon size={15} />
        </ToolBtn>
        <div className="w-px bg-border mx-1" />
        <ToolBtn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
          <Heading1 size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
          <Heading2 size={15} />
        </ToolBtn>
        <div className="w-px bg-border mx-1" />
        <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
          <List size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
          <ListOrdered size={15} />
        </ToolBtn>
        <div className="w-px bg-border mx-1" />
        <ToolBtn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align Left">
          <AlignLeft size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align Center">
          <AlignCenter size={15} />
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align Right">
          <AlignRight size={15} />
        </ToolBtn>
        <div className="w-px bg-border mx-1" />
        <ToolBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={15} />
        </ToolBtn>
        <ToolBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={15} />
        </ToolBtn>
        <div className="w-px bg-border mx-1" />
        <label className="cursor-pointer" title="Insert Image">
          <input 
            type="file" 
            hidden 
            accept="image/*" 
            onChange={(e) => { 
                if (e.target.files?.[0]) uploadImage(e.target.files[0]); 
                e.target.value = ''; // Reset input so same file can be uploaded again
            }} 
          />
          <div className={cn(
            "p-1.5 rounded transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          )}>
            <ImageIcon size={15} />
          </div>
        </label>
        {editor.isActive("image") && (
          <ToolBtn 
            onClick={() => {
              const { state } = editor;
              const { selection } = state;
              if (selection instanceof TextSelection) {
                // If it's a text selection but isActive('image') is true, 
                // it might be a bug or edge case, try deleteNode
                editor.chain().focus().deleteNode('image').run();
              } else {
                editor.chain().focus().deleteSelection().run();
              }
            }} 
            title="Remove Image"
          >
            <Trash2 size={15} className="text-destructive" />
          </ToolBtn>
        )}
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px] 
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img.ProseMirror-selectednode]:outline [&_img.ProseMirror-selectednode]:outline-2 [&_img.ProseMirror-selectednode]:outline-[var(--accent)] [&_img]:cursor-pointer [&_img]:display-inline-block
          [&_.Tiptap-ImageResize-wrapper]:relative [&_.Tiptap-ImageResize-wrapper]:inline-block
          [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:absolute [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:top-[-10px] [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:right-[-10px] 
          [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:bg-destructive [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:text-destructive-foreground 
          [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:w-6 [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:h-6 [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:flex [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:items-center [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:justify-center [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:rounded-full [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:shadow-xl 
          [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:opacity-100 [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:z-[100] [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:cursor-pointer [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:border-2 [&_.Tiptap-ImageResize-wrapper_.delete-image-btn]:border-white
          [&_.Tiptap-ImageResize-wrapper:hover_.delete-image-btn]:opacity-100"
      />
    </div>
  );
}
