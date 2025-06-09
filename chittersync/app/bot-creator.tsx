"use client";
import React, { useState } from "react";

type Bot = { name: string; avatar: string; prefix: string; behavior: string };

const cannedBehaviors = [
  { label: "Respond to hello", value: "hello" },
  { label: "Echo message", value: "echo" },
  { label: "Random joke", value: "joke" },
];

export default function BotCreator() {
  const [bot, setBot] = useState<Bot>({ name: "", avatar: "", prefix: "!", behavior: "hello" });
  const [preview, setPreview] = useState<string[]>([]);

  function handlePreview() {
    let response = "";
    if (bot.behavior === "hello") response = `${bot.prefix}hello → Hi there!`;
    else if (bot.behavior === "echo") response = `${bot.prefix}test → test`;
    else if (bot.behavior === "joke") response = `${bot.prefix}joke → Why did the bot cross the road? To get to the other API!`;
    setPreview([response]);
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Bot Creator</h1>
      <form className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col gap-3 mb-6">
        <input className="rounded border px-3 py-2" placeholder="Bot Name" value={bot.name} onChange={e => setBot(b => ({ ...b, name: e.target.value }))} />
        <input className="rounded border px-3 py-2" placeholder="Avatar URL" value={bot.avatar} onChange={e => setBot(b => ({ ...b, avatar: e.target.value }))} />
        <input className="rounded border px-3 py-2 w-24" placeholder="Prefix" value={bot.prefix} onChange={e => setBot(b => ({ ...b, prefix: e.target.value }))} />
        <label>Behavior:
          <select className="ml-2 border rounded px-2 py-1" value={bot.behavior} onChange={e => setBot(b => ({ ...b, behavior: e.target.value }))}>
            {cannedBehaviors.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </label>
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePreview}>Preview</button>
      </form>
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Chat Preview</h2>
        <div className="flex items-center gap-2 mb-2">
          {bot.avatar && <img src={bot.avatar} alt="Bot Avatar" className="w-8 h-8 rounded-full" />}
          <span className="font-bold">{bot.name || "Bot"}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded p-2 min-h-[40px]">{preview.length === 0 ? <span className="text-gray-400">No preview yet.</span> : preview.map((msg, i) => <div key={i}>{msg}</div>)}</div>
      </div>
    </main>
  );
}
