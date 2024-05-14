import type { Metadata } from "next";
import "./globals.css";
import ClientThemeWrapper from "./client-theme-wrapper";
import StyledComponentsRegistry from "@/lib/registry";
import { poppins, roboto } from "./fonts";

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
			<body className={`${roboto.className} ${poppins.className}`}>
				<StyledComponentsRegistry>
					<ClientThemeWrapper>{children}</ClientThemeWrapper>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
