'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Helper function to generate a simple unique ID
const generateBoardId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
};

export default function Home() {
  const [boardId, setBoardId] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    let currentBoardId = localStorage.getItem("myBoardId");
    if (!currentBoardId) {
      currentBoardId = generateBoardId();
      localStorage.setItem("myBoardId", currentBoardId);
    }
    setBoardId(currentBoardId);
    // Assuming the app is hosted at the root, otherwise adjust the base URL.
    // For production, you'd use window.location.origin or your actual domain.
    setShareableLink(`${window.location.origin}/board/${currentBoardId}`);
  }, []);

  const goToBoard = () => {
    if (boardId) {
      router.push(`/board/${boardId}`);
    }
  };

  if (!boardId) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
        <p>Loading your board...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Your Anonymous Board Link</h1>
      
      <p className="mb-2">Share this link with others to let them post on your board:</p>
      <input 
        type="text" 
        value={shareableLink} 
        readOnly 
        className="w-full max-w-md p-2 border rounded mb-4 bg-gray-800 text-white text-center select-all"
        onClick={(e) => (e.target as HTMLInputElement).select()} // Select text on click
      />
      
      <p className="mb-4 text-sm text-gray-400">
        (Your unique board ID is: {boardId})
      </p>
      
      <button
        onClick={goToBoard}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to My Board
      </button>
    </main>
  );
}