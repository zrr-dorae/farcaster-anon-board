'use client';

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase"; // Adjusted path for nested route
import { onValue, ref, push } from "firebase/database";
import { useParams, useRouter } from "next/navigation";

interface Message {
  text: string;
  createdAt: number;
  // id?: string; // Firebase keys are used as IDs
}

export default function BoardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const params = useParams();
  const boardId = params.boardId as string; // Or handle if boardId might be an array
  const router = useRouter();

  // Effect for fetching messages
  useEffect(() => {
    if (!boardId) return;

    const messagesRef = ref(db, `boards/${boardId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data received for board", boardId, ":", data);
      if (data) {
        const parsedMessages = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] } as Message))
          .sort((a, b) => b.createdAt - a.createdAt);
        setMessages(parsedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [boardId]);

  const handleSubmitMessage = async () => {
    if (!newMessage.trim() || !boardId) return;
    setLoadingSubmit(true);
    try {
      await push(ref(db, `boards/${boardId}/messages`), {
        text: newMessage,
        createdAt: Date.now(),
      });
      setNewMessage(""); // Clear input after successful submission
    } catch (e) {
      console.error("Failed to submit message to board", boardId, ":", e);
      alert(`Failed to submit message: ${(e instanceof Error) ? e.message : String(e)}`);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (!boardId) {
    // This case should ideally be handled by Next.js routing if boardId is missing (e.g., 404)
    // Or you can redirect or show an error message.
    return <p>Board ID is missing.</p>;
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-0 left-0 p-4 z-20">
        <button onClick={() => router.push('/')} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
          &larr; Back to Home (Get Board Link)
        </button>
      </div>
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-bold z-10">
        🎈 Board: {boardId}
      </h1>
      
      {/* Message Submission Form */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl p-4 z-20">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your anonymous message..."
            className="flex-grow p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitMessage()} // Submit on Enter
          />
          <button
            onClick={handleSubmitMessage}
            disabled={loadingSubmit || !newMessage.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500"
          >
            {loadingSubmit ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* Messages Display (Marquee) */}
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {messages.map((msg, index) => (
          <div
            key={msg.createdAt + index} // Using createdAt + index for a more stable key if IDs are not available yet
            className="absolute whitespace-nowrap text-white text-lg animate-marquee"
            style={{
              top: `${Math.random() * 80}%`, // Adjusted to avoid overlap with submit form
              left: "100%",
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            💬 {msg.text}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(calc(-100vw - 100%));
          }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </main>
  );
} 