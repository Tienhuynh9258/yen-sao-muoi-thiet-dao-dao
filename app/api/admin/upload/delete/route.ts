import { verifyAdminSession } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/db'

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { url } = await request.json()
    if (!url || typeof url !== 'string') {
      return Response.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const bucket = 'product-images'
    const publicUrlBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/`

    if (!url.startsWith(publicUrlBase)) {
      // Not our bucket; just report success since it's not our responsibility
      return Response.json({ success: true })
    }

    const path = url.replace(publicUrlBase, '')

    const admin = getSupabaseAdmin()
    if (!admin) {
      return Response.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { error } = await admin.storage.from(bucket).remove([path])
    if (error) {
      console.error('Storage delete error:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
}
