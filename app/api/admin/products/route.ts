import { verifyAdminSession } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = getSupabaseAdmin()
  if (!admin) {
    return Response.json({ error: 'Database not configured' }, { status: 500 })
  }

  const { data, error } = await admin
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
    const admin = getSupabaseAdmin()
    if (!admin) {
      return Response.json({ error: 'Database not configured' }, { status: 500 })
    }
    const { data, error } = await admin.from('products').insert([body]).select()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    revalidatePath('/')
    revalidatePath('/product/')
    revalidatePath('/cart')

    return Response.json({ product: data?.[0] })
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
