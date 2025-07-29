// supabase/functions/signup/index.ts
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Load and validate env vars
const SUPABASE_URL = Deno.env.get("_SUPABASE_URL");
const SUPABASE_SERVICE_KEY = Deno.env.get("_SUPABASE_SERVICE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const commonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: commonHeaders }
      );
    }

    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return new Response(
        JSON.stringify({ error: "Email, password, and username are required" }),
        { status: 400, headers: commonHeaders }
      );
    }

    // Attempt to sign up
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("SignUp error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: commonHeaders }
      );
    }

    const user = data.user;
    if (!user) {
      console.error("No user returned after signup:", data);
      return new Response(
        JSON.stringify({ error: "Signup failed: No user returned." }),
        { status: 400, headers: commonHeaders }
      );
    }

    // ✅ Auth successful — skip DB insert for now
    // const { error: profileError } = await supabase.from("profiles").insert([
    //   {
    //     id: user.id,
    //     email: user.email,
    //     username: username,
    //   },
    // ]);

    return new Response(
      JSON.stringify({
        message: "Signup successful — Auth only",
        user,
      }),
      { status: 200, headers: commonHeaders }
    );

  } catch (err) {
    console.error("Unexpected error during signup:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: commonHeaders }
    );
  }
});