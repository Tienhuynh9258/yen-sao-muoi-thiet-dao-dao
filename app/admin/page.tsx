'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard/')
      } else {
        const data = await res.json()
        setError(data.error || 'Đăng nhập thất bại')
      }
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#fdf8f3' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl shadow-lg p-8 border"
        style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}
      >
        <h1
          className="font-sans text-2xl font-bold text-center mb-8"
          style={{ color: '#8b1a1a' }}
        >
          Quản Trị Viên
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-sans" style={{ backgroundColor: '#fef2f2', color: '#8b1a1a' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none"
              style={{ borderColor: '#e8d5b0', color: '#1a0a00', backgroundColor: '#fdf8f3' }}
            />
          </div>
          <div>
            <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none"
              style={{ borderColor: '#e8d5b0', color: '#1a0a00', backgroundColor: '#fdf8f3' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-sans font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#8b1a1a' }}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
