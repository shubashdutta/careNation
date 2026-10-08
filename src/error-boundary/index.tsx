import { Component,type  ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo);

    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const path = window.location.pathname;

      return (
        <div className="text-red-600 text-center mt-10 p-4">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-sm mt-2">
            Path: <code>{path}</code>
          </p>
          {this.state.error && (
            <pre className="text-sm mt-2">{this.state.error.message}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
