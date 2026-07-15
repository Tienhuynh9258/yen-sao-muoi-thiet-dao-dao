import { verifyAdminSession } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/db'

export async function POST(request: Request) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return Response.json({ error: 'File must be an image' }, { status: 400 })
    }

    const admin = getSupabaseAdmin()
    if (!admin) {
      return Response.json({ error: 'Database not configured' }, { status: 500 })
    }

    const ext = file.name.split('.').pop() || 'png'
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
    const bucket = 'product-images'
    const path = `${safeName}`

    const buffer = await file.arrayBuffer()

    const { data: uploadData, error: uploadError } = await admin.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return Response.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicUrlData } = admin.storage.from(bucket).getPublicUrl(uploadData.path)

    return Response.json({ publicUrl: publicUrlData.publicUrl })
  } catch {
    return Response.json({ error: 'Invalid upload request' }, { status: 400 })
  }
}
