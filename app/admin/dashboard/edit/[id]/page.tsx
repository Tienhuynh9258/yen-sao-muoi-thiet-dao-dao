'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageUploader } from '@/components/admin/ImageUploader'

type FormShape = {
  name: string
  category: string
  price: string
  description: string
  rating: string
  reviews: string
  specs: string
}

const INITIAL: FormShape = {
  name: '',
  category: 'Premium',
  price: '',
  description: '',
  rating: '',
  reviews: '',
  specs: '',
}

interface EditProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProps) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [form, setForm] = useState<FormShape>(INITIAL)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const initialImagesRef = useRef<string[]>([])
  const sessionImagesRef = useRef<string[]>([])

  useEffect(() => {
    params.then(({ id }) => {
      setId(id)
      fetch(`/api/admin/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized')
          return res.json()
        })
        .then((json) => {
          const p = json.product
          setForm({
            name: p.name ?? '',
            category: p.category ?? 'Premium',
            price: String(p.price ?? ''),
            description: p.description ?? '',
            rating: String(p.rating ?? ''),
            reviews: String(p.reviews ?? ''),
            specs: (p.specs ?? []).join('\n'),
          })
          const existingImages = Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : p.image
            ? [p.image]
            : []
          setImages(existingImages)
          initialImagesRef.current = [...existingImages]
          sessionImagesRef.current = []
        })
        .catch(() => router.push('/admin/'))
        .finally(() => setLoading(false))
    })
  }, [params, router])

  const update = (key: keyof FormShape, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const deleteFromBucket = useCallback(async (urls: string[]) => {
    for (const url of urls) {
      try {
        await fetch('/api/admin/upload/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })
      } catch {
        /* orphan possible, ignore */
      }
    }
  }, [])

  const handleCancel = async () => {
    // Only session-new images are orphans (not yet saved to DB).
    await deleteFromBucket(sessionImagesRef.current)
    router.push('/admin/dashboard/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setError('')
    setSaving(true)

    if (images.length === 0) {
      setError('Vui lòng tải lên ít nhất một ảnh sản phẩm')
      setSaving(false)
      return
    }

    const body = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      image: images[0],
      images: images,
      description: form.description,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      specs: form.specs
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        // Save succeeded → any initial image no longer in the current list is a bucket orphan.
        const removedInitial = initialImagesRef.current.filter(
          (u) => !images.includes(u)
        )
        await deleteFromBucket(removedInitial)
        router.push('/admin/dashboard/')
      } else {
        const data = await res.json()
        setError(data.error || 'Cập nhật thất bại')
      }
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !confirm('Bạn có chắc muốn xóa sản phẩm này?')) return
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.push('/admin/dashboard/')
      } else {
        alert('Xóa thất bại')
      }
    } catch {
      alert('Lỗi kết nối')
    }
  }

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#fdf8f3' }}
      >
        <p className="font-sans" style={{ color: '#8a6a40' }}>
          Đang tải...
        </p>
      </div>
    )

  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: '#e8d5b0' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="font-sans text-xl font-bold"
            style={{ color: '#8b1a1a' }}
          >
            Chỉnh Sửa Sản Phẩm
          </h1>
          <button
            onClick={handleDelete}
            className="font-sans font-semibold text-sm hover:underline"
            style={{ color: '#8b1a1a' }}
          >
            Xóa Sản Phẩm
          </button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm font-sans"
            style={{ backgroundColor: '#fef2f2', color: '#8b1a1a' }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: '#ffffff', borderColor: '#e8d5b0' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Tên sản phẩm
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                  style={{
                    borderColor: '#e8d5b0',
                    backgroundColor: '#fdf8f3',
                    color: '#1a0a00',
                  }}
                />
              </div>
              <div>
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Danh mục
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                  style={{
                    borderColor: '#e8d5b0',
                    backgroundColor: '#fdf8f3',
                    color: '#1a0a00',
                  }}
                >
                  <option>Premium</option>
                  <option>Luxury</option>
                  <option>Standard</option>
                </select>
              </div>
              <div>
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Giá (VND)
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                  style={{
                    borderColor: '#e8d5b0',
                    backgroundColor: '#fdf8f3',
                    color: '#1a0a00',
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Hình ảnh sản phẩm
                </label>
                <ImageUploader
                  value={images}
                  onChange={setImages}
                  onUpload={(url) => { sessionImagesRef.current.push(url) }}
                />
              </div>

              <div>
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Đánh giá
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) => update('rating', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                  style={{
                    borderColor: '#e8d5b0',
                    backgroundColor: '#fdf8f3',
                    color: '#1a0a00',
                  }}
                />
              </div>
              <div>
                <label
                  className="font-sans font-semibold text-sm block mb-1.5"
                  style={{ color: '#1a0a00' }}
                >
                  Số lượt đánh giá
                </label>
                <input
                  type="number"
                  value={form.reviews}
                  onChange={(e) => update('reviews', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                  style={{
                    borderColor: '#e8d5b0',
                    backgroundColor: '#fdf8f3',
                    color: '#1a0a00',
                  }}
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                className="font-sans font-semibold text-sm block mb-1.5"
                style={{ color: '#1a0a00' }}
              >
                Mô tả
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                required
                rows={3}
                className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                style={{
                  borderColor: '#e8d5b0',
                  backgroundColor: '#fdf8f3',
                  color: '#1a0a00',
                }}
              />
            </div>
            <div className="mt-5">
              <label
                className="font-sans font-semibold text-sm block mb-1.5"
                style={{ color: '#1a0a00' }}
              >
                Thông số (mỗi dòng một thông số)
              </label>
              <textarea
                value={form.specs}
                onChange={(e) => update('specs', e.target.value)}
                rows={4}
                className="w-full border rounded-lg px-4 py-2.5 font-sans text-sm"
                style={{
                  borderColor: '#e8d5b0',
                  backgroundColor: '#fdf8f3',
                  color: '#1a0a00',
                }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg font-sans font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#8b1a1a' }}
            >
              {saving ? 'Đang lưu...' : 'Cập Nhật'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-lg font-sans font-semibold border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#e8d5b0', color: '#1a0a00' }}
            >
              Hủy
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
