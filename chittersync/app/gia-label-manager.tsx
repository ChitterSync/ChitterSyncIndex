// ...existing code from gia-label-manager/page.tsx...
"use client";
import React, { useState } from "react";

type Label = { id: number; name: string; banner: string; description: string; shows: string[] };

const initialLabels: Label[] = [
  { id: 1, name: "Action", banner: "https://picsum.photos/seed/action/200/40", description: "Action-packed shows.", shows: ["Show A"] },
  { id: 2, name: "Comedy", banner: "https://picsum.photos/seed/comedy/200/40", description: "Laughs and fun.", shows: ["Show B"] },
];

export default function GiaLabelManager() {
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [name, setName] = useState("");
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState("");

  function addLabel(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setLabels([...labels, { id: Date.now(), name, banner, description, shows: show ? [show] : [] }]);
    setName(""); setBanner(""); setDescription(""); setShow("");
  }
  function deleteLabel(id: number) {
    setLabels(labels.filter(l => l.id !== id));
  }
  function addShowToLabel(id: number, show: string) {
    setLabels(labels.map(l => l.id === id ? { ...l, shows: [...l.shows, show] } : l));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Gia Label Manager</h1>
      <form className="w-full max-w-lg flex flex-col gap-2 mb-6" onSubmit={addLabel}>
        <input className="rounded border px-3 py-2" placeholder="Label Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Banner URL" value={banner} onChange={e => setBanner(e.target.value)} />
        <textarea className="rounded border px-3 py-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Assign Show (optional)" value={show} onChange={e => setShow(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Label</button>
      </form>
      <div className="w-full max-w-lg flex flex-col gap-4">
        {labels.map(label => (
          <div key={label.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <img src={label.banner} alt={label.name} className="w-32 h-10 object-cover rounded" />
              <div className="font-bold text-lg">{label.name}</div>
              <button className="ml-auto text-red-500" onClick={() => deleteLabel(label.id)}>Delete</button>
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-300">{label.description}</div>
            <div className="mb-2">
              <span className="font-semibold">Shows:</span> {label.shows.length === 0 ? "None" : label.shows.join(", ")}
            </div>
            <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (show) { addShowToLabel(label.id, show); setShow(""); }}}>
              <input className="rounded border px-2 py-1 flex-1" placeholder="Add Show" value={show} onChange={e => setShow(e.target.value)} />
              <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Assign</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
// ...existing code...
