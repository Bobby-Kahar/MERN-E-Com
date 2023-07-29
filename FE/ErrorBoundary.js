import React from "react";
import Page404 from "./Page404.js";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Update state to indicate an error has occurred
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render your fallback UI

      return (
        <div className="front-panel">
          <Page404 />;
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;