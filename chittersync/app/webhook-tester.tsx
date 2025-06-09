"use client";
import React, { useState } from "react";

const mockPayload = {
  event: "post_created",
  data: { id: 123, user: "Alex", content: "Hello world!" }
};

export default function WebhookTester() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendWebhook(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate fetch
      await new Promise(res => setTimeout(res, 800));
      setResult("Success! (Simulated)");
    } catch {
      setResult("Failed to send webhook.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Webhook Tester</h1>
      <form className="w-full max-w-md flex flex-col gap-3 mb-6" onSubmit={sendWebhook}>
        <input className="rounded border px-3 py-2" placeholder="Webhook URL" value={url} onChange={e => setUrl(e.target.value)} />
        <textarea className="rounded border px-3 py-2" value={JSON.stringify(mockPayload, null, 2)} readOnly rows={4} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Sending..." : "Send Webhook"}</button>
      </form>
      {result && <div className="mt-2 px-4 py-2 rounded bg-blue-100 text-blue-800">{result}</div>}
    </main>
  );
}
