import { useState } from "react"
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Highlighter,
  List,
  ListOrdered,
  Link,
  Image,
  Code2,
  Quote,
  Minus,
  Search,
  Download,
  Printer,
  Edit2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react"

// Types
export interface IAnnouncement {
  id: string
  message: string
  date: string
  display: string
  status: "Active" | "Deactivate"
}

// Mock Data
export const mockAnnouncements: IAnnouncement[] = [
  {
    id: "1",
    message: "Bajra Toothpaste",
    date: "02/12/2024",
    display: "NEWS",
    status: "Active",
  },
  {
    id: "2",
    message: "AYU PLUS JUICE 500ML",
    date: "29/02/2024",
    display: "Announcement",
    status: "Deactivate",
  },
  {
    id: "3",
    message: "NONI GOLD JUICE 500ML",
    date: "15/06/2024",
    display: "Announcement",
    status: "Active",
  },
  {
    id: "4",
    message: "HIMALAYAN BERRY 500ML",
    date: "18/08/2024",
    display: "Announcement",
    status: "Active",
  },
]

export const CampaignCard = () => {
  const [selectedView, setSelectedView] = useState("Both")
  const [selectedState, setSelectedState] = useState("Deactivate")
  const [messageText, setMessageText] = useState("")

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}

      {/* Create Announcement Section */}
      <div className="mb-6 rounded-xl bg-white p-6">
        <h2 className="text-base font-semibold text-[#2D3748]">Message</h2>
        <p className="mb-4 text-xs text-[#A0AEC0]">Message to everyone</p>

        {/* View Options */}
        <div className="mb-4 flex items-center gap-6 text-xs text-[#4A5568]">
          <span className="w-12 font-medium">View</span>
          {["On Dashboard", "On Visitor Page", "Both"].map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedView === option}
                onChange={() => setSelectedView(option)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              {option}
            </label>
          ))}
        </div>

        {/* State Options */}
        <div className="mb-6 flex items-center gap-6 text-xs text-[#4A5568]">
          <span className="w-12 font-medium">State</span>
          {["Activate", "Deactivate"].map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedState === option}
                onChange={() => setSelectedState(option)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              {option}
            </label>
          ))}
        </div>

        <h3 className="mb-3 text-lg font-bold text-[#2D3748]">Edit Message</h3>

        {/* Rich Text Editor Simulation */}
        <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#EEF2F6] px-4 py-2.5 text-[#4A5568]">
            <button className="p-1 hover:text-black">
              <Undo className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Redo className="h-4 w-4" />
            </button>
            <div className="mx-1 h-4 w-[1px] bg-gray-300" />
            <div className="flex cursor-pointer items-center gap-1 text-xs font-medium">
              Normal text <ChevronDown className="h-3 w-3" />
            </div>
            <div className="mx-1 h-4 w-[1px] bg-gray-300" />
            <button className="p-1 hover:text-black">
              <Bold className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Italic className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Underline className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Strikethrough className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Code className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Highlighter className="h-4 w-4" />
            </button>
            <div className="mx-1 h-4 w-[1px] bg-gray-300" />
            <button className="rounded bg-gray-300/60 p-1">
              <List className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <ListOrdered className="h-4 w-4" />
            </button>
            <div className="mx-1 h-4 w-[1px] bg-gray-300" />
            <button className="p-1 hover:text-black">
              <Link className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Image className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Code2 className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Quote className="h-4 w-4" />
            </button>
            <button className="p-1 hover:text-black">
              <Minus className="h-4 w-4" />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Aa.."
            className="h-48 w-full resize-none p-4 text-sm text-[#2D3748] focus:outline-none"
          />
        </div>

        {/* Send Button */}
        <div className="mt-4 flex justify-end">
          <button className="rounded-xl bg-[#10B981] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
            Send
          </button>
        </div>
      </div>

      {/* Announcement List Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#2D3748]">
            Announcement List
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-64 rounded-xl border border-gray-200 pr-4 pl-9 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50">
              <Download className="h-4 w-4 text-gray-600" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50">
              <Printer className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-[#F0F2F5]">
          <div className="border-b border-[#F0F2F5] bg-[#FAFAFC] px-3 py-2">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </div>
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0F2F5] bg-[#FAFAFC] font-semibold text-[#4A5568]">
                <th className="w-10 border-r border-[#F0F2F5] px-3 py-3 text-center"></th>
                <th className="w-10 border-r border-[#F0F2F5] px-3 py-3 text-center">
                  <List className="mx-auto h-4 w-4 text-gray-500" />
                </th>
                <th className="border-r border-[#F0F2F5] px-4 py-3">Message</th>
                <th className="border-r border-[#F0F2F5] px-4 py-3">Date</th>
                <th className="border-r border-[#F0F2F5] px-4 py-3">Display</th>
                <th className="border-r border-[#F0F2F5] px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockAnnouncements.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-[#F0F2F5] transition-colors ${
                    index % 2 === 0 ? "bg-[#F9F8FD]" : "bg-white"
                  }`}
                >
                  <td className="border-r border-[#F0F2F5] px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="border-r border-[#F0F2F5] px-3 py-3 text-center text-gray-500">
                    1.
                  </td>
                  <td className="border-r border-[#F0F2F5] px-4 py-3 font-medium text-[#4A5568]">
                    {item.message}
                  </td>
                  <td className="border-r border-[#F0F2F5] px-4 py-3 text-[#718096]">
                    {item.date}
                  </td>
                  <td className="border-r border-[#F0F2F5] px-4 py-3 text-[#718096]">
                    {item.display}
                  </td>
                  <td className="border-r border-[#F0F2F5] px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 font-medium ${
                        item.status === "Active"
                          ? "text-[#10B981]"
                          : "text-[#EF4444]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "Active"
                            ? "bg-[#10B981]"
                            : "bg-[#EF4444]"
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-end gap-6 bg-white px-4 py-3 text-xs text-[#718096]">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <div className="flex items-center gap-1 font-medium text-[#2D3748]">
                5 <ChevronDown className="h-3 w-3" />
              </div>
            </div>
            <span className="font-medium text-[#2D3748]">1-5 of 20</span>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
