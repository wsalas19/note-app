import React, { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// You can log the error to an error reporting service
		console.error("Error caught by error boundary:", error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			// Render a fallback UI
			return <h1>Something went wrong. Please try again later.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
