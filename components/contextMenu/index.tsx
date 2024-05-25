import { IReactChildren } from "@/interfaces/core";
import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import * as RdxContextMenu from "@radix-ui/react-context-menu";
import {
	HorizontalLine,
	IconContainer,
	StyleContent,
	StyleItem,
	StyleLabel,
	StyleSubContentContent,
	StyleSubTrigger,
} from "./styles";
import { Typography } from "@/components/typography";
import { MdCheck, MdChevronRight } from "react-icons/md";
import { Theme } from "@/themes";
import { FaCheck } from "react-icons/fa6";

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
			fontSize={{ xs: "fs50" }}
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
	disabled?: boolean;
	onClick?: () => void;
}

const Item = ({
	text,
	icon,
	disabled = false,
	onClick,
}: IItemProps): ReactElement => (
	<StyleItem
		className="ContextMenuItem"
		disabled={disabled}
		onClick={onClick}
	>
		<div style={{ display: "flex", gap: 5 }}>
			<IconContainer>{icon}</IconContainer>

			<Typography
				tag="p"
				color="gray20"
				fontFamily="roboto"
				fontSize={{ xs: "fs75" }}
				fontWeight="regular"
			>
				{text}
			</Typography>
		</div>
	</StyleItem>
);
Item.displayName = "Item";
ContextMenu.Item = Item;

interface ICheckItemProps {
	text: string;
	isActive?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

const CheckItem = ({
	text,
	onClick,
	isActive = true,
	disabled = false,
}: ICheckItemProps): ReactElement => (
	<StyleItem onClick={onClick} disabled={disabled}>
		<div style={{ display: "flex", gap: 5 }}>
			<IconContainer>{isActive && <FaCheck size={10} />}</IconContainer>

			<Typography
				tag="p"
				color="gray20"
				fontFamily="roboto"
				fontSize={{ xs: "fs75" }}
				fontWeight="regular"
			>
				{text}
			</Typography>
		</div>
	</StyleItem>
);
CheckItem.displayName = "CheckItem";
ContextMenu.CheckItem = CheckItem;

const Sub = ({
	children,
	text,
	icon,
	disabled = false,
}: IReactChildren & IItemProps): ReactElement => (
	<RdxContextMenu.Sub>
		<StyleSubTrigger disabled={disabled}>
			<div style={{ display: "flex", gap: 5 }}>
				<IconContainer>{icon}</IconContainer>

				<Typography
					tag="p"
					color="gray20"
					fontFamily="roboto"
					fontSize={{ xs: "fs75" }}
					fontWeight="regular"
				>
					{text}
				</Typography>
			</div>

			<MdChevronRight size={15} />
		</StyleSubTrigger>

		<RdxContextMenu.Portal>
			<StyleSubContentContent>{children}</StyleSubContentContent>
		</RdxContextMenu.Portal>
	</RdxContextMenu.Sub>
);
Sub.displayName = "Sub";
ContextMenu.Sub = Sub;

const DelimiterLine = (): ReactElement => <HorizontalLine />;
DelimiterLine.displayName = "DelimiterLine";
ContextMenu.DelimiterLine = DelimiterLine;
