'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// استيراد المحرر بشكل ديناميكي مع تعطيل SSR
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
  }
);

// استيراد أداة المعاينة بشكل ديناميكي
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

interface MDEditorProps {
  value: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  height?: string;
  mode?: 'edit' | 'preview' | 'split';
}

export default function CustomMDEditor({
  value,
  onChange,
  placeholder = 'اكتب محتوى هنا باستخدام Markdown...',
  height = '500px',
  mode = 'edit'
}: MDEditorProps) {
  const [editorMode, setEditorMode] = useState<'edit' | 'preview' | 'split'>(mode);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="md-editor-container" data-color-mode="light">
      <style jsx global>{`
        .md-editor-container .w-md-editor {
          min-height: ${height};
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .md-editor-container .w-md-editor-toolbar {
          border-radius: 8px 8px 0 0;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          padding: 8px;
        }
        
        .md-editor-container .w-md-editor-content {
          min-height: calc(${height} - 40px);
          border-radius: 0 0 8px 8px;
        }
        
        .md-editor-container .w-md-editor-text-input {
          font-size: 16px;
          line-height: 1.8;
          padding: 16px;
          direction: rtl;
          text-align: right;
        }
        
        .md-editor-container .w-md-editor-preview {
          padding: 16px;
          direction: rtl;
          text-align: right;
        }
        
        .md-editor-container .wmde-markdown {
          font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          direction: rtl;
          text-align: right;
          font-size: 16px;
          line-height: 1.8;
        }
        
        .md-editor-container .wmde-markdown h1,
        .md-editor-container .wmde-markdown h2,
        .md-editor-container .wmde-markdown h3,
        .md-editor-container .wmde-markdown h4,
        .md-editor-container .wmde-markdown h5,
        .md-editor-container .wmde-markdown h6 {
          font-weight: bold;
          margin-top: 24px;
          margin-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }
        
        .md-editor-container .wmde-markdown ul,
        .md-editor-container .wmde-markdown ol {
          padding-right: 24px;
        }
        
        .md-editor-container .wmde-markdown blockquote {
          border-right: 4px solid #3b82f6;
          padding-right: 16px;
          margin-right: 0;
          background-color: #f0f9ff;
        }
        
        .md-editor-container .wmde-markdown code {
          font-family: 'Courier New', monospace;
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .md-editor-container .wmde-markdown pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 16px;
          border-radius: 8px;
          direction: ltr;
          text-align: left;
        }
        
        /* تنسيق الأزرار */
        .editor-mode-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .editor-mode-button {
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
          background-color: white;
        }
        
        .editor-mode-button.active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .editor-mode-button:hover:not(.active) {
          background-color: #f9fafb;
        }
      `}</style>

      {/* أزرار تغيير وضع المحرر */}
      <div className="editor-mode-buttons">
        <button
          className={`editor-mode-button ${editorMode === 'edit' ? 'active' : ''}`}
          onClick={() => setEditorMode('edit')}
        >
          ✏️ التحرير
        </button>
        <button
          className={`editor-mode-button ${editorMode === 'preview' ? 'active' : ''}`}
          onClick={() => setEditorMode('preview')}
        >
          👁️ المعاينة
        </button>
        <button
          className={`editor-mode-button ${editorMode === 'split' ? 'active' : ''}`}
          onClick={() => setEditorMode('split')}
        >
          ⬌ التقسيم
        </button>
      </div>

      {/* المحرر */}
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        placeholder={placeholder}
        preview={editorMode}
        visibleDragbar={false}
      />
      
      {/* دليل Markdown السريع */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">📖 دليل Markdown السريع:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
          <div># عنوان كبير</div>
          <div>## عنوان متوسط</div>
          <div>**نص عريض**</div>
          <div>*نص مائل*</div>
          <div>- قائمة نقطية</div>
          <div>1. قائمة رقمية</div>
          <div>[رابط](URL)</div>
          <div>`رمز برمجي`</div>
        </div>
      </div>
    </div>
  );
}