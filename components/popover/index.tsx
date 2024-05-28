import { IReactChildren } from "@interfaces/core";
import {
	Root as RadixRoot,
	Trigger as RadixTrigger,
	Portal as RadixPortal,
} from "@radix-ui/react-popover";
import type {
	Root as RadixRootTypes,
	Trigger as RadixTriggerTypes,
} from "@radix-ui/react-popover";
import React, { ComponentProps, ReactElement } from "react";
import { MdClose } from "react-icons/md";

import { PopoverContent, PopoverClose, PopoverArrow } from "./styles";
import { Theme } from "@/themes";

const Popover = ({
	children,
	...props
}: ComponentProps<typeof RadixRootTypes> & IReactChildren): ReactElement => (
	<RadixRoot {...props}>{children}</RadixRoot>
);

const Trigger = ({
	children,
	...props
}: ComponentProps<typeof RadixTriggerTypes> & IReactChildren): ReactElement => (
	<RadixTrigger asChild {...props}>
		{children}
	</RadixTrigger>
);
Trigger.displayName = "Trigger";
Popover.Trigger = Trigger;

export interface IContentProps extends IReactChildren {
	hasCloseIcon?: boolean;
	margin?: string;
	width?: string;
	height?: string;
	side?: "top" | "right" | "bottom" | "left";
	hasArrow?: boolean;
	background?: keyof typeof Theme.colors;
}

const Content = ({
	children,
	hasCloseIcon = true,
	width = "260px",
	height = "fit-content",
	margin = "0",
	side = "bottom",
	hasArrow = true,
	background = "gray90",
}: IContentProps): ReactElement => (
	<RadixPortal>
		<PopoverContent
			side={side}
			$height={height}
			$width={width}
			$margin={margin}
			$background={background}
		>
			{children}
			{hasCloseIcon && (
				<PopoverClose aria-label="Close">
					<MdClose />
				</PopoverClose>
			)}
			{hasArrow && <PopoverArrow />}
		</PopoverContent>
	</RadixPortal>
);
Content.displayName = "Content";
Popover.Content = Content;

export { Popover };
