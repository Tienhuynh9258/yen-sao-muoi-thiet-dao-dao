'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/products'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  images?: string[]
  created_at: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      if (!res.ok) throw new Error('Unauthorized')
      const json = await res.json()
      setProducts(json.products ?? [])
    } catch {
      router.push('/admin/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } else {
        alert('Xóa thất bại')
      }
    } catch {
      alert('Lỗi kết nối')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/')
  }

  return (
    <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh' }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: '#e8d5b0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-sans text-xl font-bold" style={{ color: '#8b1a1a' }}>
            Quản Lý Sản Phẩm
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-sans text-sm font-semibold hover:underline"
              style={{ color: '#c8922a' }}
            >
              Xem Website
            </Link>
            <button
              onClick={handleLogout}
              className="font-sans text-sm font-semibold hover:underline"
              style={{ color: '#8b1a1a' }}
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-sans text-lg font-bold" style={{ color: '#1a0a00' }}>
            Danh Sách Sản Phẩm ({products.length})
          </h2>
          <Link
            href="/admin/dashboard/new"
            className="inline-flex items-center px-4 py-2 rounded-lg font-sans font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#8b1a1a' }}
          >
            + Thêm Sản Phẩm
          </Link>
        </div>

        {loading ? (
          <p className="font-sans text-sm" style={{ color: '#8a6a40' }}>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#e8d5b0', backgroundColor: '#ffffff' }}>
            <table className="w-full text-sm font-sans">
              <thead>
                <tr style={{ backgroundColor: '#fdf3e3' }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a0a00' }}>Tên</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a0a00', width: '80px' }}>Ảnh</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#1a0a00' }}>Danh mục</th>
                  <th className="text-right px-4 py-3 font-semibold" style={{ color: '#1a0a00' }}>Giá</th>
                  <th className="text-right px-4 py-3 font-semibold" style={{ color: '#1a0a00' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#e8d5b0' }}
                  >
                    <td className="px-4 py-3" style={{ color: '#1a0a00' }}>{product.name}</td>
                    <td className="px-4 py-3">
                      {product.images?.[0] || product.image ? (
                        <img src={product.images?.[0] || product.image} alt={product.name} className="h-10 w-10 rounded object-cover border" style={{ borderColor: '#e8d5b0' }} />
                      ) : (
                        <span className="text-xs" style={{ color: '#8a6a40' }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ color: '#8a6a40' }}>{product.category}</td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: '#c8922a' }}>
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/dashboard/edit/${product.id}`}
                        className="inline-block mr-3 font-semibold hover:underline"
                        style={{ color: '#c8922a' }}
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="font-semibold hover:underline"
                        style={{ color: '#8b1a1a' }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center" style={{ color: '#8a6a40' }}>
                      Chưa có sản phẩm nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
