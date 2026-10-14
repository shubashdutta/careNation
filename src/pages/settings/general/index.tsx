import React, { useState } from "react";
import { ChevronDown, Image as ImageIcon, Pencil } from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";

const breadcrumbTrail = ["Home", "Store Manager", "General Setting"];

const PROVINCE_OPTIONS = ["Bagmati", "Koshi", "Madhesh", "Gandaki", "Lumbini"];
const DISTRICT_OPTIONS = ["Kathmandu", "Lalitpur", "Bhaktapur", "Chitwan"];
const CITY_OPTIONS = ["Kathmandu", "Pokhara", "Bharatpur", "Biratnagar"];
const PIN_CODE_OPTIONS = ["44600", "33700", "44200", "56613"];

const EMPTY_COMPANY = {
  companyName: "",
  companyMobile: "",
  companyPhone: "",
  serviceNumber: "",
  address: "",
  country: "",
  province: "",
  district: "",
  city: "",
  pinCode: "",
  landmark: "",
};

const EMPTY_EMAIL = {
  companyName: "",
  companyMobile: "",
  companyPhone: "",
  serviceNumber: "",
};

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

const Required = () => <span className="text-red-500">*</span>;

const CardHeader = ({ title }: { title: string }) => (
  <h2 className="border-b border-slate-100 pb-4 text-base font-bold text-slate-800">
    {title}
  </h2>
);

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  </div>
);

const SelectField = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
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
        <option value="">{placeholder}</option>
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

const LogoField = ({
  label,
  logo,
  onChange,
}: {
  label: string;
  logo: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-3">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50">
        {logo ? (
          <img
            src={logo}
            alt="Company logo"
            className="h-full w-full object-cover"
          />
        ) : (
          <ImageIcon className="h-6 w-6 text-slate-400" />
        )}
      </div>
      <label className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline">
        <Pencil className="h-4 w-4" />
        edit
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  </div>
);

const ActionButtons = ({ onReset }: { onReset: () => void }) => (
  <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
    <button
      type="button"
      onClick={onReset}
      className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
    >
      Reset All
    </button>
    <button
      type="button"
      className="rounded-lg bg-emerald-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
    >
      Update
    </button>
  </div>
);

const GeneralSettings = () => {
  const [company, setCompany] = useState(EMPTY_COMPANY);
  const [email, setEmail] = useState(EMPTY_EMAIL);
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-0">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Company Setting"
        subtitle="Change company important details"
      />

      {/* CARD 1: Company Details */}
      <section className={cardClass}>
        <CardHeader title="Company Details" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Company Name"
            value={company.companyName}
            onChange={(v) => setCompany({ ...company, companyName: v })}
          />
          <TextField
            label="Company Mobile No."
            value={company.companyMobile}
            onChange={(v) => setCompany({ ...company, companyMobile: v })}
          />
          <TextField
            label="Company Phone"
            value={company.companyPhone}
            onChange={(v) => setCompany({ ...company, companyPhone: v })}
          />
          <TextField
            label="Service Number"
            value={company.serviceNumber}
            onChange={(v) => setCompany({ ...company, serviceNumber: v })}
          />
          <TextField
            label="Address"
            value={company.address}
            onChange={(v) => setCompany({ ...company, address: v })}
          />
          <TextField
            label="Country"
            value={company.country}
            onChange={(v) => setCompany({ ...company, country: v })}
          />
          <SelectField
            label="Province"
            placeholder="Province"
            options={PROVINCE_OPTIONS}
            value={company.province}
            onChange={(v) => setCompany({ ...company, province: v })}
          />
          <SelectField
            label="District"
            placeholder="District"
            options={DISTRICT_OPTIONS}
            value={company.district}
            onChange={(v) => setCompany({ ...company, district: v })}
          />
          <SelectField
            label="City"
            placeholder="City"
            options={CITY_OPTIONS}
            value={company.city}
            onChange={(v) => setCompany({ ...company, city: v })}
          />
          <SelectField
            label="Pin Code"
            placeholder="****"
            options={PIN_CODE_OPTIONS}
            value={company.pinCode}
            onChange={(v) => setCompany({ ...company, pinCode: v })}
          />
          <TextField
            label="Landmark"
            placeholder="Landmark"
            value={company.landmark}
            onChange={(v) => setCompany({ ...company, landmark: v })}
          />
          <LogoField label="Company Logo" logo={logo} onChange={handleLogo} />
        </div>
        <ActionButtons
          onReset={() => {
            setCompany(EMPTY_COMPANY);
            setLogo(null);
          }}
        />
      </section>

      {/* CARD 2: Email Details */}
      <section className={cardClass}>
        <CardHeader title="Email Details" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Company Name"
            value={email.companyName}
            onChange={(v) => setEmail({ ...email, companyName: v })}
          />
          <TextField
            label="Company Mobile No."
            value={email.companyMobile}
            onChange={(v) => setEmail({ ...email, companyMobile: v })}
          />
          <TextField
            label="Company Phone"
            value={email.companyPhone}
            onChange={(v) => setEmail({ ...email, companyPhone: v })}
          />
          <TextField
            label="Service Number"
            value={email.serviceNumber}
            onChange={(v) => setEmail({ ...email, serviceNumber: v })}
          />
        </div>
        <ActionButtons onReset={() => setEmail(EMPTY_EMAIL)} />
      </section>
    </div>
  );
};

export default GeneralSettings;

