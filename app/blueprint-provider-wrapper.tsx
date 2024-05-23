"use client";

import {
	BlueprintProvider,
	OverlaysProvider,
	PortalProvider,
} from "@blueprintjs/core";
import { ReactElement } from "react";

export default function BlueprintProvierWrapper({
	children,
}: {
	children: React.ReactNode;
}): ReactElement {
	return (
		<BlueprintProvider>
			<OverlaysProvider>
				<PortalProvider portalClassName="my-portal">
					{children}
				</PortalProvider>
			</OverlaysProvider>
		</BlueprintProvider>
	);
}
