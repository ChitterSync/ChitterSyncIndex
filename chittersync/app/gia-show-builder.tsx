// ...existing code from gia-show-builder/page.tsx...
"use client";
import React, { useState } from "react";

type Episode = { title: string; duration: string; file?: File };

export default function GiaShowBuilder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [epTitle, setEpTitle] = useState("");
  const [epDuration, setEpDuration] = useState("");
  const [epFile, setEpFile] = useState<File | null>(null);

  function addEpisode(e: React.FormEvent) {
    e.preventDefault();
    if (!epTitle || !epDuration) return;
    setEpisodes([...episodes, { title: epTitle, duration: epDuration, file: epFile || undefined }]);
    setEpTitle(""); setEpDuration(""); setEpFile(null);
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Gia Show Builder</h1>
      <form className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-3">
        <input className="rounded border px-3 py-2" placeholder="Show Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="rounded border px-3 py-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <label className="block">Thumbnail: <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files?.[0] || null)} /></label>
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Episodes</h2>
          {episodes.length === 0 && <p className="text-gray-500">No episodes yet.</p>}
          <ul className="mb-2">
            {episodes.map((ep, i) => (
              <li key={i} className="mb-1">{ep.title} ({ep.duration})</li>
            ))}
          </ul>
          <form className="flex gap-2 flex-wrap" onSubmit={addEpisode}>
            <input className="rounded border px-2 py-1 flex-1" placeholder="Episode Title" value={epTitle} onChange={e => setEpTitle(e.target.value)} />
            <input className="rounded border px-2 py-1 w-24" placeholder="Duration" value={epDuration} onChange={e => setEpDuration(e.target.value)} />
            <input type="file" accept="video/*,audio/*" onChange={e => setEpFile(e.target.files?.[0] || null)} className="flex-1" />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
          </form>
        </div>
      </form>
    </main>
  );
}
// ...existing code...
