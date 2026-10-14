import React, { useState } from "react";
import Breadcrumb from "@/components/shared/breadcrumb";

const breadcrumbTrail = ["Dashboard", "Team", "Referral"];

const cardClass = "rounded-xl border border-slate-200 bg-white p-6 shadow-sm";

const MemberLoginPage = () => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle member login submission here
    console.log("Logging in as member:", userName);
  };

  return (
    <div className="space-y-4">
      {/* 1. BREADCRUMB & PAGE HEADER */}
      <Breadcrumb trail={breadcrumbTrail} title="Member Log in" />

      {/* 2. MAIN FORM CARD ("User Id") */}
      <section className={cardClass}>
        {/* Card Header */}
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">User Id</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Enter user-id to log in as a member
          </p>
        </div>

        {/* Form Input Row */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex items-center gap-4"
        >
          <label className="text-xs font-semibold whitespace-nowrap text-slate-700">
            User Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
            className="w-72 rounded-lg border border-emerald-500 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-8 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default MemberLoginPage;

