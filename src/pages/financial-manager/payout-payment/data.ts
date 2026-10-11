import type { IFile } from "./types"

export const payoutPaymentSingleData: IFile[] = [
  {
    id: "1",
    mobile: "9841234567",
    name: "Aayush Maharjan",
    pan: "302948571",
    bankName: "Global IME Bank",
    accountNo: "0701010023456001",
    bankBranch: "Kamaladi",
    releaseAmt: "125,000",
  },
]

export const payoutPaymentCycleData: Record<string, IFile[]> = {
  "2026-10-08": [
    {
      id: "2",
      mobile: "9818987654",
      name: "Sunita Shrestha",
      pan: "601829374",
      bankName: "Laxmi Sunrise Bank",
      accountNo: "0421010045892001",
      bankBranch: "New Road",
      releaseAmt: "45,500",
    },
    {
      id: "3",
      mobile: "9851122334",
      name: "Prabin Tamang",
      pan: "504938210",
      bankName: "Nabil Bank",
      accountNo: "0110010089345001",
      bankBranch: "Durbar Marg",
      releaseAmt: "230,000",
    },
  ],
  "2024-02": [
    {
      id: "4",
      mobile: "9802345678",
      name: "Pooja Karki",
      pan: "203948576",
      bankName: "NIC Asia Bank",
      accountNo: "2241010012349001",
      bankBranch: "Thapathali",
      releaseAmt: "89,000",
    },
    {
      id: "5",
      mobile: "9860112233",
      name: "Bikash Gurung",
      pan: "701829364",
      bankName: "Standard Chartered Bank",
      accountNo: "01001234501",
      bankBranch: "Naya Baneshwor",
      releaseAmt: "310,500",
    },
  ],
}