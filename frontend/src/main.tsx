import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotesProvider } from "./utils/NotesContext.tsx";
import ErrorBoundary from "./utils/ErrorBoundary.tsx";

// Set the root element of your application for react-modal
Modal.setAppElement("#root");

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<NotesProvider>
					<RouterProvider router={router} />
				</NotesProvider>
			</QueryClientProvider>
		</React.StrictMode>
		,
	</ErrorBoundary>,
);
