import { PATH } from "@/constant/path"
import PaymentStatement from "@/pages/financial-manager/payment-statement"
import PaymentDetails from "@/pages/financial-manager/payment-statement/paritals/payment-details"
import PayoutPayment from "@/pages/financial-manager/payout-payment"

export const financialRoutes = [
  { path: PATH.financialManager.payoutPayment, element: <PayoutPayment /> },
  {
    path: PATH.financialManager.paymentStatement,
    element: <PaymentStatement />,
  },
  {
    path: "/payment-details/:id",
    element: <PaymentDetails />,
  },
]
