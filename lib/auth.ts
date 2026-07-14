import { cookies } from 'next/headers'
import { randomBytes, createHash } from 'crypto'

const SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET!

function signCookie(payload: string) {
  return createHash('sha256').update(SESSION_SECRET + payload).digest('base64url')
}

export function verifyToken(token: string): boolean {
  const [value, sig] = token.split('.')
  if (!value || !sig) return false
  const expectedSig = signCookie(value)
  return sig === expectedSig
}

export async function createAdminSession() {
  const value = randomBytes(32).toString('hex')
  const sig = signCookie(value)
  const token = `${value}.${sig}`

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'strict',
  })
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
  })
}
