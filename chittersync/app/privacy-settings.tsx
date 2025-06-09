"use client";
import React, { useState } from "react";

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    hideFromSearch: false,
    disableDMs: false,
    disableTracking: false,
  });

  function toggle(key: keyof typeof settings) {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Privacy Settings</h1>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.hideFromSearch} onChange={() => toggle("hideFromSearch")}/>
          Hide from search
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.disableDMs} onChange={() => toggle("disableDMs")}/>
          Disable DMs
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.disableTracking} onChange={() => toggle("disableTracking")}/>
          Disable tracking
        </label>
      </div>
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Live Preview</h2>
        <div className="mb-2">{settings.hideFromSearch ? <span className="text-red-500">You are hidden from search results.</span> : <span className="text-green-600">Visible in search results.</span>}</div>
        <div className="mb-2">{settings.disableDMs ? <span className="text-red-500">Direct messages are disabled.</span> : <span className="text-green-600">Direct messages enabled.</span>}</div>
        <div>{settings.disableTracking ? <span className="text-red-500">Tracking is disabled.</span> : <span className="text-green-600">Tracking enabled.</span>}</div>
      </div>
    </main>
  );
}
