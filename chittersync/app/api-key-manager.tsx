"use client";
import React, { useState } from "react";

type Key = { id: number; value: string; scope: string; usage: number };

export default function ApiKeyManager() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [scope, setScope] = useState("read");

  function generateKey() {
    const value = Math.random().toString(36).slice(2, 18).toUpperCase();
    setKeys([...keys, { id: Date.now(), value, scope, usage: 0 }]);
  }
  function revokeKey(id: number) {
    setKeys(keys.filter(k => k.id !== id));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">API Key Manager</h1>
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
        <label className="mr-2">Scope:</label>
        <select className="border rounded px-2 py-1 mr-4" value={scope} onChange={e => setScope(e.target.value)}>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="read/write">Read/Write</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateKey}>Generate Key</button>
      </div>
      <table className="w-full max-w-lg border-collapse text-center">
        <thead>
          <tr>
            <th className="p-2 border-b">Key</th>
            <th className="p-2 border-b">Scope</th>
            <th className="p-2 border-b">Usage</th>
            <th className="p-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {keys.length === 0 && <tr><td colSpan={4} className="text-gray-500">No keys yet.</td></tr>}
          {keys.map(k => (
            <tr key={k.id}>
              <td className="p-2 border-b font-mono">{k.value}</td>
              <td className="p-2 border-b">{k.scope}</td>
              <td className="p-2 border-b">{k.usage}</td>
              <td className="p-2 border-b"><button className="text-red-500" onClick={() => revokeKey(k.id)}>Revoke</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
