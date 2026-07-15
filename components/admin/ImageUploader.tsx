'use client'

import { useState } from 'react'
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageUploaderProps {
  value: string[]
  onChange: (images: string[]) => void
  onUpload?: (url: string) => void
}

export function ImageUploader({ value, onChange, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState<Set<number>>(new Set())

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) return null
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) return null
    const json = await res.json()
    return (json.publicUrl as string) ?? null
  }

  /* ---------- add ---------- */
  const handleAddFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const fileArr = Array.from(files)
    const urls: string[] = []
    for (const file of fileArr) {
      const url = await uploadFile(file)
      if (url) urls.push(url)
    }
    if (urls.length > 0) {
      onChange([...value, ...urls])
      urls.forEach((u) => onUpload?.(u))
    }
  }

  /* ---------- replace ---------- */
  const triggerReplace = async (index: number) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      setUploading((prev) => new Set(prev).add(index))
      const url = await uploadFile(file)
      setUploading((prev) => {
        const s = new Set(prev)
        s.delete(index)
        return s
      })
      if (!url) return
      const next = [...value]
      next[index] = url
      onChange(next)
      onUpload?.(url)
    }
    input.click()
  }

  /* ---------- remove ---------- */
  const removeImage = (index: number) => {
    const next = value.filter((_, i) => i !== index)
    onChange(next)
  }

  const moveLeft = (index: number) => {
    if (index <= 0) return
    const next = [...value]
    const tmp = next[index - 1]
    next[index - 1] = next[index]
    next[index] = tmp
    onChange(next)
  }

  const moveRight = (index: number) => {
    if (index >= value.length - 1) return
    const next = [...value]
    const tmp = next[index + 1]
    next[index + 1] = next[index]
    next[index] = tmp
    onChange(next)
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault() }}
        onDragLeave={(e) => { e.preventDefault() }}
        onDrop={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await handleAddFiles(e.dataTransfer.files)
        }}
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 transition-colors"
        style={{ borderColor: '#e8d5b0', backgroundColor: '#fdf8f3' }}
      >
        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8a6a40"
            strokeWidth="1.5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p
            className="font-sans text-sm font-medium"
            style={{ color: '#1a0a00' }}
          >
            Kéo thả ảnh vào đây hoặc click để chọn
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={async (e) => {
              await handleAddFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </label>
      </div>

      {/* Thumbnails */}
      {value.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {value.map((url, i) => (
            <div
              key={url + i}
              className="relative rounded-lg border p-1 flex flex-col items-center gap-1"
              style={{ borderColor: '#e8d5b0', backgroundColor: '#ffffff' }}
            >
              <div className="relative">
                {uploading.has(i) ? (
                  <div
                    className="flex items-center justify-center rounded-md animate-pulse"
                    style={{
                      width: '72px',
                      height: '72px',
                      backgroundColor: '#e8d5b0',
                    }}
                  >
                    <span
                      className="font-sans text-[10px]"
                      style={{ color: '#8a6a40' }}
                    >
                      Đang tải...
                    </span>
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Ảnh ${i + 1}`}
                    className="rounded-md object-cover"
                    style={{ width: '72px', height: '72px' }}
                  />
                )}
                {i === 0 && (
                  <span
                    className="absolute top-0.5 left-0.5 font-sans text-[9px] font-bold px-1 py-0.5 rounded text-white"
                    style={{ backgroundColor: '#c8922a' }}
                  >
                    Cover
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveLeft(i)
                  }}
                  disabled={i === 0}
                  className="rounded p-1 hover:bg-gray-100 disabled:opacity-30"
                  title="Di chuyển trái"
                >
                  <ChevronLeft
                    className="w-3.5 h-3.5"
                    style={{ color: '#1a0a00' }}
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerReplace(i)
                  }}
                  className="rounded px-1.5 py-0.5 font-sans text-[10px] font-medium hover:opacity-80"
                  style={{ backgroundColor: '#fdf3e3', color: '#8b1a1a' }}
                >
                  Thay
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveRight(i)
                  }}
                  disabled={i === value.length - 1}
                  className="rounded p-1 hover:bg-gray-100 disabled:opacity-30"
                  title="Di chuyển phải"
                >
                  <ChevronRight
                    className="w-3.5 h-3.5"
                    style={{ color: '#1a0a00' }}
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(i)
                  }}
                  className="rounded p-1 hover:bg-red-50"
                  title="Xóa"
                >
                  <Trash2
                    className="w-3.5 h-3.5"
                    style={{ color: '#8b1a1a' }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
