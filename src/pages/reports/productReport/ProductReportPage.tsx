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

interface ProductRow {
  id: string;
  productName: string;
  quantity: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "Product Report"];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
const TOTAL_RECORDS = 20;

const productRows: ProductRow[] = [
  { id: "1", productName: "Himalayan Berry 100ml", quantity: "850" },
  { id: "2", productName: "Hair Oil 250ml", quantity: "850" },
  { id: "3", productName: "K Care Juice 500ml", quantity: "2444" },
];

const card = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";
const input =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
const label = "mb-1.5 block text-xs font-medium text-slate-600";
const searchInput =
  "w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50";
const rowsSelect =
  "appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const DateField = ({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [active, setActive] = useState(false);
  return (
    <div>
      <label htmlFor={id} className={label}>
        {id === "from-date" ? "From Date" : "To Date"}
      </label>
      <div className="relative">
        <input
          id={id}
          type={active ? "date" : "text"}
          value={value}
          onFocus={() => setActive(true)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="dd/mm/yyyy"
          className={input}
        />
        {!active && (
          <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
      </div>
    </div>
  );
};

const ProductReportPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? productRows.filter((r) => r.productName.toLowerCase().includes(term))
      : productRows;
    return base.slice(0, rowsPerPage);
  }, [search, rowsPerPage]);

  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((r) => selectedRows.includes(r.id));
  const toggleRow = (id: string) =>
    setSelectedRows((p) =>
      p.includes(id) ? p.filter((r) => r !== id) : [...p, id]
    );
  const toggleAll = () =>
    setSelectedRows(allSelected ? [] : filteredRows.map((r) => r.id));

  const handleExport = () => {
    const csv = [["#", "Product Name", "Quantity"], ...productRows.map((r) => ["", r.productName, r.quantity])]
      .map((row) => row.map((c) => `"${c}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "product-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Product Reports" />

      {/* 2. TOP FILTER CARD ("Product Filter") */}
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Product Filter
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Product Sales Report
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search..."
              className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField id="from-date" value={fromDate} onChange={setFromDate} />
          <DateField id="to-date" value={toDate} onChange={setToDate} />
          <button
            type="button"
            className="justify-self-end rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700 sm:col-span-2"
          >
            Search
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Product Report") */}
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Product Report</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className={searchInput}
              />
            </div>
            <button type="button" onClick={handleExport} aria-label="Export" className={iconBtn}>
              <Download className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => window.print()} aria-label="Print" className={iconBtn}>
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs">
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
                <th className="p-3 font-medium">Product Name</th>
                <th className="p-3 font-medium">Quantity</th>
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
                      {row.productName}
                    </td>
                    <td className="p-3 text-slate-600">{row.quantity}</td>
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
                className={rowsSelect}
              >
                {ROWS_PER_PAGE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <span>
            1-{filteredRows.length} of {TOTAL_RECORDS}
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

export default ProductReportPage;

