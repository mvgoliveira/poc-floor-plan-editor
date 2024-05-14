"use client";

import { ThemeProvider } from "styled-components";

import { Theme } from "../themes";
import { ReactElement } from "react";

export default function ClientThemeWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}
