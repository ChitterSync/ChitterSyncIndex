"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ChitterHaven() {
  // Demo chat state
  const [messages, setMessages] = useState([
    { sender: "CallMeSirEntertainment", text: "Hey!" },
    { sender: "SMg", text: "Yo! Check this Out! rr.chittersync.com"},
    { sender: "PlagueDr", text: "wow." },
    { sender: "Landawg", text: "Thanks! Try sending a message below." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
    // Optionally, fake a bot reply
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "Alex", text: "Nice! This is how ChitterHaven works." }]);
    }, 800);
  }

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">ChitterHaven</h1>
      <p className="mb-4 text-center max-w-xl">A platform that makes communication easier—a Discord replica for seamless group and direct messaging, communities, and more.</p>
      <section className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-4 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Live Chat Demo</h2>
        <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex flex-col gap-2 mb-3 border border-gray-100 dark:border-gray-800">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              {msg.sender !== "You" && (
                <span className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold mr-2 select-none">A</span>
              )}
              <span className={`px-3 py-2 rounded-2xl text-sm shadow ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"}`}>
                {msg.text}
              </span>
              {msg.sender === "You" && (
                <span className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white font-bold ml-2 select-none">Y</span>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="flex gap-2" onSubmit={handleSend} autoComplete="off">
          <input
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label="Type a message"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </section>
      <section className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-4 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">What are Havens?</h2>
        <p className="mb-2">
          <strong>Havens</strong> are the ChitterHaven equivalent of Discord Servers. Users can create their own Havens, join others, and participate in communities built around shared interests, projects, or social groups.
        </p>
        <ul className="list-disc pl-6 mb-2">
          <li>Each user can own or join a specified number of Havens (limits depend on your plan—see the Pricing page).</li>
          <li>Havens can be public or private, with customizable permissions and roles.</li>
          <li>Organize channels, manage members, and set up moderation tools for your community.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">Create your own space or join others to chat, share, and collaborate!</p>
      </section>
      {/* Add interactive/animated demo here in the future */}
    </main>
  );
}
