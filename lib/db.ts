import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | undefined
export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — returning null client')
    return null
  }
  _supabase = createClient(url, key)
  return _supabase
}

let _supabaseAdmin: SupabaseClient | undefined
export function getSupabaseAdmin(): SupabaseClient | null {
  if (_supabaseAdmin) return _supabaseAdmin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not set — returning null admin client')
    return null
  }
  _supabaseAdmin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _supabaseAdmin
}
