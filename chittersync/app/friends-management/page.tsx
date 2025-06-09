"use client";
import React, { useState } from "react";

const mockProfiles = [
  { id: 1, name: "Alex", status: "online" },
  { id: 2, name: "Jamie", status: "offline" },
  { id: 3, name: "Sam", status: "online" },
  { id: 4, name: "Taylor", status: "offline" },
  { id: 5, name: "Jordan", status: "online" },
];

export default function FriendsManagement() {
  const [tab, setTab] = useState("Friends");
  const [friends, setFriends] = useState([mockProfiles[0], mockProfiles[2]]);
  const [requests, setRequests] = useState([mockProfiles[1]]);
  const [blocked, setBlocked] = useState([mockProfiles[3]]);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState(mockProfiles);

  function sendRequest(profile: any) {
    setRequests([...requests, profile]);
    setAll(all.filter(p => p.id !== profile.id));
  }
  function acceptRequest(profile: any) {
    setFriends([...friends, profile]);
    setRequests(requests.filter(p => p.id !== profile.id));
  }
  function denyRequest(profile: any) {
    setRequests(requests.filter(p => p.id !== profile.id));
  }
  function blockUser(profile: any) {
    setBlocked([...blocked, profile]);
    setFriends(friends.filter(p => p.id !== profile.id));
    setRequests(requests.filter(p => p.id !== profile.id));
  }
  function unblockUser(profile: any) {
    setBlocked(blocked.filter(p => p.id !== profile.id));
  }

  const filtered = all.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Friends Management</h1>
      <div className="mb-6 w-full max-w-md flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-3 flex-1 text-center">
            <div className="text-lg font-bold">{friends.length}</div>
            <div className="text-xs text-gray-500">Friends</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-3 flex-1 text-center relative">
            <div className="text-lg font-bold">{requests.length}</div>
            <div className="text-xs text-gray-500">Requests</div>
            {requests.length > 0 && <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">New</span>}
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-3 flex-1 text-center">
            <div className="text-lg font-bold">{blocked.length}</div>
            <div className="text-xs text-gray-500">Blocked</div>
          </div>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        {["Friends", "Requests", "Blocked", "Search"].map(t => (
          <button key={t} className={`relative px-4 py-2 rounded ${tab === t ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"}`} onClick={() => setTab(t)}>
            {t}
            {t === "Requests" && requests.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{requests.length}</span>
            )}
          </button>
        ))}
      </div>
      {tab === "Friends" && (
        <div className="w-full max-w-md">
          <h2 className="font-semibold mb-2">Your Friends</h2>
          {friends.length === 0 && <p className="text-gray-500">No friends yet.</p>}
          {friends.map(f => (
            <div key={f.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded p-2 mb-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=0D8ABC&color=fff`} alt={f.name} className="w-8 h-8 rounded-full" />
                <span>{f.name} <span className={`text-xs ml-1 ${f.status === "online" ? "text-green-500" : "text-gray-400"}`}>{f.status === "online" ? "●" : "○"}</span></span>
              </div>
              <button className="text-red-500" onClick={() => blockUser(f)}>Block</button>
            </div>
          ))}
        </div>
      )}
      {tab === "Requests" && (
        <div className="w-full max-w-md">
          <h2 className="font-semibold mb-2">Friend Requests</h2>
          {requests.length === 0 && <p className="text-gray-500">No requests.</p>}
          {requests.map(r => (
            <div key={r.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded p-2 mb-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=FFB300&color=fff`} alt={r.name} className="w-8 h-8 rounded-full" />
                <span>{r.name}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-green-600" onClick={() => acceptRequest(r)}>Accept</button>
                <button className="text-gray-500" onClick={() => denyRequest(r)}>Deny</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "Blocked" && (
        <div className="w-full max-w-md">
          <h2 className="font-semibold mb-2">Blocked Users</h2>
          {blocked.length === 0 && <p className="text-gray-500">No blocked users.</p>}
          {blocked.map(b => (
            <div key={b.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded p-2 mb-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=888888&color=fff`} alt={b.name} className="w-8 h-8 rounded-full" />
                <span>{b.name}</span>
              </div>
              <button className="text-blue-500" onClick={() => unblockUser(b)}>Unblock</button>
            </div>
          ))}
        </div>
      )}
      {tab === "Search" && (
        <div className="w-full max-w-md">
          <h2 className="font-semibold mb-2">Search Profiles</h2>
          <input className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-800" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
          {filtered.length === 0 && <p className="text-gray-500">No users found.</p>}
          {filtered.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded p-2 mb-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=0D8ABC&color=fff`} alt={p.name} className="w-8 h-8 rounded-full" />
                <span>{p.name} <span className={`text-xs ml-1 ${p.status === "online" ? "text-green-500" : "text-gray-400"}`}>{p.status === "online" ? "●" : "○"}</span></span>
              </div>
              <button className="text-blue-500" onClick={() => sendRequest(p)}>Add Friend</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
