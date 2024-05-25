"use client";

import { ReactElement } from "react";
import { AppContextProvider } from "@/contexts/appContext";
import { EditorMenuContextProvider } from "@/contexts/editorMenuContext";

export default function ClientContextWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return (
		<AppContextProvider>
			<EditorMenuContextProvider>{children}</EditorMenuContextProvider>
		</AppContextProvider>
	);
}
