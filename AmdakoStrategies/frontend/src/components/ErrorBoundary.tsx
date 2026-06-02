import React, { ReactNode, ReactElement } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <h1 style={{ color: "#d32f2f", marginBottom: "16px" }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "24px" }}>
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV !== "production" && (
              <details
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <summary style={{ fontWeight: "bold", marginBottom: "8px" }}>
                  Error Details (Development Only)
                </summary>
                <pre
                  style={{
                    overflow: "auto",
                    backgroundColor: "#fff",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#d32f2f",
                  }}
                >
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as ReactElement;
  }
}
