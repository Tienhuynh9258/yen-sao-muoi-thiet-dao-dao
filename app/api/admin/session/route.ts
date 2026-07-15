import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const isAdmin = await verifyAdminSession()
  return Response.json({ authenticated: isAdmin })
}
