import { NextResponse } from "next/server";

const BASE = "https://test.api.amadeus.com";

let token: string | null = null;
let tokenExpiry = 0; // timestamp in ms

async function getToken() {
  const now = Date.now();

  // Refresh if missing or expired
  if (!token || now >= tokenExpiry) {
    const res = await fetch(`${BASE}/v1/security/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("Token error: " + err);
    }

    const data = await res.json();
    token = data.access_token;
    // expires_in is in seconds → convert to ms
    tokenExpiry = now + data.expires_in * 1000 - 5000; // refresh 5s before expiry
    console.log("Fetched new token, expires in:", data.expires_in, "seconds");
  }

  return token!;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin")!;
    const destination = searchParams.get("destination")!;
    const date = searchParams.get("date")!;

    const token = await getToken();

    const url = `${BASE}/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=50`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
