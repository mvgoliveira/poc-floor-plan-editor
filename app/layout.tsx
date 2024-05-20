import type { Metadata } from "next";
import "./globals.css";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@mantine/core/styles.css";
import ClientThemeWrapper from "./client-theme-wrapper";
import StyledComponentsRegistry from "@/lib/registry";
import { poppins, roboto } from "./fonts";
import ClientContextWrapper from "./client-context-wrapper";
import MatineThemeWrapper from "./mantine-theme-wrapper";
import { ColorSchemeScript } from "@mantine/core";

export const metadata: Metadata = {
	title: "Floor Plan",
	description: "A floor plan drag-and-drop editor",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${roboto.className} ${poppins.className}`}>
				<StyledComponentsRegistry>
					<MatineThemeWrapper>
						<ClientContextWrapper>
							<ClientThemeWrapper>{children}</ClientThemeWrapper>
						</ClientContextWrapper>
					</MatineThemeWrapper>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
