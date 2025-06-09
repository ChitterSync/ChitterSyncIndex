"use client";
import React, { useState } from "react";

// Mock data for posts
const initialPosts = [
  {
    id: 1,
    user: {
      name: "Alex",
      avatar: "https://ui-avatars.com/api/?name=Alex&background=0D8ABC&color=fff"
    },
    text: "Excited to join ChitterSync! 🚀",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    timestamp: "2m ago",
    likes: 2,
    comments: [
      { user: "Sam", text: "Welcome!" }
    ],
    liked: false
  },
  {
    id: 2,
    user: {
      name: "Jamie",
      avatar: "https://ui-avatars.com/api/?name=Jamie&background=FFB300&color=fff"
    },
    text: "Check out my new project!",
    image: "",
    timestamp: "10m ago",
    likes: 1,
    comments: [],
    liked: false
  }
];

function CommentModal({ post, onClose, onAddComment }: any) {
  const [comment, setComment] = useState("");
  if (!post) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <div className="mb-4 max-h-40 overflow-y-auto">
          {post.comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
          {post.comments.map((c: any, i: number) => (
            <div key={i} className="mb-2"><b>{c.user}:</b> {c.text}</div>
          ))}
        </div>
        <form onSubmit={e => { e.preventDefault(); if (comment.trim()) { onAddComment(comment); setComment(""); }}} className="flex gap-2">
          <input className="flex-1 border rounded px-2 py-1 dark:bg-gray-800" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Post</button>
        </form>
      </div>
    </div>
  );
}

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [modalPost, setModalPost] = useState<any>(null);

  function handleLike(postId: number) {
    setPosts(posts => posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  }
  function handleAddComment(postId: number, text: string) {
    setPosts(posts => posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, { user: "You", text }] } : p));
  }

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">ChitterSync Social Feed</h1>
      <div className="w-full max-w-lg flex flex-col gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="font-semibold">{post.user.name}</div>
                <div className="text-xs text-gray-500">{post.timestamp}</div>
              </div>
            </div>
            <div className="mb-2 text-gray-900 dark:text-gray-100">{post.text}</div>
            {post.image && <img src={post.image} alt="Post media" className="rounded-lg mb-2 max-h-60 object-cover" />}
            <div className="flex gap-4 text-sm mt-2">
              <button className={`flex items-center gap-1 ${post.liked ? "text-blue-600" : "text-gray-500"}`} onClick={() => handleLike(post.id)} aria-label="Like">
                <span>👍</span> {post.likes}
              </button>
              <button className="flex items-center gap-1 text-gray-500" onClick={() => setModalPost(post)} aria-label="Comment">
                <span>💬</span> {post.comments.length}
              </button>
              <button className="flex items-center gap-1 text-gray-500" aria-label="Share">
                <span>🔗</span> Share
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalPost && (
        <CommentModal
          post={modalPost}
          onClose={() => setModalPost(null)}
          onAddComment={(text: string) => { handleAddComment(modalPost.id, text); }}
        />
      )}
    </main>
  );
}
