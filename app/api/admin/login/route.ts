import { createAdminSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      await createAdminSession()
      return Response.json({ success: true })
    }

    return Response.json(
      { error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
      { status: 401 }
    )
  } catch {
    return Response.json({ error: 'Yêu cầu không hợp lệ' }, { status: 400 })
  }
}
