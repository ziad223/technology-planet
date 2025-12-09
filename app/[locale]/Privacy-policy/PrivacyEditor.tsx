"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PrivacyEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="p-5 bg-white">
<ReactQuill
  value={content}
  onChange={setContent}
  theme="snow"
  className="mb-10"
  style={{ height: "300px" }}
/>    </div>
  );
}
