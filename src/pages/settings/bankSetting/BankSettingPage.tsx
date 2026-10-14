import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Pencil,
  Plus,
  Printer,
  Search,
  Trash2,
} from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";

interface BankRow {
  id: string;
  bankName: string;
  companyBank: string;
  status: string;
}

const breadcrumbTrail = ["Home", "Store Manager", "Manage Bank"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const bankRows: BankRow[] = [
  {
    id: "1",
    bankName: "Global IME Bank",
    companyBank: "yes",
    status: "Active",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

const searchInputClass =
  "w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const iconBtnClass =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50";

const addNewBtnClass =
  "flex items-center gap-1 rounded-lg border border-emerald-600 px-4 py-1.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50";

const rowsSelectClass =
  "appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const BankSettingPage = () => {
  // Form state
  const [bankName, setBankName] = useState("");
  const [status, setStatus] = useState("active");
  const [companyBank, setCompanyBank] = useState(false);

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? bankRows.filter(
          (row) =>
            row.bankName.toLowerCase().includes(term) ||
            row.status.toLowerCase().includes(term)
        )
      : bankRows;
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
    const header = ["#", "Bank Name", "Company Bank", "Status"];
    const rows = bankRows.map((row) => [
      "",
      row.bankName,
      row.companyBank,
      row.status,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bank-list.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Manage Bank"
        subtitle="Manage your bank"
      />

      {/* 2. TOP FORM CARD ("Manage Bank") */}
      <section className={cardClass}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Manage Bank</h2>
          <button
            type="button"
            className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>

        {/* Row 1: Bank Name & Status */}
        <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bank-name" className={labelClass}>
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              id="bank-name"
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
              className={inputClass}
            />
          </div>
          <div>
            <span className={labelClass}>Status</span>
            <div className="flex items-center gap-6 pt-2.5">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={status === "active"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 accent-emerald-600"
                />
                Active
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="status"
                  value="deactivate"
                  checked={status === "deactivate"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-4 w-4 accent-emerald-600"
                />
                Deactivate
              </label>
            </div>
          </div>
        </div>

        {/* Row 2: Company Bank */}
        <div className="mt-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <Checkbox
              checked={companyBank}
              onCheckedChange={(checked) => setCompanyBank(Boolean(checked))}
              aria-label="Company Bank"
            />
            Company Bank
          </label>
        </div>

        {/* Row 3: Submit */}
        <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Bank List") */}
      <section className={cardClass}>
        {/* Card Top Action Bar */}
        <div className="flex justify-end">
          <button type="button" className={addNewBtnClass}>
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Header Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Bank List</h2>

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
                <th className="p-3 font-medium">Bank Name</th>
                <th className="p-3 font-medium">Company Bank</th>
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
                      {row.bankName}
                    </td>
                    <td className="p-3 text-slate-600">{row.companyBank}</td>
                    <td className="p-3">
                      <span className="text-xs font-medium text-emerald-600">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="Edit"
                          className="cursor-pointer text-emerald-600 transition-colors hover:text-emerald-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          className="cursor-pointer text-rose-500 transition-colors hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
      </section>
    </div>
  );
};

export default BankSettingPage;

