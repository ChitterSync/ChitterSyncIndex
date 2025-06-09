"use client";
import React, { useRef, useState } from "react";

type FileItem = { name: string; size: number };

export default function VelosyncFileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [used, setUsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const max = 10 * 1024; // 10GB in MB for demo

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files).map(f => ({ name: f.name, size: Math.round(f.size / 1024 / 1024 * 100) / 100 }));
    setFiles(f => [...f, ...newFiles]);
    setUsed(u => u + newFiles.reduce((a, f) => a + f.size, 0));
  }
  function handleDelete(name: string) {
    setFiles(f => f.filter(file => file.name !== name));
    setUsed(u => u - (files.find(f => f.name === name)?.size || 0));
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, size: Math.round(f.size / 1024 / 1024 * 100) / 100 }));
    setFiles(f => [...f, ...newFiles]);
    setUsed(u => u + newFiles.reduce((a, f) => a + f.size, 0));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Velosync File Upload & Explorer</h1>
      <div
        className="w-full max-w-lg border-2 border-dashed border-blue-400 rounded-lg p-6 mb-4 bg-white dark:bg-gray-900 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleInput} />
        <p>Drag and drop files here, or <span className="text-blue-500 underline">click to select</span></p>
      </div>
      <div className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <div className="mb-2 font-semibold">Files</div>
        {files.length === 0 && <p className="text-gray-500">No files uploaded.</p>}
        <ul>
          {files.map(f => (
            <li key={f.name} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-1">
              <span>{f.name}</span>
              <span>{f.size} MB</span>
              <button className="text-red-500 ml-2" onClick={() => handleDelete(f.name)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-xs text-gray-600">Storage Used: {used.toFixed(2)} MB / 10,240 MB (10GB)</div>
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-2 mt-1">
          <div className="bg-blue-500 h-2 rounded" style={{ width: `${Math.min(used / 10240 * 100, 100)}%` }} />
        </div>
      </div>
    </main>
  );
}
