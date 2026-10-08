export const statCards = [
  { label: "Orders", value: "7,892", change: "+12.5%", trend: "up" as const },
  {
    label: "New Customers",
    value: "2,341",
    change: "-4.1%",
    trend: "down" as const,
  },
  {
    label: "Avg Order Value",
    value: "$137.28",
    change: "+6.8%",
    trend: "up" as const,
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.4%",
    trend: "up" as const,
  },
]

export const topProducts = [
  {
    rank: 1,
    name: "XPS 15 Wireless Headphones",
    revenue: "NPR 112.0K",
    sold: "1,247 sold",
    change: "+12.4%",
    trend: "up" as const,
    progress: 82,
    tone: "indigo" as const,
  },
  {
    rank: 2,
    name: "Smart Watch Series 5",
    revenue: "NPR 222.8K",
    sold: "893 sold",
    change: "+8.1%",
    trend: "up" as const,
    progress: 96,
    tone: "blue" as const,
  },
  {
    rank: 3,
    name: "USB-C Hub 7-in-1",
    revenue: "NPR 115.7K",
    sold: "2,104 sold",
    change: "-3.2%",
    trend: "down" as const,
    progress: 78,
    tone: "rose" as const,
  },
  {
    rank: 4,
    name: "Mechanical Keyboard RGB",
    revenue: "NPR 89.1K",
    sold: "441 sold",
    change: "+21.7%",
    trend: "up" as const,
    progress: 58,
    tone: "slate" as const,
  },
  {
    rank: 5,
    name: "4K Webcam HD Pro",
    revenue: "NPR 42.2K",
    sold: "528 sold",
    change: "+5.3%",
    trend: "up" as const,
    progress: 34,
    tone: "slate" as const,
  },
  {
    rank: 6,
    name: "Vnyka Bag STRONG for travel 22L",
    revenue: "NPR 42.2K",
    sold: "528 sold",
    change: "+5.3%",
    trend: "up" as const,
    progress: 34,
    tone: "amber" as const,
  },
]

export type OrderStatus = "Delivered" | "Processing" | "Shipped" | "Cancelled"

export const liveOrders: {
  initials: string
  name: string
  product: string
  amount: string
  status: OrderStatus
  tone: "indigo" | "blue" | "rose" | "amber" | "teal" | "violet"
}[] = [
  {
    initials: "OM",
    name: "Olivia Martinez",
    product: "XPS Headphones Pro",
    amount: "NPR 90",
    status: "Delivered",
    tone: "indigo",
  },
  {
    initials: "JC",
    name: "James Chen",
    product: "Smart Watch Series 5",
    amount: "$249",
    status: "Processing",
    tone: "blue",
  },
  {
    initials: "PP",
    name: "Priya Patel",
    product: "USB-C Hub 7-in-1",
    amount: "$55",
    status: "Shipped",
    tone: "violet",
  },
  {
    initials: "MJ",
    name: "Marcus Johnson",
    product: "Mechanical Keyboard",
    amount: "$139",
    status: "Cancelled",
    tone: "rose",
  },
  {
    initials: "SL",
    name: "Sophie Laurent",
    product: "4K Webcam HD Pro",
    amount: "$80",
    status: "Delivered",
    tone: "teal",
  },
  {
    initials: "TW",
    name: "Tariq Williams",
    product: "Noise-Cancel Earbuds",
    amount: "$119",
    status: "Processing",
    tone: "amber",
  },
]

export const lowStockItems = [
  {
    name: "Smart Watch Series 5",
    left: "23 units left",
    severity: "low" as const,
  },
  { name: "4K Webcam HD Pro", left: "14 units left", severity: "low" as const },
  {
    name: "Noise-Cancel Earbuds",
    left: "8 units left",
    severity: "critical" as const,
  },
  {
    name: "Noise-Cancel Earbuds",
    left: "8 units left",
    severity: "critical" as const,
  },
]

export const monthlyRevenue = [
  { month: "Jan", revenue: 38, target: 40 },
  { month: "Feb", revenue: 45, target: 42 },
  { month: "Mar", revenue: 50, target: 48 },
  { month: "Apr", revenue: 47, target: 50 },
  { month: "May", revenue: 58, target: 55 },
  { month: "Jun", revenue: 62, target: 58 },
  { month: "Jul", revenue: 60, target: 60 },
  { month: "Aug", revenue: 68, target: 63 },
  { month: "Sep", revenue: 72, target: 66 },
  { month: "Oct", revenue: 78, target: 70 },
  { month: "Nov", revenue: 85, target: 75 },
  { month: "Dec", revenue: 90, target: 80 },
]

export const revenueSparkline = [
  32, 30, 34, 38, 36, 42, 48, 45, 52, 58, 55, 62, 68, 72, 78,
]
