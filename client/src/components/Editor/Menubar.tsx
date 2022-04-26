// ? EditorBar

import React from "react";
import { Editor } from "@tiptap/react";
import styled from "styled-components";
import "remixicon/fonts/remixicon.css";

import MenuIcon from "./MenuIcon";

interface MenubarProps {
  editor: Editor;
}

interface StyledButtonProps {
  isActive?: boolean;
}

function Menubar({ editor }: MenubarProps) {
  if (!editor) {
    return null;
  }

  const handleClickAddImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    return true;
  };

  return (
    <div style={{ display: "flex" }}>
      <MenuIcon
        icon="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <MenuIcon
        icon="italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <MenuIcon
        icon="strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      />

      <MenuIcon
        icon="list-unordered"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />

      <MenuIcon
        icon="list-ordered"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      />
      {/* <MenuIcon icon="image-add-line" onClick={handleClickAddImage} /> */}
    </div>
  );
}

export default Menubar;
