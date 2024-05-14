"use client";

import FloorPlan from "@/layout/floorPlan";
import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar";

export default function Home() {
	return (
		<main className="flex min-h-screen h-screen flex-col bg-theme-gray-100">
			<Header />

			<div style={{ display: "flex" }}>
				<Sidebar />

				<FloorPlan
					height={window.innerHeight - 50}
					width={window.innerWidth - 300}
				/>
			</div>
		</main>
	);
}
