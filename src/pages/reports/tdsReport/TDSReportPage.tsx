import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Printer,
  Search,
} from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";

interface TdsRow {
  id: string;
  cutOff: string;
  date: string;
  totalIncome: string;
  tdsRate: string;
  tdsAmount: string;
}

interface MemberDetail {
  userId: string;
  name: string;
  designation: string;
  dateOfJoining: string;
  sponsorUsername: string;
  sponsorName: string;
  selfPosition: string;
  memberStatus: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "TDS Report"];

const ORDER_STATUS_OPTIONS = ["Pending", "Approved", "Rejected", "Settled"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const memberDetail: MemberDetail = {
  userId: "9827700454",
  name: "Anita Gautam",
  designation: "N/A",
  dateOfJoining: "09/05/2023",
  sponsorUsername: "08052023",
  sponsorName: "HIGHER 19",
  selfPosition: "Distributor (10000.00)",
  memberStatus: "Active",
};

const tdsRows: TdsRow[] = [
  {
    id: "1",
    cutOff: "Bajra",
    date: "22/03/2023",
    totalIncome: "16889.44",
    tdsRate: "15.00",
    tdsAmount: "2533.41",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6";

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

const primaryButtonClass =
  "rounded-lg bg-emerald-600 px-6 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700";

const outlineButtonClass =
  "rounded-lg border border-slate-300 px-6 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[minmax(135px,1fr)_minmax(0,2fr)] gap-3 text-xs text-[#6B7280]">
    <span>{label}</span>
    <span className="font-medium text-slate-700">{value}</span>
  </div>
);

const TDSReportPage = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [username, setUsername] = useState("");

  // Change Status form state
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [remark, setRemark] = useState("");

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? tdsRows.filter(
          (row) =>
            row.cutOff.toLowerCase().includes(term) ||
            row.date.toLowerCase().includes(term)
        )
      : tdsRows;
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
    const header = [
      "C/off",
      "Date",
      "Total Income",
      "TDS Rate (%)",
      "TDS Amount (Rs.)",
    ];
    const rows = tdsRows.map((row) => [
      row.cutOff,
      row.date,
      row.totalIncome,
      row.tdsRate,
      row.tdsAmount,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tds-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchSubmit = () => {
    setIsUserLoaded(true);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="TDS Report" />

      {/* 2. INITIAL USER SEARCH CARD (Screen 1) */}
      {!isUserLoaded ? (
        <section className={cardClass}>
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-800">
              TDS Report of user
            </h2>
          </div>

          <div className="mt-6 max-w-md">
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={handleSearchSubmit}
              className={`mt-4 ${primaryButtonClass}`}
            >
              Submit
            </button>
          </div>
        </section>
      ) : (
        /* 3. MEMBER DETAIL VIEW (Screen 2) */
        <div className="space-y-4">
          {/* MEMBER DETAIL CARD */}
          <section className={cardClass}>
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">
                Member Detail
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                List of all unconfirmed order
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-x-16">
              {/* Left Column */}
              <div className="space-y-4">
                <DetailItem label="User ID" value={memberDetail.userId} />
                <DetailItem
                  label="Designation"
                  value={memberDetail.designation}
                />
                <DetailItem
                  label="Sponsor Username"
                  value={memberDetail.sponsorUsername}
                />
                <DetailItem
                  label="Self Position"
                  value={memberDetail.selfPosition}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <DetailItem label="Name" value={memberDetail.name} />
                <DetailItem
                  label="Date of joining"
                  value={memberDetail.dateOfJoining}
                />
                <DetailItem
                  label="Sponsor Name"
                  value={memberDetail.sponsorName}
                />
                <div className="grid grid-cols-[minmax(135px,1fr)_minmax(0,2fr)] gap-3 text-xs text-[#6B7280]">
                  <span>Member Status</span>
                  <span>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                      {memberDetail.memberStatus}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* TDS REPORT DATA TABLE CARD */}
          <section className={cardClass}>
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">TDS Report</h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleExport}
                  aria-label="Export"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  aria-label="Print"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-xs">
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
                    <th className="p-3 font-medium">C/off</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Total Income</th>
                    <th className="p-3 font-medium">TDS Rate (%)</th>
                    <th className="p-3 font-medium">TDS Amount (Rs.)</th>
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
                        <td className="p-3 text-slate-500">{index + 1}</td>
                        <td className="p-3 text-slate-600">{row.cutOff}</td>
                        <td className="p-3 text-slate-600">{row.date}</td>
                        <td className="p-3 font-medium text-slate-700">
                          {row.totalIncome}
                        </td>
                        <td className="p-3 text-slate-600">{row.tdsRate}</td>
                        <td className="p-3 font-medium text-emerald-700">
                          {row.tdsAmount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION FOOTER */}
            <div className="mt-4 flex items-center justify-end gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <div className="relative">
                  <select
                    aria-label="Rows per page"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
          </section>

          {/* CHANGE STATUS CARD */}
          <section className={cardClass}>
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">
                Change Status
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* Order Status Dropdown */}
              <div>
                <label htmlFor="order-status" className={labelClass}>
                  Order Status
                </label>
                <div className="relative">
                  <select
                    id="order-status"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    {ORDER_STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Remark Textarea */}
              <div>
                <label htmlFor="remark" className={labelClass}>
                  Remark
                </label>
                <textarea
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={4}
                  placeholder="Remark..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className={outlineButtonClass}>
                Cancel
              </button>
              <button type="button" className={primaryButtonClass}>
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default TDSReportPage;

