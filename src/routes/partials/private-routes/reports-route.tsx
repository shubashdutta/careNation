import { PATH } from "@/constant/path"
import CommissionReportPage from "@/pages/reports/commissionReports/CommissionReportPage"
import MonthlyReportPage from "@/pages/reports/monthlyReports/MonthlyReportPage"
import SalesReportsPage from "@/pages/reports/salesReports/SalesReportsPage"

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
]
