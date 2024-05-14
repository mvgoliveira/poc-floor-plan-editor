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
	width?: string;
}

const Content = ({
	children,
	hasCloseIcon = true,
	width = "260px",
	...props
}: ComponentProps<typeof RadixRootTypes> & IContentProps): ReactElement => (
	<RadixPortal>
		<PopoverContent width={width} {...props}>
			{children}
			{hasCloseIcon && (
				<PopoverClose aria-label="Close">
					<MdClose />
				</PopoverClose>
			)}
			<PopoverArrow />
		</PopoverContent>
	</RadixPortal>
);
Content.displayName = "Content";
Popover.Content = Content;

export { Popover };
