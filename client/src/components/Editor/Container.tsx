import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Menubar from "./Menubar";

function Container() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>
        Hi there,
      </h2>
    `,
  });

  return (
    <div>
      {editor && <Menubar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Container;
