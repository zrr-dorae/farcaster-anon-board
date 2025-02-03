"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import Link from "next/link";

export default function Home() {
  const { signIn, isLoading } = useSignIn();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-lg text-muted-foreground">Sign in to get started</p>
        <button
          onClick={signIn}
          disabled={isLoading}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>
      <Link href="/presave" className="text-lg text-muted-foreground mt-4">
        Go to Presave
      </Link>
    </div>
  );
}
