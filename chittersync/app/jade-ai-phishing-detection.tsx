"use client";
import React, { useState } from "react";

const riskyWords = ["free nitro", "click here", "urgent", "password", "gift", "verify", "login", "reset"];

function getRiskScore(text: string) {
  let score = 0;
  const lower = text.toLowerCase();
  riskyWords.forEach(word => {
    if (lower.includes(word)) score += 20;
  });
  return Math.min(score, 100);
}

export default function JadeAIPhishingDetection() {
  const [input, setInput] = useState("");
  const score = getRiskScore(input);
  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Jade AI Phishing Detection Preview</h1>
      <textarea className="w-full max-w-md rounded border px-3 py-2 mb-4 dark:bg-gray-900" rows={3} placeholder="Paste a DM here..." value={input} onChange={e => setInput(e.target.value)} />
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
        <div className="text-lg font-semibold mb-2">Risk Score</div>
        <div className={`text-3xl font-bold ${score < 40 ? "text-green-600" : score < 80 ? "text-yellow-500" : "text-red-600"}`}>{score}/100</div>
        <div className="mt-2 text-sm text-gray-500">{score === 0 ? "No risky keywords detected." : score < 40 ? "Low risk." : score < 80 ? "Medium risk." : "High risk!"}</div>
      </div>
    </main>
  );
}
