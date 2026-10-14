import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  List,
  Search,
} from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";

interface FileRow {
  id: string;
  fileName: string;
  fileDescription: string;
  date: string;
}

const breadcrumbTrail = ["Home", "Content Manager", "File Manager"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const fileRows: FileRow[] = [
  {
    id: "1",
    fileName: "File Name",
    fileDescription: "ANJU DEVI BHATTRAI",
    date: "02/16/2024",
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

const rowsSelectClass =
  "appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const Required = () => <span className="text-red-500">*</span>;

const FileUploadField = ({
  label,
  fileName,
  onChange,
}: {
  label: string;
  fileName: string;
  onChange: (file: File | null) => void;
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500 transition-colors hover:border-emerald-300">
      <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
        Choose File
      </span>
      <span className="truncate">
        {fileName ? fileName : "No File Chosen"}
      </span>
      <input
        type="file"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  </div>
);

const FileManager = () => {
  // Form state
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploadName, setUploadName] = useState("");

  // Table state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleFile = (file: File | null) => {
    setUploadName(file ? file.name : "");
  };

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? fileRows.filter(
          (row) =>
            row.fileName.toLowerCase().includes(term) ||
            row.fileDescription.toLowerCase().includes(term)
        )
      : fileRows;
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

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="File Manager" />

      {/* 2. TOP FORM CARD ("Upload File") */}
      <section className={`${cardClass} mb-6`}>
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Upload File</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Manage your promotional content
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Row 1 */}
          <div>
            <label className={labelClass}>
              File Name <Required />
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File Name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              URL <Required />
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className={inputClass}
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className={labelClass}>File Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Aa.."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <FileUploadField
            label="Upload File"
            fileName={uploadName}
            onChange={handleFile}
          />
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </section>

      {/* 3. DATA TABLE CARD ("Upload File List") */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Upload File List
          </h2>
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
            <button type="button" aria-label="Filter" className={iconBtnClass}>
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-xs">
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
                <th className="p-3 font-medium">File Name</th>
                <th className="p-3 font-medium">File Description</th>
                <th className="p-3 font-medium">Date</th>
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
                    <td className="p-3">
                      <span className="cursor-pointer font-medium text-blue-600 hover:underline">
                        {row.fileName}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      {row.fileDescription}
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {row.date}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>
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

export default FileManager;

