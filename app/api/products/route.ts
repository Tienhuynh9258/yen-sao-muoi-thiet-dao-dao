import { getSupabase } from '@/lib/db'

export async function GET() {
  const client = getSupabase()
  if (!client) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 })
  }
  const { data, error } = await client.from('products').select('*')

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ products: data ?? [] })
}
