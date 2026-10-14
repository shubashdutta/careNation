import { PATH } from "@/constant/path"
import CommissionReportPage from "@/pages/reports/commissionReports/CommissionReportPage"
import IncomeAuditPage from "@/pages/reports/incomeAudit/IncomeAuditPage"
import MisReportPage from "@/pages/reports/misReport/MisReportPage"
import MonthlyReportPage from "@/pages/reports/monthlyReports/MonthlyReportPage"
import NotPlacedPage from "@/pages/reports/notPlaced/NotPlacedPage"
import PayoutPage from "@/pages/reports/payout/PayoutPage"
import ProductReportPage from "@/pages/reports/productReport/ProductReportPage"
import RankAchieverPage from "@/pages/reports/rankAchiever/RankAchieverPage"
import SalesReportsPage from "@/pages/reports/salesReports/SalesReportsPage"
import TdsPayoutPage from "@/pages/reports/tdsPayout/TdsPayoutPage"
import TDSReportPage from "@/pages/reports/tdsReport/TDSReportPage"
import VatReportPage from "@/pages/reports/vatReport/VatReportPage"
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

  {
    path: PATH.report.tdsPayout,
    element: <TdsPayoutPage />,
  },

  {
    path: PATH.report.misReport,
    element: <MisReportPage />,
  },

  {
    path: PATH.report.vatReport,
    element: <VatReportPage />,
  },
  {
    path: PATH.report.notPalced,
    element: <NotPlacedPage />,
  },
  {
    path: PATH.report.payout,
    element: <PayoutPage />,
  },

  {
    path: PATH.report.reportRanks,
    element: <RankAchieverPage />,
  },

  {
    path: PATH.report.productReport,
    element: <ProductReportPage />,
  },
]
