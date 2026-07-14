import { getSupabaseAdmin } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Params) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const admin = getSupabaseAdmin()
  if (!admin) {
    return Response.json({ error: 'Database not configured' }, { status: 500 })
  }
  const { data, error } = await admin
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ product: data })
}

export async function PUT(request: NextRequest, { params }: Params) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const admin = getSupabaseAdmin()
    if (!admin) {
      return Response.json({ error: 'Database not configured' }, { status: 500 })
    }
    const { data, error } = await admin
      .from('products')
      .update(body)
      .eq('id', id)
      .select()

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

export async function DELETE(request: NextRequest, { params }: Params) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const admin = getSupabaseAdmin()
  if (!admin) {
    return Response.json({ error: 'Database not configured' }, { status: 500 })
  }
  const { error } = await admin.from('products').delete().eq('id', id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/')
  revalidatePath('/product/')

  return Response.json({ success: true })
}
