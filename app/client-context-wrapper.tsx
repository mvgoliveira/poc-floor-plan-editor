"use client";

import { ReactElement } from "react";
import { AppContextProvider } from "@/contexts/appContext";
import { BlueprintProvider } from "@blueprintjs/core";

export default function ClientContextWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return (
		<AppContextProvider>
			<BlueprintProvider>{children}</BlueprintProvider>
		</AppContextProvider>
	);
}
