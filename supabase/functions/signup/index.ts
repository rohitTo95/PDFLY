import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

interface SuccessResponse {
  message: string;
  user_id: string;
}

// Input validation and sanitization functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

function validateUsername(username: string): boolean {
  // 3-30 characters, alphanumeric, spaces, and underscores only
  const usernameRegex = /^[a-zA-Z0-9_ ]{3,30}$/;
  return usernameRegex.test(username);
}

function sanitizeString(str: string): string {
  // Remove potential XSS characters and trim whitespace
  return str.trim().replace(/[<>\"']/g, '');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Check if required environment variables exist
    const supabaseUrl = Deno.env.get('_SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('_SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error',
          details: 'Missing required environment variables'
        } as ErrorResponse),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Supabase client with service key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    let body: SignupRequest;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON in request body' 
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract and check required fields
    const { email, password, username } = body;

    if (!email || !password || !username) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: 'email, password, and username are required'
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeString(email.toLowerCase());
    const sanitizedUsername = sanitizeString(username);

    // Validate inputs
    if (!validateEmail(sanitizedEmail)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email format' 
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!validatePassword(password)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid password',
          details: 'Password must be at least 6 characters long'
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!validateUsername(sanitizedUsername)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid username',
          details: 'Username must be 3-30 characters long and contain only letters, numbers, spaces, and underscores'
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create the user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: sanitizedEmail,
      password: password,
      email_confirm: true, // Auto-confirm email for admin creation
    });

    if (authError) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create user account',
          details: authError.message
        } as ErrorResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!authData.user) {
      return new Response(
        JSON.stringify({ 
          error: 'User creation failed - no user data returned' 
        } as ErrorResponse),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create the profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: sanitizedEmail,
        username: sanitizedUsername,
      });

    if (profileError) {
      // If profile creation fails, clean up the auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create user profile',
          details: profileError.message
        } as ErrorResponse),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({ 
        message: 'User created successfully',
        user_id: authData.user.id
      } as SuccessResponse),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      } as ErrorResponse),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
})