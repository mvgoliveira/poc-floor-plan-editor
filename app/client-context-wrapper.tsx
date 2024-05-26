"use client";

import { ReactElement } from "react";
import { AppContextProvider } from "@/contexts/appContext";
import { EditorMenuContextProvider } from "@/contexts/editorMenuContext";
import { DataContextProvider } from "@/contexts/dataContext";

export default function ClientContextWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return (
		<EditorMenuContextProvider>
			<DataContextProvider>
				<AppContextProvider>{children}</AppContextProvider>
			</DataContextProvider>
		</EditorMenuContextProvider>
	);
}
