import { getSupabaseAdmin } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await getSupabaseAdmin()
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ products: data ?? [] })
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { data, error } = await getSupabaseAdmin().from('products').insert([body]).select()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ product: data?.[0] })
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
