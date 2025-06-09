"use client";
import React, { useState } from "react";

const sources = ["Discord", "Telegram", "Facebook Group"];
const mockRoles = ["Admin", "Mod", "Member"];
const mockUsers = ["Alex", "Jamie", "Sam", "Taylor"];

export default function MigrationWizard() {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState(sources[0]);
  const [roleMap, setRoleMap] = useState<{ [k: string]: string }>({});
  const [progress, setProgress] = useState(0);
  const [imported, setImported] = useState<string[]>([]);

  function next() {
    if (step === 2) {
      setProgress(0);
      setImported([]);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setImported(mockUsers);
            return 100;
          }
          return p + 20;
        });
      }, 400);
    }
    setStep(s => s + 1);
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">CommunityForge Migration Wizard</h1>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        {step === 0 && (
          <div>
            <label className="block mb-2 font-semibold">Select Source Platform:</label>
            <select className="border rounded px-2 py-1 w-full mb-4" value={source} onChange={e => setSource(e.target.value)}>
              {sources.map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={next}>Next</button>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-2 font-semibold">Map Roles</div>
            {mockRoles.map(role => (
              <div key={role} className="mb-2 flex items-center gap-2">
                <span className="w-24">{role}</span>
                <select className="border rounded px-2 py-1 flex-1" value={roleMap[role] || ""} onChange={e => setRoleMap(m => ({ ...m, [role]: e.target.value }))}>
                  <option value="">Select target role</option>
                  {mockRoles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={next}>Next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-2 font-semibold">Importing Users...</div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-2 mb-2">
              <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-gray-500 mb-2">Progress: {progress}%</div>
            {progress === 100 && (
              <div className="mt-2">
                <div className="font-semibold mb-1">Imported Users:</div>
                <ul className="list-disc ml-6">
                  {imported.map(u => <li key={u}>{u}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
