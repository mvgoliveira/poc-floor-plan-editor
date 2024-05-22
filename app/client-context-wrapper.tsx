"use client";

import { ReactElement } from "react";
import { AppContextProvider } from "@/contexts/appContext";

export default function ClientContextWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return <AppContextProvider>{children}</AppContextProvider>;
}
