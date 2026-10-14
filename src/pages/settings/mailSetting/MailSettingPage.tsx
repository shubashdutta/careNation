import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";

const breadcrumbTrail = ["Home", "Store Manager", "Mail Setting"];

const CAPTION_OPTIONS = [
  "Welcome Mail",
  "Registration Success",
  "Payout Notification",
  "Password Reset",
];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

const sectionTitleClass =
  "mb-4 border-b border-slate-100 pb-2 text-sm font-bold text-slate-800";

const Required = () => <span className="text-red-500">*</span>;

const TextField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className={labelClass}>
      {label} <Required />
    </label>
    <input
      type={type}
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
    <label className={labelClass}>{label}</label>
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

const MailSettingPage = () => {
  const [caption, setCaption] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPassword, setSenderPassword] = useState("");
  const [senderSmtp, setSenderSmtp] = useState("");
  const [subject, setSubject] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const mailPreview = [
    senderEmail && `From: ${senderEmail}`,
    senderSmtp && `SMTP: ${senderSmtp}`,
    subject && `Subject: ${subject}`,
    headerMessage && headerMessage,
    editorContent,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Manage Setting"
        subtitle="Manage your Mail setting"
      />

      {/* 2. MAIN FORM CARD CONTAINER */}
      <section className={cardClass}>
        {/* Card Top Action */}
        <div className="flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>

        {/* SECTION 1: Selected Caption */}
        <div className="mt-4">
          <h3 className={sectionTitleClass}>Selected Caption</h3>
          <div className="max-w-md">
            <SelectField
              label="Selected Caption"
              placeholder="Select Caption"
              options={CAPTION_OPTIONS}
              value={caption}
              onChange={setCaption}
            />
          </div>
        </div>

        {/* SECTION 2: Company Credential Mail Settings */}
        <div className="mt-8">
          <h3 className={sectionTitleClass}>
            Company Credential Mail Settings:
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Sender Email Id"
              placeholder="E-mail ID"
              value={senderEmail}
              onChange={setSenderEmail}
            />
            <TextField
              label="Sender Password."
              placeholder="********"
              type="password"
              value={senderPassword}
              onChange={setSenderPassword}
            />
            <TextField
              label="Sender SMTP"
              placeholder="SMTP"
              value={senderSmtp}
              onChange={setSenderSmtp}
            />
          </div>
        </div>

        {/* SECTION 3: Caption Send Mail */}
        <div className="mt-8">
          <h3 className={sectionTitleClass}>Caption Send Mail:</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left Column: Form Inputs */}
            <div className="space-y-4">
              <TextField
                label="Subject"
                placeholder="Subject"
                value={subject}
                onChange={setSubject}
              />
              <TextField
                label="Header Message"
                placeholder="Header Message"
                value={headerMessage}
                onChange={setHeaderMessage}
              />
            </div>

            {/* Right Column: Live Preview Box */}
            <div>
              <label className={labelClass}>
                Mail Preview. <Required />
              </label>
              <div className="h-[168px] w-full overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700">
                {mailPreview || "Mail preview will appear here..."}
              </div>
            </div>
          </div>

          {/* Full Width Row: Editor */}
          <div className="mt-4">
            <label className={labelClass}>
              Editor <Required />
            </label>
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              rows={5}
              placeholder="Aa.."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default MailSettingPage;

