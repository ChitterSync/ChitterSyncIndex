"use client";
import React, { useState } from "react";

const mockMembers = [
  { id: 1, name: "Alex", role: "Owner" },
  { id: 2, name: "Jamie", role: "Moderator" },
  { id: 3, name: "Sam", role: "Member" },
];

export default function ChitterHavenServerManager() {
  const [servers, setServers] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", privacy: "public", invite: "" });
  const [selected, setSelected] = useState<any>(null);
  const [members, setMembers] = useState(mockMembers);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setServers([...servers, { ...form, id: Date.now(), members: [mockMembers[0]] }]);
    setForm({ name: "", description: "", privacy: "public", invite: "" });
  }
  function handleJoin(invite: string) {
    if (!invite.trim()) return;
    setServers([...servers, { id: Date.now(), name: `Joined Haven (${invite})`, description: "", privacy: "public", members: [mockMembers[1], mockMembers[2]] }]);
    setForm({ ...form, invite: "" });
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">ChitterHaven Server Manager</h1>
      <div className="w-full max-w-lg flex flex-col md:flex-row gap-8 mb-8">
        <form className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 mb-4 md:mb-0" onSubmit={handleCreate}>
          <h2 className="font-semibold mb-2">Create a Haven</h2>
          <input className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800" placeholder="Server Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <textarea className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div className="mb-2">
            <label className="mr-2">Privacy:</label>
            <select value={form.privacy} onChange={e => setForm(f => ({ ...f, privacy: e.target.value }))} className="border rounded px-2 py-1 dark:bg-gray-800">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </form>
        <form className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700" onSubmit={e => { e.preventDefault(); handleJoin(form.invite); }}>
          <h2 className="font-semibold mb-2">Join a Haven</h2>
          <input className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800" placeholder="Invite Code" value={form.invite} onChange={e => setForm(f => ({ ...f, invite: e.target.value }))} />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Join</button>
        </form>
      </div>
      <div className="w-full max-w-lg">
        <h2 className="font-semibold mb-2">Your Havens</h2>
        {servers.length === 0 && <p className="text-gray-500">No servers yet.</p>}
        {servers.map(s => (
          <div key={s.id} className="bg-white dark:bg-gray-900 rounded p-3 mb-3 border border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => setSelected(s)}>
            <div className="font-bold">{s.name}</div>
            <div className="text-xs text-gray-500">{s.privacy === "public" ? "Public" : "Private"}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{s.description}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            <h3 className="text-lg font-bold mb-2">{selected.name} Members</h3>
            <ul>
              {members.map(m => (
                <li key={m.id} className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">{m.name[0]}</span>
                  <span>{m.name}</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded ${m.role === "Owner" ? "bg-purple-500 text-white" : m.role === "Moderator" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"}`}>{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
