import React, { useState } from "react"
import { Plus, Trash2, ChevronDown, CheckCircle2, Printer } from "lucide-react"

interface CartItem {
  id: string
  productName: string
  mrp: number
  vat: number
  ba: number
  quantity: number
  stock: string
}

const QuickOrderPage: React.FC = () => {
  // 1. WORKFLOW STATE MANAGEMENT ("lookup" | "order-form")
  const [step, setStep] = useState<"lookup" | "order-form">("lookup")

  // User Lookup State
  const [userIdInput, setUserIdInput] = useState("")
  const [customerData] = useState({
    userId: "09841261285",
    userName: "Anita Gautam",
    dateOfJoining: "27/07/2023",
    designation: "Not Designation",
    introducerUserId: "9840993846",
    introducerName: "Nirosh Adhikari",
    mobileNumber: "9841261285",
  })

  // Order Form Item Addition States
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [quantity, setQuantity] = useState<number>(1)

  // Cart / Order Items List
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productName: "Superb Blue Shine Toilet Cleaner 500ml",
      mrp: 345.0,
      vat: 793.01,
      ba: 345.01,
      quantity: 20,
      stock: "Central Warehouse",
    },
    {
      id: "2",
      productName: "Superb Olive Shine Toilet Cleaner 500ml",
      mrp: 345.0,
      vat: 793.01,
      ba: 345.01,
      quantity: 40,
      stock: "Central Warehouse",
    },
    {
      id: "3",
      productName: "Superb Mud Shine Toilet Cleaner 500ml",
      mrp: 345.0,
      vat: 793.01,
      ba: 345.01,
      quantity: 15,
      stock: "Central Warehouse",
    },
  ])

  // Store & Payment Settings
  const [selectStore, setSelectStore] = useState("")
  const [bank, setBank] = useState("")
  const [remark, setRemark] = useState("")

  // Checkbox Selection State
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Handle User Lookup Form Submit
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userIdInput.trim()) return
    setStep("order-form")
  }

  // Add Item to Cart
  const handleAddItem = () => {
    if (!selectedProduct) return
    const newItem: CartItem = {
      id: Date.now().toString(),
      productName: selectedProduct,
      mrp: 345.0,
      vat: 793.01,
      ba: 345.01,
      quantity: quantity > 0 ? quantity : 1,
      stock: selectedStock || "Central Warehouse",
    }
    setCartItems((prev) => [...prev, newItem])
    setSelectedProduct("")
    setQuantity(1)
  }

  // Delete Item from Cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    setSelectedItemIds((prev) => prev.filter((selectedId) => selectedId !== id))
  }

  // Checkbox Selection Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItemIds(cartItems.map((item) => item.id))
    } else {
      setSelectedItemIds([])
    }
  }

  const handleSelectRow = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds((prev) => prev.filter((itemId) => itemId !== id))
    } else {
      setSelectedItemIds((prev) => [...prev, id])
    }
  }

  // Calculate Total Sum
  const totalAmountSum = cartItems.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0
  )

  const handlePlaceOrder = () => {
    setShowSuccessModal(true)
  }

  return (
    <div className="relative min-h-screen space-y-6 bg-slate-100/70 p-4 font-sans text-sm text-slate-700 sm:p-6 lg:p-8">
      {/* BREADCRUMBS & PAGE HEADER */}
      <div className="space-y-1">
        <nav className="flex items-center space-x-1 text-xs text-slate-400">
          <span>Home</span>
          <span>/</span>
          <span>Purchase Manager</span>
          <span>/</span>
          <span className="font-medium text-slate-600">Quick Order</span>
        </nav>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Quick Order
        </h1>
      </div>

      {/* 2. SCREEN 1: USER LOOKUP VIEW ("In click of Quick Order") */}
      {step === "lookup" && (
        <div className="max-w-3xl space-y-5 rounded-xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">User Id</h2>
            <p className="text-xs text-slate-400">
              User search or scan with id to make a bill
            </p>
          </div>

          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">
                User Name *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter User ID, Phone, or Name..."
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. SCREEN 2: ORDER ENTRY VIEW ("Quick Order / Purchase") */}
      {step === "order-form" && (
        <div className="space-y-6">
          {/* CARD 1: DISTRIBUTOR DETAILS BLOCK */}
          <div className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">Purchase</h2>
                <p className="text-xs text-slate-400">Make new bill</p>
              </div>
              <button
                type="button"
                onClick={() => setStep("lookup")}
                className="text-xs font-medium text-emerald-600 hover:underline"
              >
                Change User
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <span className="block text-slate-400">User ID</span>
                <span className="font-semibold text-slate-700">
                  {customerData.userId}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">User Name</span>
                <span className="font-semibold text-slate-800">
                  {customerData.userName}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">Date of Joining</span>
                <span className="font-semibold text-slate-700">
                  {customerData.dateOfJoining}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">Designation</span>
                <span className="font-semibold text-slate-700">
                  {customerData.designation}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">Introducer User ID</span>
                <span className="font-semibold text-slate-700">
                  {customerData.introducerUserId}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">Introducer Name</span>
                <span className="font-semibold text-slate-700">
                  {customerData.introducerName}
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-400">Mobile Number</span>
                <span className="font-semibold text-slate-700">
                  {customerData.mobileNumber}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: PLACE ORDER (ITEM REPEATER) */}
          <div className="space-y-5 rounded-xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-800">Place Order</h2>

            {/* Input Row for adding items */}
            <div className="grid grid-cols-1 items-end gap-3 rounded-xl border border-slate-200/60 bg-slate-50/70 p-4 sm:grid-cols-12">
              <div className="space-y-1 sm:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Product *
                </label>
                <div className="relative">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">-- Select Product --</option>
                    <option value="Superb Blue Shine Toilet Cleaner 500ml">
                      Superb Blue Shine Toilet Cleaner 500ml
                    </option>
                    <option value="Superb Olive Shine Toilet Cleaner 500ml">
                      Superb Olive Shine Toilet Cleaner 500ml
                    </option>
                    <option value="Superb Mud Shine Toilet Cleaner 500ml">
                      Superb Mud Shine Toilet Cleaner 500ml
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Product Stock *
                </label>
                <div className="relative">
                  <select
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">-- Select Stock --</option>
                    <option value="Central Warehouse">Central Warehouse</option>
                    <option value="Branch Store">Branch Store</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-slate-600">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-slate-600">
                  Amount
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="Auto Generate"
                  value={
                    selectedProduct ? `Rs. ${(345 * quantity).toFixed(2)}` : ""
                  }
                  className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200/80">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 font-semibold text-slate-600">
                    <th className="w-10 p-3 text-center">
                      <input
                        type="checkbox"
                        checked={
                          cartItems.length > 0 &&
                          selectedItemIds.length === cartItems.length
                        }
                        onChange={handleSelectAll}
                        className="cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </th>
                    <th className="p-3">#</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">MRP</th>
                    <th className="p-3">VAT</th>
                    <th className="p-3">BA</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {cartItems.map((item, index) => {
                    const isSelected = selectedItemIds.includes(item.id)
                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-slate-50/60 ${
                          isSelected ? "bg-emerald-50/30" : ""
                        }`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(item.id)}
                            className="cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="p-3 text-slate-400">{index + 1}.</td>
                        <td className="p-3 font-medium text-slate-800">
                          {item.productName}
                        </td>
                        <td className="p-3">{item.mrp.toFixed(2)}</td>
                        <td className="p-3">{item.vat.toFixed(2)}</td>
                        <td className="p-3">{item.ba.toFixed(2)}</td>
                        <td className="p-3 font-semibold">{item.quantity}</td>
                        <td className="p-3 font-semibold text-slate-700">
                          Rs. {(item.mrp * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="inline-flex items-center justify-center rounded p-1 text-red-500 transition-colors hover:text-red-600"
                            title="Delete item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer Total Sum */}
            <div className="flex justify-end gap-4 pt-2 text-xs font-bold text-slate-800">
              <span>TOTAL AMT:</span>
              <span className="text-emerald-600">
                Rs. {totalAmountSum.toFixed(2)}
              </span>
            </div>
          </div>

          {/* CARD 3: FULFILLMENT & PAYMENT SETTINGS */}
          <div className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Select Store *
                </label>
                <div className="relative">
                  <select
                    value={selectStore}
                    onChange={(e) => setSelectStore(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Store</option>
                    <option value="Central Office">Central Office</option>
                    <option value="Sunwal">Sunwal</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Bank *
                </label>
                <div className="relative">
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Bank Name</option>
                    <option value="Cash">Cash</option>
                    <option value="Khalti">Khalti</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">
                Remark
              </label>
              <textarea
                rows={3}
                placeholder="Add order remarks..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Place Order Primary Action Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="rounded-lg bg-emerald-600 px-8 py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-emerald-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. POST-SUBMIT SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Order Placed Successfully!
            </h3>
            <p className="text-xs text-slate-500">
              Order has been created for user{" "}
              <span className="font-semibold text-slate-700">
                {customerData.userName}
              </span>
              .
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false)
                  setStep("lookup")
                }}
                className="flex-1 rounded-lg border border-slate-300 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                New Order
              </button>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
              >
                <Printer className="h-4 w-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuickOrderPage
