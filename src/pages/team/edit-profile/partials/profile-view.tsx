import { useForm, FormProvider } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { InputField } from "@/components/extended-components/extended-input"
import useDisclosure from "@/hooks/use-disclosure"
import ExtendedDialog from "@/components/extended-components/extended-dialog"
import ChangePassword from "./change-password"
import SecurityPinForm from "./security-pin-form"
import ChangeUsername from "./change-username"

export const ProfileView = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "basic-info"

  const securityPinModal = useDisclosure()
  const changePasswordModal = useDisclosure()
  const changeUsernameModal = useDisclosure()
  // Initialize React Hook Form
  const methods = useForm({
    defaultValues: {
      fileName: "",
      phone: "",
      userName: "",
      email: "",
      loginUsername: "",
    },
  })

  const handleTabChange = (tab: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set("tab", tab)
      return newParams
    })
  }

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          {/* Header Tabs & Cancel */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => handleTabChange("basic-info")}
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  currentTab === "basic-info"
                    ? "text-[#322A53] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-purple-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("kyc-info")}
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  currentTab === "kyc-info"
                    ? "text-[#322A53] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-purple-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                KYC Info
              </button>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-[#E53E3E] transition-colors hover:text-red-600"
            >
              Cancel
            </button>
          </div>

          {/* Tab Content */}
          {currentTab === "basic-info" ? (
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <InputField
                  name="fileName"
                  label="File name"
                  placeholder="Bibha Thapa"
                />
                <InputField
                  name="phone"
                  label="Phone Number"
                  placeholder="981234567"
                />
                <InputField
                  name="userName"
                  label="User Name"
                  placeholder="981234567"
                />
                <InputField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="thapabibha7@gmail.com"
                />
              </div>

              {/* Login Details Section */}
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-bold text-[#322A53]">
                  Login Details
                </h3>

                <div className="space-y-4">
                  {/* Username Control */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-gray-600">
                      Username <span className="text-red-500">*</span>
                    </span>
                    <div className="flex max-w-lg items-center gap-3">
                      <div className="w-64">
                        <InputField
                          name="loginUsername"
                          placeholder="9827766065"
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
                        onClick={changeUsernameModal.open}
                      >
                        Change Username
                      </button>
                    </div>
                  </div>

                  {/* Security Pin Action */}
                  <div className="flex items-center gap-6">
                    <span className="w-20 text-xs font-medium text-gray-600">
                      Security Pin
                    </span>
                    <button
                      onClick={securityPinModal.open}
                      type="button"
                      className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
                    >
                      Change Security PIN
                    </button>
                  </div>

                  {/* Password Action */}
                  <div className="flex items-center gap-6">
                    <span className="w-20 text-xs font-medium text-gray-600">
                      Password
                    </span>
                    <button
                      onClick={changePasswordModal.open}
                      type="button"
                      className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-400">
              KYC Information content goes here.
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-primary-500 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Update
            </button>
          </div>
        </form>
      </FormProvider>
      <ExtendedDialog
        open={securityPinModal.isOpen}
        onOpenChange={securityPinModal.set}
        title="Change Security PIN"
        className="max-w-3xl"
      >
        <SecurityPinForm onClose={securityPinModal.close} />
      </ExtendedDialog>
      <ExtendedDialog
        open={changeUsernameModal.isOpen}
        onOpenChange={changeUsernameModal.set}
        title="Change Username"
        className="max-w-3xl"
      >
        <ChangeUsername onClose={changeUsernameModal.close} />
      </ExtendedDialog>
      <ExtendedDialog
        open={changePasswordModal.isOpen}
        onOpenChange={changePasswordModal.set}
        title="Change Password"
        className="max-w-3xl"
      >
        <ChangePassword onClose={changePasswordModal.close} />
      </ExtendedDialog>
    </>
  )
}

export default ProfileView
