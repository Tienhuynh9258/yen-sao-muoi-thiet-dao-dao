const SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.SESSION_SECRET!

function stringToBytes(str: string) {
  return new TextEncoder().encode(str)
}

async function signCookie(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToBytes(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, stringToBytes(payload))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function verifyToken(token: string): Promise<boolean> {
  const [value, sig] = token.split('.')
  if (!value || !sig) return false
  const expected = await signCookie(value)
  return sig === expected
}

function randomToken(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function createAdminSession() {
  if (typeof window !== 'undefined') return
  const { cookies } = await import('next/headers')
  const value = randomToken()
  const sig = await signCookie(value)
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
  if (typeof window !== 'undefined') return false
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function destroyAdminSession() {
  if (typeof window !== 'undefined') return
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
    sameSite: 'strict',
  })
}
