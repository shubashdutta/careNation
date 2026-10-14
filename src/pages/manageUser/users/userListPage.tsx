import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Filter,
  List,
  Pencil,
  Plus,
  Printer,
  Search,
  X,
} from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";

interface UserRow {
  id: string;
  name: string;
  userId: string;
  role: string;
  password: string;
  status: "Active" | "Inactive";
}

const breadcrumbTrail = ["Dashboard", "Manage User", "Create User"];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const TOTAL_RECORDS = 20;

const USER_GROUP_OPTIONS = ["Back Office", "Front Office", "Management"];
const ROLE_OPTIONS = ["Admin", "Accountant", "Operator"];
const STATUS_OPTIONS = ["Active", "Inactive"];

const userRows: UserRow[] = [
  {
    id: "1",
    name: "Vendor Tanaka",
    userId: "9827766065",
    role: "Admin",
    password: "password123",
    status: "Active",
  },
  {
    id: "2",
    name: "Sunita Sapkota",
    userId: "9827766065",
    role: "Accountant",
    password: "password123",
    status: "Active",
  },
  {
    id: "3",
    name: "Sunita Sapkota",
    userId: "9827766065",
    role: "Operator",
    password: "password123",
    status: "Active",
  },
  {
    id: "4",
    name: "Sunita Sapkota",
    userId: "9827766065",
    role: "Operator",
    password: "password123",
    status: "Active",
  },
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

const searchInputClass =
  "w-48 rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-700 transition-colors outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const iconBtnClass =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50";

const addNewBtnClass =
  "flex items-center gap-1 rounded-lg border border-emerald-600 px-4 py-1.5 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50";

const rowsSelectClass =
  "appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pr-7 pl-2.5 text-xs text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const Required = () => <span className="text-red-500">*</span>;

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700">
      {initials}
    </div>
  );
};

const SelectField = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
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

const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className={labelClass}>
        {label} <Required />
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

const UserListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Modal form state
  const [fullName, setFullName] = useState("");
  const [userGroup, setUserGroup] = useState("Back Office");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Active");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? userRows.filter(
          (row) =>
            row.name.toLowerCase().includes(term) ||
            row.userId.toLowerCase().includes(term) ||
            row.role.toLowerCase().includes(term) ||
            row.status.toLowerCase().includes(term)
        )
      : userRows;
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
    const header = ["Name", "User ID", "Role", "Status"];
    const rows = userRows.map((row) => [
      row.name,
      row.userId,
      row.role,
      row.status,
    ]);
    const csvContent = [header, ...rows]
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user-list.csv";
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
        trail={breadcrumbTrail}
        title="Create User"
        action={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={addNewBtnClass}
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        }
      />

      {/* 2. MAIN TABLE CARD ("User List") */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">User List</h2>
            <p className="mt-0.5 text-xs text-slate-500">Manage User List</p>
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
              aria-label="Filter"
              className={iconBtnClass}
            >
              <Filter className="h-4 w-4" />
            </button>
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
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">User ID</th>
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Password</th>
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
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={row.name} />
                        <span className="font-medium text-slate-700">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{row.userId}</td>
                    <td className="p-3 text-slate-600">{row.role}</td>
                    <td className="p-3 tracking-widest text-slate-400">
                      ••••••••
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        aria-label="Edit"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-emerald-600 transition-colors hover:bg-emerald-50"
                      >
                        <Pencil className="h-4 w-4" />
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

      {/* 3. "ADD NEW USER" MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            {/* Top Bar */}
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-800">Add New User</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Row 1 */}
              <div>
                <label className={labelClass}>
                  Full Name <Required />
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className={inputClass}
                />
              </div>
              <SelectField
                label="User Group"
                options={USER_GROUP_OPTIONS}
                value={userGroup}
                onChange={setUserGroup}
              />

              {/* Row 2 */}
              <SelectField
                label="Role"
                options={ROLE_OPTIONS}
                value={role}
                onChange={setRole}
              />
              <SelectField
                label="Status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={setStatus}
              />

              {/* Row 3 */}
              <PasswordField
                label="Password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
              />
              <PasswordField
                label="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>

            {/* Bottom Action */}
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;

