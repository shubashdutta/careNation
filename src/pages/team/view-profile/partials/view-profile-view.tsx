import { Download, Eye, FileText, Mail, Phone } from "lucide-react"

export const ViewProfileView = () => {
  const profileData = {
    name: "Bibha Thapa",
    email: "thapabibha7@gmail.com",
    gender: "Female",
    phone: "981234567",
    username: "981234567",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    temporaryAddress: {
      address: "Balkumari Road, Ward No. 2",
      country: "Nepal",
      province: "Bagmati Province",
      city: "Lalitpur",
    },
    permanentAddress: {
      country: "Nepal",
      province: "Bagmati Province",
      district: "Bagmati Province",
      city: "Lalitpur",
      street: "Balkumari Road, Ward No. 2",
    },
    otherInfo: {
      fatherName: "Ram Bahadur Thapa",
      motherName: "Sita Bahadur Thapa",
      grandfatherName: "Laxman Thapa",
      panNo: "120389700",
      citizenshipNo: "12-34-4677-8825",
      lastUpdated: "2024/04/04",
    },
    bankDetails: {
      bankName: "Nabil Bank Limited",
      accountNo: "01234567891012",
      bankBranch: "New Road Branch, Kathmandu",
    },
    document: {
      fileName: "Pan Card.png",
      fileSize: "120 KB",
      date: "Mar 29, 2024",
    },
    nomineeInfo: {
      nomineeName: "Ram Bahadur Thapa",
      relationship: "Sita Bahadur Thapa",
      nomineeNidNo: "989-444-47--944",
    },
  }

  return (
    <div className="w-full rounded-2xl bg-white p-8 text-[#4A5568]">
      {/* Top Profile Card */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col items-start gap-2">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="h-28 w-28 rounded-2xl object-cover shadow-sm"
          />
          <p className="text-sm text-gray-500">
            Username : {profileData.username}
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <h1 className="text-xl font-medium text-[#322A53]">
            {profileData.name}
          </h1>
          <div className="flex flex-col gap-1.5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-500" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center text-sm font-medium text-emerald-500">
                ♀
              </span>
              <span>{profileData.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              <span>{profileData.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-10">
          {/* Temporary Address */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Temporary Address
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Address :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.temporaryAddress.address}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Country :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.temporaryAddress.country}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Province :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.temporaryAddress.province}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">City :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.temporaryAddress.city}
                </span>
              </div>
            </div>
          </div>

          {/* Permanent Address */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Permanent Address
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Country :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.permanentAddress.country}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Province :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.permanentAddress.province}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">District :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.permanentAddress.district}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">City :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.permanentAddress.city}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Street :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.permanentAddress.street}
                </span>
              </div>
            </div>
          </div>

          {/* Other Information */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Other Information
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Father Name :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.fatherName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Mother Name :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.motherName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Grandfather Name :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.grandfatherName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Pan No. :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.panNo}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Citizenship Number :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.citizenshipNo}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Last Updated :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.otherInfo.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {/* Bank Details */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Bank Details
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Bank Name :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.bankDetails.bankName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Account No. :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.bankDetails.accountNo}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Bank Branch :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.bankDetails.bankBranch}
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Documents
            </h2>
            <div className="rounded-xl border border-gray-200/80 p-4">
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {profileData.document.fileName}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {profileData.document.fileSize} •{" "}
                      {profileData.document.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nominee Information */}
          <div>
            <h2 className="mb-4 text-[18px] font-medium text-[#322A53]">
              Nominee Information
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Nominee Name :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.nomineeInfo.nomineeName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Relationship :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.nomineeInfo.relationship}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-600">Nominee NID no :</span>
                <span className="col-span-2 text-gray-800">
                  {profileData.nomineeInfo.nomineeNidNo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-12 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-8 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-primary-500 px-8 py-2.5 text-sm text-white transition-colors hover:bg-primary-600"
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default ViewProfileView
