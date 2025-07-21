// supabase/functions/login/index.ts
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.9/mod.ts";

const supabase = createClient(
  Deno.env.get("_SUPABASE_URL")!,
  Deno.env.get("_SUPABASE_SERVICE_KEY")!
);

// Convert JWT secret string into a CryptoKey
const jwtSecret = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(Deno.env.get("JWT_SECRET")!),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"]
);

serve(async (req: Request): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ["localhost:3000", "https://pdfly-alpha.vercel.app"],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers,
      });
    }

    const body = await req.json();
    const { email, password } = body;

    console.log('Login attempt for email:', email);

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return new Response(JSON.stringify({ error: "Invalid email format" }), {
    status: 400,
    headers,
  });
}

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Supabase auth result:', { data: !!data.user, error: error?.message });

    if (error || !data.user) {
      return new Response(JSON.stringify({ error: error?.message || "Authentication failed" }), {
        status: 401,
        headers,
      });
    }
    const user_id = data.user.id
    let { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();


    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return new Response(JSON.stringify({ error: "Failed to fetch user profile" }), {
        status: 500,
        headers,
      });
    }

    // If no profile exists, create one
    if (!profile) {
      const { data: fetchedProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      
      profile = fetchedProfile;
    }
    // JWT payload
    const payload = {
      sub: data.user.id,
      email: data.user.email,
      username: profile?.username || data.user.email,
      exp: getNumericDate(60 * 60 * 24 * 30), // 30 days
    };

    const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, jwtSecret);

    return new Response(JSON.stringify({
      token: jwt,
      profile,
      user_id: data.user.id,
      user_email: data.user.email
    }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers,
    });
  }
});
