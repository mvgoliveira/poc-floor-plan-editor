// eslint-disable-next-line camelcase
import { Poppins, Roboto } from "next/font/google";

export const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
	weight: ["400", "500", "700"],
});

export const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});
