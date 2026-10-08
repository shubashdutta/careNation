//@ts-nocheck

import type { IOrder } from "./type"

export const exportOrdersToCsv = (orders: IOrder[]) => {
  const header = [
    "Customer Name",
    "Product",
    "Quantity",
    "Total Amount",
    "Payment Method",
    "Status",
    "Created",
  ]
  const rows = orders.map((order) => [
    order.customerName,
    order.productName,
    order.quantity,
    order.totalAmount,
    order.paymentMethod,
    order.status,
    order.createdAt,
  ])

  const csvContent = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "orders.csv"
  link.click()
  URL.revokeObjectURL(url)
}
