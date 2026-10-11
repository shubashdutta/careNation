export interface IPaymentStatement {
  id: string | number
  lotNo: string | number
  member: string | number
  createdOn: string
  paymentMethod: string
  payeeBank: string
  paymentSettlement: string
  transDate: string
  payableAmt: string | number
}