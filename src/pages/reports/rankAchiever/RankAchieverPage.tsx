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

interface RankRow {
  id: string;
  userId: string;
  name: string;
  designation: string;
  gift: string;
  date: string;
  status: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "Rank Achiever"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const USER_ID_OPTIONS = ["All", "98586984004", "9858698459", "9858698925"];

const REWARD_LEVEL_OPTIONS = [
  "All",
  "Star",
  "Silver Star",
  "Gold Star",
  "Diamond",
];

const rankRows: RankRow[] = [
  {
    id: "1",
    userId: "98586984004",
    name: "Santosh Bahadur Karki",
    designation: "Admin",
    gift: "-",
    date: "01/02/2024",
    status: "Approved",
  },
  {
    id: "2",
    userId: "9858698459",
    name: "Santosh Bahadur Karki",
    designation: "1200.00",
    gift: "-",
    date: "01/02/2024",
    status: "Approved",
  },
  {
    id: "3",
    userId: "9858698925",
    name: "Santosh Bahadur Karki",
    designation: "2400.00",
    gift: "-",
    date: "01/02/2024",
    status: "Approved",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pr-9 pl-3.5 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

const searchButtonClass =
  "justify-self-end rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700";

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

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        <option value="">{placeholder ?? label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  </div>
);

const RankAchieverPage = () => {
  // Filter form state
  const [userId, setUserId] = useState("");
  const [rewardLevel, setRewardLevel] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter card search state
  const [filterSearch, setFilterSearch] = useState("");

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? rankRows.filter(
          (row) =>
            row.userId.toLowerCase().includes(term) ||
            row.name.toLowerCase().includes(term) ||
            row.designation.toLowerCase().includes(term) ||
            row.status.toLowerCase().includes(term)
        )
      : rankRows;
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
      "#",
      "User ID",
      "Name",
      "Designation",
      "Gift",
      "Date",
      "Status",
    ];
    const rows = rankRows.map((row) => [
      row.userId,
      row.name,
      row.designation,
      row.gift,
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
    link.download = "rank-achievers-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Rank Reports" />

      {/* 2. TOP FILTER CARD ("Rank Filter") */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Rank Filter</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Manage your orders placed by users
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search..."
              className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button type="button" className={cancelLinkClass}>
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Row 1 */}
          <SelectField
            id="user-id"
            label="User ID"
            value={userId}
            onChange={setUserId}
            options={USER_ID_OPTIONS}
          />
          <SelectField
            id="reward-level"
            label="Reward Level"
            value={rewardLevel}
            onChange={setRewardLevel}
            options={REWARD_LEVEL_OPTIONS}
            placeholder="Reward Leval"
          />

          {/* Row 2 */}
          <DateField
            id="from-date"
            label="From Date"
            value={fromDate}
            onChange={setFromDate}
          />
          <DateField
            id="to-date"
            label="To Date"
            value={toDate}
            onChange={setToDate}
          />

          {/* Row 3 */}
          <button type="button" className={`${searchButtonClass} sm:col-span-2`}>
            Search
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Rank Achievers") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Rank Achievers</h2>

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
                <th className="p-3 font-medium">Designation</th>
                <th className="p-3 font-medium">Gift</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Status</th>
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
                      {row.userId}
                    </td>
                    <td className="p-3 text-slate-600">{row.name}</td>
                    <td className="p-3 text-slate-600">{row.designation}</td>
                    <td className="p-3 text-slate-600">{row.gift}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.date}
                    </td>
                    <td className="p-3">
                      <span className="text-xs font-medium text-emerald-600">
                        {row.status}
                      </span>
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

export default RankAchieverPage;

