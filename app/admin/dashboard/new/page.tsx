'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const INITIAL = {
  name: '',
  category: 'Premium',
  price: '',
  image: '',
  description: '',
  rating: '',
  reviews: '',
  specs: '',
}

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState(INITIAL)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const body = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      image: form.image,
      description: form.description,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      specs: form.specs.split('\n').map((s) => s.trim()).filter(Boolean),
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        router.push('/admin/dashboard/')
      } else {
        const data = await res.json()
        setError(data.error || 'Tạo sản phẩm thất bại')
      }
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: '#e8d5b0' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-sans text-xl font-bold" style={{ color: '#8b1a1a' }}>
            Thêm Sản Phẩm Mới
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg text-sm font-sans" style={{ backgroundColor: '#fef2f2', color: '#8b1a1a' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
          <div className="p-6 rounded-xl border" style={{ borderColor: '#e8d5b0' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Tên sản phẩm</label>
                <input value={form.name} onChange={(e) => update('name', e.target.value)} required className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
              </div>
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Danh mục</label>
                <select value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }}>
                  <option>Premium</option>
                  <option>Luxury</option>
                  <option>Standard</option>
                </select>
              </div>
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Giá (VND)</label>
                <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} required className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
              </div>
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Hình ảnh (đường dẫn)</label>
                <input value={form.image} onChange={(e) => update('image', e.target.value)} required placeholder="e.g. /products/yen-moi.png" className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
              </div>
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Đánh giá</label>
                <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update('rating', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
              </div>
              <div>
                <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Số lượt đánh giá</label>
                <input type="number" value={form.reviews} onChange={(e) => update('reviews', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
              </div>
            </div>

            <div className="mt-5">
              <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Mô tả</label>
              <textarea value={form.description} onChange={(e) => update('description', e.target.value)} required rows={3} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
            </div>

            <div className="mt-5">
              <label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Thông số (mỗi dòng một thông số)</label>
              <textarea value={form.specs} onChange={(e) => update('specs', e.target.value)} rows={4} placeholder={`100% Nguyên chất\nLoại A\nKhối lượng: 100g`} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg font-sans font-bold text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: '#8b1a1a' }}>
              {saving ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
            </button>
            <button type="button" onClick={() => router.push('/admin/dashboard/')} className="px-6 py-2.5 rounded-lg font-sans font-semibold border transition-colors hover:bg-gray-50" style={{ borderColor: '#e8d5b0', color: '#1a0a00' }}>
              Hủy
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
