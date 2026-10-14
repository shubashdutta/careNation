import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Breadcrumb from "@/components/shared/breadcrumb";

interface SummaryRow {
  label: string;
  value: string;
}

const breadcrumbTrail = ["Dashboard", "Reports", "MIS Report"];

const PAYOUT_OPTIONS = ["All", "Weekly", "Monthly", "Quarterly"];

const summaryRows: SummaryRow[] = [
  { label: "Total Joining", value: "9827720454" },
  { label: "Total Activate Members", value: "N/A" },
  { label: "Total Not Active Mambar", value: "08/05/2025" },
  { label: "Amount Collection (With VAT)", value: "Distributor (10000.00)" },
  { label: "BA Collection", value: "Distributor (10000.00)" },
  { label: "VAT Collection", value: "Distributor (10000.00)" },
  { label: "Amount Distributed (With TDS)", value: "Distributor (10000.00)" },
  { label: "TDS", value: "Distributor (10000.00)" },
  { label: "NET Payable", value: "Distributor (10000.00)" },
  { label: "Saved Amount", value: "Distributor (10000.00)" },
];

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const innerCardClass =
  "rounded-lg border border-slate-200 bg-slate-50/60 p-5 shadow-2xs";

const labelClass = "mb-1.5 block text-xs font-medium text-slate-600";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pr-9 pl-3.5 text-xs text-slate-700 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const SummaryItem = ({ label, value }: SummaryRow) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 last:border-b-0">
    <span className="text-sm font-medium text-slate-600">{label} :</span>
    <span className="text-right text-sm text-slate-800">{value}</span>
  </div>
);

const MisReportPage = () => {
  const [payout, setPayout] = useState(PAYOUT_OPTIONS[0]);

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="MIS Report" />

      {/* 2. MAIN CARD CONTAINER */}
      <section className={cardClass}>
        {/* Header Bar */}
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">
            Business Summary Report
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Track total joining, Income, and distribution status.
          </p>
        </div>

        {/* Filter Form Controls */}
        <div className="mt-5 max-w-sm">
          <label htmlFor="payout" className={labelClass}>
            Payout
          </label>
          <div className="relative">
            <select
              id="payout"
              value={payout}
              onChange={(e) => setPayout(e.target.value)}
              className={selectClass}
            >
              {PAYOUT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* 3. BUSINESS SUMMARY METRICS LIST (Nested Key-Value Card) */}
        <div className={`mt-6 ${innerCardClass}`}>
          <h3 className="mb-4 border-b border-slate-200 pb-3 text-sm font-bold text-slate-800">
            Business Summary Report
          </h3>
          <div>
            {summaryRows.map((row) => (
              <SummaryItem key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MisReportPage;

