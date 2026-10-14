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

interface NotPlacedRow {
  id: string;
  userName: string;
  name: string;
  dateOfJoining: string;
  mobile: string;
  sponsorName: string;
  sponsorDetail: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "Not Placed"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const notPlacedRows: NotPlacedRow[] = [
  {
    id: "1",
    userName: "BW654321",
    name: "Khagendra Bhattrai",
    dateOfJoining: "20/02/2024",
    mobile: "9858698999",
    sponsorName: "Khagendra Bhattrai",
    sponsorDetail: "BW684654, 9827766065",
  },
  {
    id: "2",
    userName: "BW654112",
    name: "Khagendra Bhattrai",
    dateOfJoining: "23/05/2025",
    mobile: "9825500340",
    sponsorName: "Khagendra Bhattrai",
    sponsorDetail: "BW684654, 9827766065",
  },
  {
    id: "3",
    userName: "BW65442",
    name: "Khagendra Bhattrai",
    dateOfJoining: "31/05/2024",
    mobile: "9756531132",
    sponsorName: "Khagendra Bhattrai",
    sponsorDetail: "BW684654, 9827766065",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const NotPlacedPage = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? notPlacedRows.filter(
          (row) =>
            row.userName.toLowerCase().includes(term) ||
            row.name.toLowerCase().includes(term) ||
            row.mobile.toLowerCase().includes(term) ||
            row.sponsorName.toLowerCase().includes(term)
        )
      : notPlacedRows;
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
      "User Name",
      "Name",
      "Date of Joining",
      "Mobile",
      "Sponsor ID",
    ];
    const rows = notPlacedRows.map((row) => [
      row.userName,
      row.name,
      row.dateOfJoining,
      row.mobile,
      `${row.sponsorName} / ${row.sponsorDetail}`,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "not-placed-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Report" />

      {/* 2. DATA TABLE CARD ("Not Placed List") */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Not Placed List
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              List of members not yet placed under a sponsor
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
                <th className="p-3 font-medium">User Name</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Date of Joining</th>
                <th className="p-3 font-medium">Mobile</th>
                <th className="p-3 font-medium">Sponsor ID</th>
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
                      {row.userName}
                    </td>
                    <td className="p-3 text-slate-600">{row.name}</td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.dateOfJoining}
                    </td>
                    <td className="p-3 text-slate-600">{row.mobile}</td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">
                          {row.sponsorName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {row.sponsorDetail}
                        </span>
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

export default NotPlacedPage;

