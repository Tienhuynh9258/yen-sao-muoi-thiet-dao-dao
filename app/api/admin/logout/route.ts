import { destroyAdminSession } from '@/lib/auth'

export async function POST() {
  await destroyAdminSession()
  return Response.json({ success: true })
}
