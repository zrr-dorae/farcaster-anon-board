import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  const { fid, walletAddress, signature, message } = await req.json();

  console.log({
    fid,
    walletAddress,
    signature,
    message,
  });

  return NextResponse.json({ success: true });
};
