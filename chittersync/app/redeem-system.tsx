// ...existing code from redeem-system/page.tsx...
"use client";
import React, { useState } from "react";

const validCodes = {
  GIA2025: { feature: "10GB Velosync Storage", used: false },
  HAVEN50: { feature: "50 Extra Friends", used: false },
};

export default function RedeemSystem() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    const entry = validCodes[code.trim().toUpperCase() as keyof typeof validCodes];
    if (!entry) {
      setResult({ success: false, message: "Invalid code." });
    } else if (entry.used) {
      setResult({ success: false, message: "Code already used." });
    } else {
      entry.used = true;
      setResult({ success: true, message: `Unlocked: ${entry.feature}` });
    }
    setCode("");
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Redeem System</h1>
      <form className="w-full max-w-sm flex flex-col gap-3" onSubmit={handleRedeem} autoComplete="off">
        <input
          className="rounded border px-3 py-2 dark:bg-gray-900"
          placeholder="Enter gift code (e.g. GIA2025)"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Redeem</button>
      </form>
      {result && (
        <div className={`mt-4 px-4 py-2 rounded ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{result.message}</div>
      )}
    </main>
  );
}
// ...existing code...
