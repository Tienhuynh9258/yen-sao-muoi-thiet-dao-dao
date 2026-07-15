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

  // Fetch product to clean up storage images before deleting row
  const { data: product, error: fetchError } = await admin
    .from('products')
    .select('image,images')
    .eq('id', id)
    .single()

  // Delete the DB row
  const { error } = await admin.from('products').delete().eq('id', id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // Best-effort remove from storage all images hosted in our Supabase bucket
  const bucket = 'product-images'
  const publicUrlBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/`
  const allImageUrls: string[] = []
  if (product?.image) allImageUrls.push(product.image)
  if (Array.isArray(product?.images)) {
    for (const url of product.images) {
      if (typeof url === 'string') allImageUrls.push(url)
    }
  }
  const uniquePaths = Array.from(
    new Set(
      allImageUrls
        .filter((u) => u.startsWith(publicUrlBase))
        .map((u) => u.replace(publicUrlBase, ''))
    )
  )
  if (uniquePaths.length > 0) {
    try {
      await admin.storage.from(bucket).remove(uniquePaths)
    } catch {
      // ignore storage cleanup failures
    }
  }

  revalidatePath('/')
  revalidatePath('/product/')

  return Response.json({ success: true })
}
