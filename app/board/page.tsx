'use client';

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { onValue, ref } from "firebase/database";

// Define a type for your message objects
interface Message {
  text: string;
  createdAt: number;
  // Add other properties of your message object here
}

export default function Board() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data received:", data);
      if (data) {
        const parsed = Object.values(data).sort((a: any, b: any) => b.createdAt - a.createdAt);
        console.log("Parsed messages:", parsed);
        setMessages(parsed as Message[]);
      } else {
        console.log("No data received from Firebase or data is null.");
        setMessages([]);
      }
    });
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-xl font-bold z-10">
        🎈 Anonymous Message Stream
      </h1>
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {messages.map((msg: any, index) => (
          <div
            key={index}
            className="absolute whitespace-nowrap text-white text-lg animate-marquee"
            style={{
              top: `${Math.random() * 90}%`,
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