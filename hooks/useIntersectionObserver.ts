import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Dừng observe sau khi đã thấy lần đầu
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      ...options
    })

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isVisible }
}
