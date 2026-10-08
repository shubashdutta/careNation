import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ErrorBoundary } from "./error-boundary/index.tsx"
import QueryClientProviders from "./providers/query-client-providers.tsx"
// import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeProvider> */}
   <ErrorBoundary>
      <QueryClientProviders>
        <App />
      </QueryClientProviders>
    </ErrorBoundary>
    {/* </ThemeProvider> */}
  </StrictMode>
)
