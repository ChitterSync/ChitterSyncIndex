"use client";
import React, { useState } from "react";

const tiers = [
  { name: "Basic", price: "$0/mo", features: ["1 Haven", "5 Friends", "1GB Storage"], info: ["Join 1 server", "Up to 5 friends", "1GB Velosync storage"] },
  { name: "Plus", price: "$5/mo", features: ["5 Havens", "50 Friends", "10GB Storage"], info: ["Join up to 5 servers", "Up to 50 friends", "10GB Velosync storage"] },
  { name: "Pro", price: "$15/mo", features: ["20 Havens", "200 Friends", "100GB Storage"], info: ["Join up to 20 servers", "Up to 200 friends", "100GB Velosync storage"] },
  { name: "CSX", price: "$30/mo", features: ["Unlimited Havens", "Unlimited Friends", "1TB Storage"], info: ["Unlimited servers", "Unlimited friends", "1TB Velosync storage"] },
];

export default function SubscriptionTiers() {
  const [selected, setSelected] = useState("Basic");
  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Subscription Tiers</h1>
      <div className="overflow-x-auto w-full max-w-3xl">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="p-2 border-b"></th>
              {tiers.map(t => (
                <th key={t.name} className="p-2 border-b text-lg font-semibold">
                  <button
                    className={`px-4 py-2 rounded ${selected === t.name ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"}`}
                    onClick={() => setSelected(t.name)}
                    title={`Select the ${t.name} plan`}
                  >
                    {t.name}
                  </button>
                  <div className="text-xs mt-1">{t.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers[0].features.map((_, i) => (
              <tr key={i}>
                <td className="p-2 text-left font-medium border-b">{["Havens","Friends","Storage"][i]}</td>
                {tiers.map(t => (
                  <td key={t.name} className={`p-2 border-b ${selected === t.name ? "bg-blue-50 dark:bg-blue-900" : ""}`}
                    title={t.info[i]}>
                    {t.features[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <span className="inline-block px-4 py-2 rounded bg-blue-500 text-white font-semibold">Selected: {selected}</span>
      </div>
    </main>
  );
}
