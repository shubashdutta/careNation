const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen items-start justify-center overflow-y-auto bg-[#dce7f7] px-4 py-12 sm:items-center sm:py-8">
      <img
        src="/loginImage.jpg"
        alt="Mountain landscape"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#dbe5f5]/65" />
      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center gap-12 sm:gap-14">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
