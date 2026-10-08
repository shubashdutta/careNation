import {
  RefreshCw,
  Trash2,
  TrendingUp,
  ChevronDown,
  ListFilter,
} from "lucide-react"
import Breadcrumb from "@/components/shared/breadcrumb"

const breadcrumbTrail = ["Dashboard", "Team", "Member Login"]

const recentCustomers = [
  {
    id: 1,
    userId: "9827766065",
    name: "Ram Rahim Insane",
    doj: "06-05-2025",
    status: "Pending",
  },
  {
    id: 2,
    userId: "9827766065",
    name: "Ram Rahim Insane",
    doj: "06-05-2025",
    status: "Pending",
  },
  {
    id: 3,
    userId: "9827766065",
    name: "Ram Rahim Insane",
    doj: "06-05-2025",
    status: "Pending",
  },
  {
    id: 4,
    userId: "9827766065",
    name: "Ram Rahim Insane",
    doj: "06-05-2025",
    status: "Pending",
  },
  {
    id: 5,
    userId: "9827766065",
    name: "Ram Rahim Insane",
    doj: "06-05-2025",
    status: "Pending",
  },
]

const Dashboard = () => {
  return (
    <div className="space-y-5 text-[#2D2342]">
      {/* Breadcrumb Container */}
      <Breadcrumb trail={breadcrumbTrail} title="" />

      {/* Main Container */}
      <div className="space-y-8 rounded-2xl bg-white p-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#1E1235]">
              Hi <span className="font-medium text-[#1AC32E]">User Name</span>,
              Welcome Back
            </h1>
            <p className="mt-1 text-xs text-gray-400">Admin Panel</p>
          </div>

          <div className="flex items-center gap-8">
            {/* Amount Distributed */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[11px] text-gray-400">Amount Distributed</p>
                <p className="text-lg font-bold text-[#1E1235]">
                  Rs.1345645.78
                </p>
              </div>
              <div className="h-9 w-20">
                <svg
                  className="h-full w-full text-orange-400"
                  viewBox="0 0 100 30"
                >
                  <path
                    d="M0 20 Q25 5, 50 15 T100 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Total Business */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[11px] text-gray-400">Total Business</p>
                <p className="text-lg font-bold text-[#1E1235]">
                  Rs.1345645.78
                </p>
              </div>
              <div className="h-9 w-20">
                <svg
                  className="h-full w-full text-purple-400"
                  viewBox="0 0 100 30"
                >
                  <path
                    d="M0 25 Q25 10, 50 20 T100 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-7">
            {/* 2x2 Metric Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="relative rounded-xl bg-[#FAFBFD] p-5"
                >
                  <button
                    aria-label="Refresh"
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-500"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1AC32E]">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">
                        Activation Customer / Total
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-[#1E1235]">
                        6469/27095
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Customer Table */}
            <div className="space-y-4 rounded-xl bg-[#FAFBFD] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#1E1235]">
                  Recent Customer
                </h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <button
                    aria-label="Refresh list"
                    className="hover:text-gray-500"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Delete list"
                    className="hover:text-gray-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 font-medium text-gray-400">
                      <th className="px-3 py-2">
                        <ListFilter className="h-3.5 w-3.5 text-gray-400" />
                      </th>
                      <th className="px-3 py-2">User ID</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">D.O.J</th>
                      <th className="px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/60 text-gray-500">
                    {recentCustomers.map((customer, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-3 text-gray-400">
                          {customer.id}.
                        </td>
                        <td className="px-3 py-3">{customer.userId}</td>
                        <td className="px-3 py-3">{customer.name}</td>
                        <td className="px-3 py-3">{customer.doj}</td>
                        <td className="px-3 py-3">{customer.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Labor Cost Chart */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl bg-[#FAFBFD] p-6">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#1E1235]">
                    Labor Cost
                  </h3>
                  <button className="flex items-center gap-1 text-xs text-gray-500">
                    <span>6 Mon</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="relative mt-2 h-52 w-full">
                  <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400">
                    <div className="border-b border-gray-100 pb-1">50 M</div>
                    <div className="border-b border-gray-100 pb-1">40 M</div>
                    <div className="border-b border-gray-100 pb-1">30 M</div>
                    <div className="border-b border-gray-100 pb-1">20 M</div>
                    <div className="border-b border-gray-100 pb-1">10 M</div>
                    <div>0</div>
                  </div>

                  <svg
                    className="absolute inset-0 h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 300 150"
                  >
                    <defs>
                      <linearGradient
                        id="purpleFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#8B5CF6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 80 Q 30 110, 60 70 T 120 90 T 180 20 T 240 80 T 300 50 L 300 150 L 0 150 Z"
                      fill="url(#purpleFill)"
                    />
                    <path
                      d="M 0 80 Q 30 110, 60 70 T 120 90 T 180 20 T 240 80 T 300 50"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                    />

                    <line
                      x1="215"
                      y1="20"
                      x2="215"
                      y2="150"
                      stroke="#1AC32E"
                      strokeWidth="10"
                      strokeOpacity="0.3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="215"
                      cy="20"
                      r="3.5"
                      fill="#1AC32E"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div className="mt-3 flex justify-between px-6 text-[11px] text-gray-400">
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>Jun</span>
                </div>
              </div>

              <div className="pt-4 text-xs text-gray-500">
                Net Labor Cost :{" "}
                <span className="font-medium text-[#1E1235]">AED 34 M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
