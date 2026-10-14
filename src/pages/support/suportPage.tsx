import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  List,
  Printer,
  Search,
} from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";

type ViewMode = "LIST" | "DETAILS" | "REPLY";

interface TicketRow {
  id: string;
  customer: string;
  userName: string;
  mail: string;
  date: string;
  status: "Solved" | "Waiting";
}

interface DetailItem {
  label: string;
  value: string;
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
const TOTAL_RECORDS = 20;

const ticketRows: TicketRow[] = [
  {
    id: "1",
    customer: "Vendor NAKAS",
    userName: "9827700454",
    mail: "Change Password",
    date: "28/02/2024",
    status: "Solved",
  },
  {
    id: "2",
    customer: "Sunita Sapkota",
    userName: "9827766065",
    mail: "Change Mobile No.",
    date: "25/08/2024",
    status: "Waiting",
  },
  {
    id: "3",
    customer: "Sunita Sapkota",
    userName: "9827766065",
    mail: "Change Password",
    date: "02/09/2024",
    status: "Waiting",
  },
];

const ticketDetails: DetailItem[] = [
  { label: "Ticket No.", value: "09554" },
  {
    label: "Subject",
    value: "Micro Start RO Name ko sunne",
  },
  { label: "Status", value: "Open (Hold)" },
  { label: "Date", value: "08/03/2024 12:00:00 PM" },
  { label: "Replied By", value: "9827766065" },
  {
    label: "Message",
    value:
      "Microstart ko name Shanta Bhattrai hoinapaya samparkam garnu hola Khagendra Karki...",
  },
];

const ticketUserDetails: DetailItem[] = [
  { label: "User Name", value: "9827766065" },
  { label: "Email ID", value: "sapkota00@gmail.com" },
  { label: "Contact", value: "9858698999" },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const searchInputClass =
  "w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const iconBtnClass =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50";

const rowsSelectClass =
  "appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const primaryBtnClass =
  "rounded-lg bg-emerald-600 px-8 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700";

const outlineBtnClass =
  "rounded-lg border border-slate-300 px-6 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50";

const StatusBadge = ({ status }: { status: TicketRow["status"] }) => (
  <span
    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
      status === "Solved"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-700"
    }`}
  >
    {status}
  </span>
);

const DetailRow = ({ label, value }: DetailItem) => (
  <div className="flex gap-2 border-b border-slate-100 py-2.5 text-sm last:border-b-0">
    <span className="shrink-0 font-medium text-slate-600">{label} :</span>
    <span className="text-slate-800">{value}</span>
  </div>
);

const SuportPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("LIST");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [reply, setReply] = useState("");

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? ticketRows.filter(
          (row) =>
            row.customer.toLowerCase().includes(term) ||
            row.userName.toLowerCase().includes(term) ||
            row.mail.toLowerCase().includes(term) ||
            row.status.toLowerCase().includes(term)
        )
      : ticketRows;
    return base.slice(0, rowsPerPage);
  }, [search, rowsPerPage]);

  const shownCount = filteredRows.length;

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((row) => selectedRows.includes(row.id));

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows(allSelected ? [] : filteredRows.map((row) => row.id));
  };

  const handleExport = () => {
    const header = ["Customer", "User Name", "Mail", "Date", "Status"];
    const rows = ticketRows.map((row) => [
      row.customer,
      row.userName,
      row.mail,
      row.date,
      row.status,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customer-query.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const pagination = (
    <div className="mt-4 flex items-center justify-end gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <div className="relative">
          <select
            aria-label="Rows per page"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className={rowsSelectClass}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
      <span>
        1-{shownCount} of {TOTAL_RECORDS}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled
          className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 text-slate-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next page"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb
        trail={["Dashboard", "Customer Support"]}
        title={viewMode === "LIST" ? "Customer Support" : "Support Center"}
      />

      {/* SCREEN 1: TICKET LIST VIEW */}
      {viewMode === "LIST" && (
        <section className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Customer Query
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage Support Ticket
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className={searchInputClass}
                />
              </div>
              <button
                type="button"
                onClick={handleExport}
                aria-label="Export"
                className={iconBtnClass}
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                aria-label="Print"
                className={iconBtnClass}
              >
                <Printer className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="p-3">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={!allSelected && selectedRows.length > 0}
                      onCheckedChange={toggleAll}
                      aria-label="Select all"
                    />
                  </th>
                  <th className="p-3 font-medium">
                    <List className="h-4 w-4 text-slate-400" />
                  </th>
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">User Name</th>
                  <th className="p-3 font-medium">Mail</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => {
                  const isSelected = selectedRows.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-slate-50 transition-colors last:border-b-0 hover:bg-slate-50/60 ${
                        isSelected ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <td className="p-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(row.id)}
                          aria-label="Select row"
                        />
                      </td>
                      <td className="p-3 text-slate-500">{index + 1}.</td>
                      <td className="p-3 font-medium text-slate-700">
                        {row.customer}
                      </td>
                      <td className="p-3 text-slate-600">{row.userName}</td>
                      <td className="p-3 text-slate-600">{row.mail}</td>
                      <td className="p-3 whitespace-nowrap text-slate-600">
                        {row.date}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          aria-label="View"
                          onClick={() => setViewMode("DETAILS")}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-emerald-600 transition-colors hover:bg-emerald-50"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {pagination}
        </section>
      )}

      {/* SCREEN 2: TICKET DETAILS VIEW  |  SCREEN 3: TICKET REPLY MODE */}
      {(viewMode === "DETAILS" || viewMode === "REPLY") && (
        <section className={cardClass}>
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-800">Customer Query</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Manage Support Ticket
            </p>
          </div>

          {/* Ticket Details Box */}
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50/60 p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-800">
              Ticket Details
            </h3>
            <div className="grid grid-cols-1 gap-x-12 gap-y-1 md:grid-cols-2">
              <div>
                {ticketDetails.map((item) => (
                  <DetailRow key={item.label} {...item} />
                ))}
              </div>
              <div>
                {ticketUserDetails.map((item) => (
                  <DetailRow key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Reply Field (Screen 3) */}
          {viewMode === "REPLY" && (
            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-slate-600">
                Reply <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={5}
                placeholder="Write your reply..."
                className="min-h-[120px] w-full resize-none rounded-lg border border-slate-300 p-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            {viewMode === "DETAILS" ? (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode("LIST")}
                  className={outlineBtnClass}
                >
                  Back to List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("REPLY")}
                  className={primaryBtnClass}
                >
                  Reply
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode("DETAILS")}
                  className={outlineBtnClass}
                >
                  Cancel
                </button>
                <button type="button" className={primaryBtnClass}>
                  Send
                </button>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SuportPage;

