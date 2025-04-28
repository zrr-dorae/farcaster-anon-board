import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const farcasterConfig = {
    accountAssociation: {
        "header": "eyJmaWQiOjE3OTc5LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4MGMxNWE5QkVmRTg3RjY0N0IwMDNhMjI0MTY4NDYwMzYyODQ0M2Y4YiJ9",
        "payload": "eyJkb21haW4iOiJtb25hZC1taW5pYXBwLXRlbXBsYXRlLXNldmVuLnZlcmNlbC5hcHAifQ",
        "signature": "MHgwYzY2NDdjZDhjOWJiY2JmYzg2NGIzZjVjYWVjY2ExMTdlOTY4ZGQwMWIzMmM0NGViMjU5ZDhlOGQyMzdhZTZiMDU1MmNmNWRiMDU1MDMwNTZmNTNhZmEwZDZlZTBlZmIyMmJmNDNmMDQ4NTdhMzk2NmY0YmMzODk2N2NlZDI5ZjFi"
    },
    frame: {
      version: "1",
      name: "Monad Farcaster MiniApp Template",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: `${appUrl}`,
      imageUrl: `${appUrl}/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "template"],
      primaryCategory: "developer-tools",
      buttonTitle: "Launch Template",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${appUrl}/api/webhook`
    }
  };

  return NextResponse.json(farcasterConfig);
}
