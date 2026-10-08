import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import { Suspense } from "react"
import MainRoutes from "./routes"

export function App() {
  const router = createBrowserRouter(MainRoutes)

  return (
    <>
      <ToastContainer stacked />
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
