import React, { useMemo, useState } from "react";
import {
  Calendar,
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

interface VatRow {
  id: string;
  userId: string;
  name: string;
  orderNo: string;
  orderDate: string;
  orderAmount: string;
  vatRate: string;
  vatAmount: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "VAT Report"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const TOTAL_INCOME = "30950.00";

const TOTAL_VAT = "30950.00";

const vatRows: VatRow[] = [
  {
    id: "1",
    userId: "987654321",
    name: "Khagendra Bhattrai",
    orderNo: "10057",
    orderDate: "01/02/2024 08:02:56 AM",
    orderAmount: "1283.48",
    vatRate: "12",
    vatAmount: "305.31",
  },
  {
    id: "2",
    userId: "987654112",
    name: "Khagendra Bhattrai",
    orderNo: "10069",
    orderDate: "01/02/2024 08:02:56 AM",
    orderAmount: "345.48",
    vatRate: "40",
    vatAmount: "305.31",
  },
  {
    id: "3",
    userId: "98265442",
    name: "Khagendra Bhattrai",
    orderNo: "1075",
    orderDate: "01/02/2024 08:02:56 AM",
    orderAmount: "45.90",
    vatRate: "12",
    vatAmount: "305.31",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

const searchButtonClass =
  "rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700";

const cancelLinkClass =
  "cursor-pointer text-xs font-medium text-red-500 hover:underline";

const DateField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isPickerActive, setIsPickerActive] = useState(false);

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPickerActive ? "date" : "text"}
          value={value}
          onFocus={() => setIsPickerActive(true)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="dd/mm/yyyy"
          className={inputClass}
        />
        {!isPickerActive && (
          <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
      </div>
    </div>
  );
};

const VatReportPage = () => {
  // Filter form state
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? vatRows.filter(
          (row) =>
            row.userId.toLowerCase().includes(term) ||
            row.name.toLowerCase().includes(term) ||
            row.orderNo.toLowerCase().includes(term)
        )
      : vatRows;
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
      "Name",
      "Order No.",
      "Order Date",
      "Order Amount",
      "VAT Rate (%)",
      "VAT Amount",
    ];
    const rows = vatRows.map((row) => [
      row.userId,
      row.name,
      row.orderNo,
      row.orderDate,
      row.orderAmount,
      row.vatRate,
      row.vatAmount,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vat-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="VAT Report" />

      {/* 2. TOP FILTER & SUMMARY CARD ("Filter Criteria") */}
      <section className={cardClass}>
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Filter Criteria
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Check Your vat report
            </p>
          </div>
          <button type="button" className={cancelLinkClass}>
            Cancel
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField
            id="date-from"
            label="Date From"
            value={dateFrom}
            onChange={setDateFrom}
          />
          <DateField
            id="date-to"
            label="Date To"
            value={dateTo}
            onChange={setDateTo}
          />
        </div>

        {/* Summary Stats & Action Bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-xs font-bold text-slate-800">
              Total Income : {TOTAL_INCOME}
            </p>
            <p className="text-xs font-bold text-slate-800">
              Total Vat : {TOTAL_VAT}
            </p>
          </div>
          <button type="button" className={searchButtonClass}>
            Search
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Vat Report") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Vat Report</h2>

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
          <table className="w-full min-w-[1100px] border-collapse text-left text-xs">
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
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Order No.</th>
                <th className="p-3 font-medium">Order Date</th>
                <th className="p-3 font-medium">Order Amount</th>
                <th className="p-3 font-medium">VAT Rate (%)</th>
                <th className="p-3 font-medium">VAT Amount</th>
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
                      {row.name}
                    </td>
                    <td className="p-3 text-slate-600">{row.orderNo}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.orderDate}
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {row.orderAmount}
                    </td>
                    <td className="p-3 text-slate-600">{row.vatRate}</td>
                    <td className="p-3 font-medium text-emerald-700">
                      {row.vatAmount}
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
    </div>
  );
};

export default VatReportPage;

