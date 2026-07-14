'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface EditProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProps) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', category: 'Premium', price: '', image: '',
    description: '', rating: '', reviews: '', specs: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    params.then(({ id }) => {
      setId(id)
      fetch(`/api/admin/products/${id}`)
        .then((res) => { if (!res.ok) throw new Error('Unauthorized'); return res.json() })
        .then((json) => {
          const p = json.product
          setForm({
            name: p.name ?? '', category: p.category ?? 'Premium',
            price: String(p.price ?? ''), image: p.image ?? '',
            description: p.description ?? '', rating: String(p.rating ?? ''),
            reviews: String(p.reviews ?? ''), specs: (p.specs ?? []).join('\n'),
          })
        })
        .catch(() => router.push('/admin/'))
        .finally(() => setLoading(false))
    })
  }, [params, router])

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setError('')
    setSaving(true)

    const body = {
      name: form.name, category: form.category, price: Number(form.price),
      image: form.image, description: form.description,
      rating: Number(form.rating) || 0, reviews: Number(form.reviews) || 0,
      specs: form.specs.split('\n').map((s) => s.trim()).filter(Boolean),
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      if (res.ok) { router.push('/admin/dashboard/') }
      else { const data = await res.json(); setError(data.error || 'Cập nhật thất bại') }
    } catch { setError('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Bạn có chắc muốn xóa sản phẩm này?')) return
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (res.ok) { router.push('/admin/dashboard/') } else { alert('Xóa thất bại') }
    } catch { alert('Lỗi kết nối') }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdf8f3' }}>
      <p className="font-sans" style={{ color: '#8a6a40' }}>Đang tải...</p>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: '#e8d5b0' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-sans text-xl font-bold" style={{ color: '#8b1a1a' }}>Chỉnh Sửa Sản Phẩm</h1>
          <button onClick={handleDelete} className="font-sans font-semibold text-sm hover:underline" style={{ color: '#8b1a1a' }}>Xóa Sản Phẩm</button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 rounded-lg text-sm font-sans" style={{ backgroundColor: '#fef2f2', color: '#8b1a1a' }}>{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Tên sản phẩm</label>
                <input value={form.name} onChange={(e) => update('name', e.target.value)} required className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Danh mục</label>
                <select value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }}>
                  <option>Premium</option><option>Luxury</option><option>Standard</option></select></div>
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Giá (VND)</label>
                <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} required className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Hình ảnh (đường dẫn)</label>
                <input value={form.image} onChange={(e) => update('image', e.target.value)} required className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Đánh giá</label>
                <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update('rating', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
              <div><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Số lượt đánh giá</label>
                <input type="number" value={form.reviews} onChange={(e) => update('reviews', e.target.value)} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
            </div>
            <div className="mt-5"><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Mô tả</label>
              <textarea value={form.description} onChange={(e) => update('description', e.target.value)} required rows={3} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
            <div className="mt-5"><label className="font-sans font-semibold text-sm block mb-1.5" style={{ color: '#1a0a00' }}>Thông số (mỗi dòng một thông số)</label>
              <textarea value={form.specs} onChange={(e) => update('specs', e.target.value)} rows={4} className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm" style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3', color: '#1a0a00' }} /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg font-sans font-bold text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: '#8b1a1a' }}>{saving ? 'Đang lưu...' : 'Cập Nhật'}</button>
            <button type="button" onClick={() => router.push('/admin/dashboard/')} className="px-6 py-2.5 rounded-lg font-sans font-semibold border transition-colors hover:bg-gray-50" style={{ borderColor: '#e8d5b0', color: '#1a0a00' }}>Hủy</button>
          </div>
        </form>
      </main>
    </div>
  )
}
