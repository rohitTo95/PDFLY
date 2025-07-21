// supabase/functions/signup/index.ts
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
    Deno.env.get("_SUPABASE_URL")!,
    Deno.env.get("_SUPABASE_SERVICE_KEY")!
);


serve(async (req: Request): Promise<Response> => {
    if (req.method === 'OPTIONS') {
    // Handle CORS preflight
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
    try {
        if (req.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), {
                status: 405,
                headers: { 
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        const { email, password, username } = await req.json();

        if (!email || !password || !username) {
            return new Response(
                JSON.stringify({ error: "Email, password, and username are required" }),
                { 
                    status: 400, 
                    headers: { 
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    } 
                }
            );
        }

        // Create the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: { 
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        const user = data.user;
        const { error: profileError } = await supabase.from("profiles").insert([
            {
                id: user.id, // user.id will be the same as auth UID
                email: user.email,
                username: username,
            },
        ]);

        if (profileError) {
            console.error("Profile insert failed:", profileError);
            return new Response(JSON.stringify({ error: "Signup succeeded but profile creation failed." }), {
                status: 500,
                headers: { 
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }

        return new Response(JSON.stringify({
            message: "Signup successful"
        }),{
            status: 200,
            headers: { 
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
});
