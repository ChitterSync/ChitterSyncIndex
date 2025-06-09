"use client";
import React, { useState } from "react";

type Bot = { id: number; name: string; used: number; quota: number };

const initialBots: Bot[] = [
  { id: 1, name: "EchoBot", used: 5, quota: 25 },
  { id: 2, name: "JokeBot", used: 12, quota: 25 },
];

export default function BotStorage() {
  const [bots, setBots] = useState<Bot[]>(initialBots);

  function deleteBot(id: number) {
    setBots(bots.filter(b => b.id !== id));
  }
  function upgradeBot(id: number) {
    setBots(bots.map(b => b.id === id ? { ...b, quota: b.quota + 25 } : b));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Bot Storage</h1>
      <div className="w-full max-w-md flex flex-col gap-4">
        {bots.length === 0 && <p className="text-gray-500">No bots yet.</p>}
        {bots.map(bot => (
          <div key={bot.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-bold">{bot.name}</div>
              <div className="text-xs text-gray-500">{bot.used}MB / {bot.quota}MB</div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded" style={{ width: `${Math.min(bot.used / bot.quota * 100, 100)}%` }} />
              </div>
            </div>
            <button className="text-red-500" onClick={() => deleteBot(bot.id)}>Delete</button>
            <button className="text-green-600" onClick={() => upgradeBot(bot.id)}>Upgrade</button>
          </div>
        ))}
      </div>
    </main>
  );
}
