"use client";
// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

import styles from "../styles.module.css";
// Importing styles
import "react-quill/dist/quill.snow.css";

const EditorNew = ({ value, setValue }) => {
  // Editor state
  // Editor ref
  const quill = useRef();

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current?.getEditor(); // Use optional chaining here
  
        const range = quillEditor?.getSelection(true);
        if (range && imageUrl) {
          quillEditor.insertEmbed(range.index, "image", imageUrl);
        }
      };
  
      reader.readAsDataURL(file);
    };
  }, [quill]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],

        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),

    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <QuillEditor
      ref={(el) => (quill.current = el)}
      className={styles.editor}
      theme="snow"
      value={value}
      formats={formats}
      modules={modules}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};

export default EditorNew;
