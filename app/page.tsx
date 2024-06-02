"use client";

import { useEditorMenu } from "@/hooks/useEditorMenu";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FloorPlan } from "@/layout/floorPlan";
import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";

export default function Home() {
	const { width, height } = useWindowSize();
	const { hiddenUi } = useEditorMenu();

	return (
		<main
			className="flex min-h-screen h-screen flex-col bg-theme-gray-100"
			id="FULLSCREEN"
		>
			{!hiddenUi && <Header />}

			<div
				style={{
					display: "flex",
					height: "100%",
				}}
				id="fullscreen-component"
			>
				{!hiddenUi && <Sidebar />}

				<FloorPlan
					width={
						hiddenUi || document.fullscreenElement
							? width
							: width - 300
					}
					height={
						hiddenUi || document.fullscreenElement
							? height
							: height - 50
					}
				/>
			</div>
		</main>
	);
}
