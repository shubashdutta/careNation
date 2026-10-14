import { PATH } from "@/constant/path"
import CommissionReportPage from "@/pages/reports/commissionReports/CommissionReportPage"
import IncomeAuditPage from "@/pages/reports/incomeAudit/IncomeAuditPage"
import MonthlyReportPage from "@/pages/reports/monthlyReports/MonthlyReportPage"
import SalesReportsPage from "@/pages/reports/salesReports/SalesReportsPage"
import TDSReportPage from "@/pages/reports/tdsReport/TDSReportPage"
import WeeklyReportPage from "@/pages/reports/weeklyReport/WeeklyReportPage"

export const ReportRoutes = [
  {
    path: PATH.report.commission,
    element: <CommissionReportPage />,
  },
  {
    path: PATH.report.salesReports,
    element: <SalesReportsPage />,
  },
  {
    path: PATH.report.monthlyReports,
    element: <MonthlyReportPage />,
  },
  {
    path: PATH.report.weeklyReport,
    element: <WeeklyReportPage />,
  },
  {
    path: PATH.report.incomeAudit,
    element: <IncomeAuditPage />,
  },

  {
    path: PATH.report.tdsReport,
    element: <TDSReportPage />,
  },
]
