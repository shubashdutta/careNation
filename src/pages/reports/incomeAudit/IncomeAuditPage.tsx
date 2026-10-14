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

interface IncomeAuditRow {
  id: string;
  userId: string;
  userName: string;
  totalIncome: string;
  paidIncome: string;
  tds: string;
  underSettlement: string;
  settledAmount: string;
  holdAmount: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "Weekly Income Audit Trial"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const incomeAuditRows: IncomeAuditRow[] = [
  {
    id: "1",
    userId: "9841421770",
    userName: "Khagendra Bhattrai",
    totalIncome: "3000.00",
    paidIncome: "300.00",
    tds: "0.00",
    underSettlement: "0.00",
    settledAmount: "0.00",
    holdAmount: "0.00",
  },
  {
    id: "2",
    userId: "9841421770",
    userName: "Khagendra Bhattrai",
    totalIncome: "4000.00",
    paidIncome: "3200.00",
    tds: "0.00",
    underSettlement: "0.00",
    settledAmount: "0.00",
    holdAmount: "0.00",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6";

const IncomeAuditPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? incomeAuditRows.filter(
          (row) =>
            row.userId.toLowerCase().includes(term) ||
            row.userName.toLowerCase().includes(term)
        )
      : incomeAuditRows;
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
      "User ID",
      "User Name",
      "Total Income (A)",
      "Paid Income (B)",
      "TDS (C)",
      "Under Settlement (D)",
      "Settled Amount (E)",
      "Hold Amount (F)",
    ];
    const rows = incomeAuditRows.map((row) => [
      row.userId,
      row.userName,
      row.totalIncome,
      row.paidIncome,
      row.tds,
      row.underSettlement,
      row.settledAmount,
      row.holdAmount,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "income-audit-trail.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Income Audit Trail" />

      {/* 2. DATA TABLE CARD ("Income Detail") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Income Detail</h2>

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
          <table className="w-full min-w-[1400px] border-collapse text-left text-xs">
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
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">User Name</th>
                <th className="p-3 font-medium">Total Income (A)</th>
                <th className="p-3 font-medium">Paid Income (B)</th>
                <th className="p-3 font-medium">TDS (C)</th>
                <th className="p-3 font-medium">Under Settlement (D)</th>
                <th className="p-3 font-medium">Settled Amount (E)</th>
                <th className="p-3 font-medium">Hold Amount (F=...)</th>
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
                    <td className="p-3 text-slate-600">{row.userId}</td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.userName}
                    </td>
                    <td className="p-3 font-medium text-emerald-700">
                      {row.totalIncome}
                    </td>
                    <td className="p-3 text-slate-600">{row.paidIncome}</td>
                    <td className="p-3 text-slate-600">{row.tds}</td>
                    <td className="p-3 text-slate-600">{row.underSettlement}</td>
                    <td className="p-3 text-slate-600">{row.settledAmount}</td>
                    <td className="p-3 text-slate-600">{row.holdAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION FOOTER */}
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
    </div>
  );
};

export default IncomeAuditPage;

