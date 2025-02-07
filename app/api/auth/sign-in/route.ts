import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { fid, walletAddress, signature, message } = await req.json();

  console.log({
    fid,
    walletAddress,
    signature,
    message,
  });

  // Create the response
  const response = NextResponse.json({ success: true });

  // Set the auth cookie
  // Using httpOnly for security, secure for HTTPS only
  // SameSite=None allows the cookie to be sent in cross-origin requests
  // maxAge is set to 7 days (in seconds)
  response.cookies.set({
    name: "auth_token",
    value: "your_generated_token_here", // Replace with actual token generation
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return response;
};
