"use client";
import React, { useState } from "react";

type Cloud = "Google Drive" | "OneDrive";
const mockFiles = ["Resume.pdf", "Photo.jpg", "Notes.txt"];

export default function VelosyncCloudSync() {
  const [enabled, setEnabled] = useState<{ [K in Cloud]: boolean }>({ "Google Drive": false, "OneDrive": false });
  const [files, setFiles] = useState<{ [K in Cloud]: string[] }>({ "Google Drive": [], "OneDrive": [] });

  function toggle(cloud: Cloud) {
    setEnabled(e => ({ ...e, [cloud]: !e[cloud] }));
    if (!enabled[cloud]) setFiles(f => ({ ...f, [cloud]: mockFiles }));
    else setFiles(f => ({ ...f, [cloud]: [] }));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Third-Party Cloud Sync</h1>
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-4">
        {(["Google Drive", "OneDrive"] as Cloud[]).map((cloud) => (
                  <div key={cloud} className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={enabled[cloud]} onChange={() => toggle(cloud)} />
                      <span className="font-semibold">{cloud}</span>
                    </label>
                    <div className="flex-1">
                      {enabled[cloud] ? (
                        <ul className="ml-4 list-disc text-sm">
                          {files[cloud].map(f => <li key={f}>{f}</li>)}
                        </ul>
                      ) : <span className="text-gray-400 text-xs">Not synced</span>}
                    </div>
                  </div>
                ))}
      </div>
    </main>
  );
}
