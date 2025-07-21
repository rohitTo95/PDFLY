// supabase/functions/verify-token/index.ts

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { verify } from "https://deno.land/x/djwt@v2.9/mod.ts";

const jwtSecret = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(Deno.env.get("JWT_SECRET")!),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["verify"]
);

serve(async (req: Request): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "Token missing" }), {
        status: 400,
        headers,
      });
    }

    const payload = await verify(token, jwtSecret);

    return new Response(JSON.stringify({ valid: true, payload }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Token verification failed:", err.message || err);
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
      headers,
    });
  }
});
