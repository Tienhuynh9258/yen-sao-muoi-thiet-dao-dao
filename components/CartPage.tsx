'use client'

import { useAppContext } from '@/app/context'
import { formatPrice } from '@/lib/products'
import { ArrowLeft, Minus, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

export function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, setCurrentPage, clearCart } = useAppContext()
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'bank-transfer',
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 5000000 ? 0 : 500000
  const total = subtotal + shipping

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutSuccess(true)
    clearCart()
    setTimeout(() => {
      setShowCheckout(false)
      setCheckoutSuccess(false)
      setCurrentPage('home')
    }, 3000)
  }

  if (checkoutSuccess) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center px-4">
        <div className="bg-card rounded-lg shadow-lg p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
          <p className="font-sans text-muted mb-6">
            Thank you for your purchase. Our team will contact you shortly.
          </p>
          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <p className="font-sans text-sm text-foreground">
              Total: <span className="font-bold text-primary">{formatPrice(total)}</span>
            </p>
          </div>
          <p className="font-sans text-sm text-muted mb-6">
            We&apos;ll send you updates via Zalo and email
          </p>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-card font-sans font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Contact on Zalo
          </a>
        </div>
      </main>
    )
  }

  if (cartItems.length === 0 && !showCheckout) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-border rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="font-sans text-muted mb-8 max-w-sm">
            Discover our premium bird&apos;s nest collection and add items to your cart
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-card font-sans font-bold py-3 px-8 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-sans font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.product.id} className="border-b border-border last:border-b-0 p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-hover rounded-lg flex-shrink-0" />

                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-foreground mb-2">
                        {item.product.name}
                      </h3>
                      <p className="font-sans text-sm text-muted mb-4">
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-hover rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-sans font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-hover rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-serif font-bold text-primary text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="font-sans text-xs text-muted">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 hover:bg-hover rounded text-accent transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h3 className="font-serif font-bold text-lg text-foreground mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="font-sans text-muted">Subtotal</span>
                  <span className="font-sans font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-muted">Shipping</span>
                  <span className="font-sans font-semibold">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-serif font-bold text-lg">Total</span>
                <span className="font-serif font-bold text-primary text-xl">
                  {formatPrice(total)}
                </span>
              </div>

              {shipping === 0 && (
                <p className="font-sans text-xs text-primary bg-primary/10 rounded p-2 mb-4">
                  Free shipping for orders over ₫5,000,000
                </p>
              )}

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary hover:bg-primary/90 text-card font-sans font-bold py-3 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-foreground">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-2 hover:bg-hover rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-full border border-border rounded-lg px-4 py-2 font-sans focus:outline-none focus:border-primary"
                >
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="cash-on-delivery">Cash on Delivery</option>
                </select>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <p className="font-sans text-sm">
                  Order Total: <span className="font-bold text-primary">{formatPrice(total)}</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-card font-sans font-bold py-3 rounded-lg transition-colors"
              >
                Complete Order
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
