"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { FloorPlan } from "@/layout/floorPlan";
import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";

export default function Home() {
	const { width, height } = useWindowSize();

	return (
		<main className="flex min-h-screen h-screen flex-col bg-theme-gray-100">
			<Header />

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Sidebar />
				<FloorPlan width={width - 300} height={height - 50} />
			</div>
		</main>
	);
}
