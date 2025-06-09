"use client";
import React, { useState } from "react";

const adTypes = ["Pre-roll", "Mid-roll", "Post-roll"];

export default function GiaAdControlPanel() {
  const [type, setType] = useState("Pre-roll");
  const [frequency, setFrequency] = useState(5);
  const [skippable, setSkippable] = useState(true);
  const [previewTime, setPreviewTime] = useState(0);

  function handlePreview() {
    setPreviewTime(0);
    const interval = setInterval(() => setPreviewTime(t => {
      if (t >= 30) { clearInterval(interval); return t; }
      return t + 1;
    }), 100);
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Ad Control Panel</h1>
      <form className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-3 mb-6">
        <label>Ad Type:
          <select className="ml-2 border rounded px-2 py-1" value={type} onChange={e => setType(e.target.value)}>
            {adTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>Frequency (minutes):
          <input type="number" className="ml-2 border rounded px-2 py-1 w-20" min={1} max={60} value={frequency} onChange={e => setFrequency(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={skippable} onChange={e => setSkippable(e.target.checked)} /> Skippable
        </label>
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePreview}>Preview Ad Breaks</button>
      </form>
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Preview Player</h2>
        <div className="relative h-24 bg-black rounded flex items-center justify-center text-white">
          <span>Show Playing... {previewTime}s</span>
          {previewTime > 0 && previewTime % frequency === 0 && previewTime < 30 && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-700/80 text-lg font-bold">{type} Ad {skippable ? "(Skippable)" : "(Unskippable)"}</div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-2">Ad breaks every {frequency} min. (simulated every {frequency} sec in preview)</div>
      </div>
    </main>
  );
}
