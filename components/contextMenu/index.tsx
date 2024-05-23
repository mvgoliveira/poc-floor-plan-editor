import { IReactChildren } from "@/interfaces/core";
import { ReactElement } from "react";
import * as RdxContextMenu from "@radix-ui/react-context-menu";

export const ContextMenu = ({ children }: IReactChildren): ReactElement => {
	return (
		<RdxContextMenu.Root>
			<RdxContextMenu.Trigger>{children}</RdxContextMenu.Trigger>

			<RdxContextMenu.Portal>
				<RdxContextMenu.Content
					style={{ zIndex: 11 }}
					className="RdxContextMenuContent"
				>
					<div
						style={{
							background: "tomato",
							width: 100,
							height: 150,
						}}
					></div>
				</RdxContextMenu.Content>
			</RdxContextMenu.Portal>
		</RdxContextMenu.Root>
	);
};
