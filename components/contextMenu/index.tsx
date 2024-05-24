import { IReactChildren } from "@/interfaces/core";
import { ReactElement } from "react";
import * as RdxContextMenu from "@radix-ui/react-context-menu";
import {
	StyleContent,
	StyleItem,
	StyleLabel,
	StyleSubContentContent,
	StyleSubTrigger,
} from "./styles";
import { Typography } from "@/components/typography";

interface IContextMenuProps {
	content: ReactElement;
}

export const ContextMenu = ({
	children,
	content,
}: IReactChildren & IContextMenuProps): ReactElement => {
	return (
		<RdxContextMenu.Root>
			<RdxContextMenu.Trigger>{children}</RdxContextMenu.Trigger>

			{content}
		</RdxContextMenu.Root>
	);
};

const Content = ({ children }: IReactChildren): ReactElement => (
	<RdxContextMenu.Portal>
		<StyleContent>{children}</StyleContent>
	</RdxContextMenu.Portal>
);
Content.displayName = "Content";
ContextMenu.Content = Content;

interface ILabelProps {
	text: string;
}

const Label = ({ text }: ILabelProps): ReactElement => (
	<StyleLabel>
		<Typography
			tag="p"
			color="gray30"
			fontFamily="roboto"
			fontSize={{ xs: "fs75" }}
			fontWeight="regular"
		>
			{text}
		</Typography>
	</StyleLabel>
);
Label.displayName = "Label";
ContextMenu.Label = Label;

interface IItemProps {
	text: string;
	icon?: ReactElement;
}

const Item = ({ text, icon }: IItemProps): ReactElement => (
	<StyleItem>
		{icon}

		<Typography
			tag="p"
			color="gray30"
			fontFamily="roboto"
			fontSize={{ xs: "fs75" }}
			fontWeight="regular"
		>
			{text}
		</Typography>
	</StyleItem>
);
Item.displayName = "Item";
ContextMenu.Item = Item;

const Sub = ({
	children,
	text,
	icon,
}: IReactChildren & IItemProps): ReactElement => (
	<RdxContextMenu.Sub>
		<StyleSubTrigger>
			{icon}

			<Typography
				tag="p"
				color="gray30"
				fontFamily="roboto"
				fontSize={{ xs: "fs75" }}
				fontWeight="regular"
			>
				{text}
			</Typography>
		</StyleSubTrigger>

		<RdxContextMenu.Portal>
			<StyleSubContentContent>{children}</StyleSubContentContent>
		</RdxContextMenu.Portal>
	</RdxContextMenu.Sub>
);
Sub.displayName = "Sub";
ContextMenu.Sub = Sub;
