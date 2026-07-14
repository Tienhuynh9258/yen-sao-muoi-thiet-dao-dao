import { supabase } from '@/lib/db'

export async function GET() {
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ products: data ?? [] })
}
