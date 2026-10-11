import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import Breadcrumb from "@/components/shared/breadcrumb"

import PaymentStatementTable from "./paritals/table"
import { paymentStatementData } from "./data"

const breadcrumbTrail = ["Home", "Financial", "Payment Statement"]

const PaymentStatement = () => {
  const navigate = useNavigate()

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>(
    {},
  )

  const selectedRows = useMemo(
    () =>
      paymentStatementData.filter(
        (row) => rowSelection[String(row.id)],
      ),
    [rowSelection],
  )

  const handleProceed = () => {
    if (selectedRows.length !== 1) {
      return
    }

    const selectedPayment = selectedRows[0]

    navigate(`/financial/payment-statement/${selectedPayment.id}`)
  }

  return (
    <div className="space-y-4">
      <Breadcrumb
        trail={breadcrumbTrail}
        title="Payment Statement"
      />

      <PaymentStatementTable
        data={paymentStatementData}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        selectedRows={selectedRows}
        onProceed={handleProceed}
      />
    </div>
  )
}

export default PaymentStatement