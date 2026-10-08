import { Filter, Download, Printer, X, RefreshCw } from "lucide-react"

export const MatchingTreeView = () => {
  const mockUser = {
    name: "Santosh Kumar Thapa",
    id: "ID: 9801315146",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  }

  return (
    <div className="space-y-6">
      {/* Top Cards (Left & Right Stats) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {["Left", "Right"].map((side) => (
          <div
            key={side}
            className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium text-gray-700">{side}</span>
              <div className="flex items-center gap-2 text-gray-400">
                <button className="hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
                <button className="hover:text-gray-600">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#F9FAFB] p-3 text-center text-xs">
              <div>
                <p className="font-medium text-gray-500">Previous</p>
                <p className="mt-1 font-semibold text-gray-800">0.00</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Current</p>
                <p className="mt-1 font-semibold text-gray-800">0.00</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Total</p>
                <p className="mt-1 font-semibold text-gray-800">0.00</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Matching Tree Main Container */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Header Toolbar */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#322A53]">Matching Tree</h3>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <Download className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Selected Members Badges */}
        <div className="mb-10 flex flex-wrap gap-3">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-xl border border-purple-200 bg-[#F5F3FF] p-2 pr-4 shadow-sm"
            >
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="text-xs">
                <p className="font-semibold text-emerald-600">
                  {mockUser.name}
                </p>
                <p className="text-[10px] text-emerald-500">{mockUser.id}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hierarchy Tree Visualizer */}
        <div className="overflow-x-auto pb-6">
          <div className="flex min-w-[800px] flex-col items-center">
            {/* Root Node */}
            <div className="flex flex-col items-center">
              <img
                src={mockUser.avatar}
                alt="Root"
                className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover shadow-sm"
              />
              <div className="mt-1 rounded border border-purple-300 bg-purple-50 px-2 py-0.5 text-center text-[10px]">
                <p className="font-semibold text-purple-800">{mockUser.name}</p>
                <p className="text-purple-600">{mockUser.id}</p>
              </div>
            </div>

            {/* Connecting Vertical Line */}
            <div className="h-6 w-0.5 bg-slate-300" />

            {/* Level 1 Split */}
            <div className="w-2/3 border-t-2 border-slate-300" />
            <div className="flex w-2/3 justify-between">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-6 w-0.5 bg-slate-300" />
                  <img
                    src={mockUser.avatar}
                    alt="User"
                    className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                  />

                  {/* Level 2 Split */}
                  <div className="h-6 w-0.5 bg-slate-300" />
                  <div className="w-32 border-t-2 border-slate-300" />
                  <div className="flex w-32 justify-between">
                    {[1, 2].map((_, j) => (
                      <div key={j} className="flex flex-col items-center">
                        <div className="h-4 w-0.5 bg-slate-300" />
                        <img
                          src={mockUser.avatar}
                          alt="User"
                          className="h-7 w-7 rounded-full border border-gray-200 object-cover"
                        />

                        {/* Level 3 Split */}
                        <div className="h-4 w-0.5 bg-slate-300" />
                        <div className="w-12 border-t-2 border-slate-300" />
                        <div className="flex w-12 justify-between">
                          {[1, 2].map((_, k) => (
                            <div key={k} className="flex flex-col items-center">
                              <div className="h-3 w-0.5 bg-slate-300" />
                              <img
                                src={mockUser.avatar}
                                alt="User"
                                className="h-5 w-5 rounded-full border border-gray-200 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchingTreeView
