import React, { useEffect } from "react"
import { X, MapPin, CreditCard, ExternalLink } from "lucide-react"

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: any
}

const getStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
    case "PAID":
      return "bg-emerald-50 text-emerald-700"
    case "PENDING":
      return "bg-amber-50 text-amber-700"
    case "CANCELLED":
    case "FAILED":
      return "bg-rose-50 text-rose-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

const ViewOrderModal: React.FC<ViewOrderModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !order) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                Order #{order.orderNumber}
              </h2>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${getStatusBadge(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6 text-sm">
          {/* Purchased Items */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Items
            </h3>
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {order.orderItems?.map((item: any) => {
                const snapshot = item.productSnapshot
                const attributes = snapshot?.variant?.attributes

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      {snapshot?.image ? (
                        <img
                          src={snapshot.image}
                          alt={snapshot.productName}
                          className="h-12 w-12 rounded-md border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-md bg-slate-100" />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">
                          {snapshot?.productName || "Product"}
                        </p>
                        <p className="text-xs text-slate-500">
                          Qty: {item.quantity} × NPR {item.unitPrice}
                        </p>
                        {attributes && (
                          <p className="text-xs text-slate-400">
                            {Object.entries(attributes)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-slate-900">
                      NPR {item.totalPrice?.toLocaleString()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-slate-400" /> Shipping Address
              </div>
              {order.shippingAddress ? (
                <div className="text-xs leading-relaxed text-slate-600">
                  <p className="font-medium text-slate-800">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.province}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p className="mt-1 text-slate-500">
                    Ph: {order.shippingAddress.phone}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">N/A</p>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CreditCard className="h-4 w-4 text-slate-400" /> Billing
                Address
              </div>
              {order.billingAddress ? (
                <div className="text-xs leading-relaxed text-slate-600">
                  <p className="font-medium text-slate-800">
                    {order.billingAddress.fullName}
                  </p>
                  <p>{order.billingAddress.address}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.province}{" "}
                    {order.billingAddress.postalCode}
                  </p>
                  <p className="mt-1 text-slate-500">
                    Ph: {order.billingAddress.phone}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">N/A</p>
              )}
            </div>
          </div>

          {/* Payment Info */}
          {order.payments?.length > 0 && (
            <div className="rounded-lg border border-slate-200 p-4">
              <h4 className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Payment Info
              </h4>
              {order.payments.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs text-slate-600"
                >
                  <div>
                    <span className="font-medium text-slate-800">
                      {p.paymentMethod}
                    </span>
                    {p.gatewayOrderId && (
                      <span className="ml-2 font-mono text-slate-400">
                        ({p.gatewayOrderId})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${getStatusBadge(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                    {p.gatewayResponse?.paymentUrl &&
                      p.status === "PENDING" && (
                        <a
                          href={p.gatewayResponse.paymentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 font-medium text-blue-600 hover:underline"
                        >
                          Pay <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-1.5 border-t border-slate-200 pt-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>NPR {order.subtotal?.toLocaleString()}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>- NPR {order.discountAmount?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>NPR {order.shippingAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>NPR {order.taxAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-semibold text-slate-900">
              <span>Total</span>
              <span>NPR {order.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-md bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewOrderModal
