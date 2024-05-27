import { IReactChildren } from "@/interfaces/core";
import { MouseEventHandler, ReactElement } from "react";
import * as RdxContextMenu from "@radix-ui/react-context-menu";
import { ColorPicker as MantineColorPicker } from "@mantine/core";
import {
	HorizontalLine,
	IconContainer,
	StyleContent,
	StyledButtonsContainer,
	StyledColorPickerContainer,
	StyleItem,
	StyleLabel,
	StyleSubContentContent,
	StyleSubTrigger,
} from "./styles";
import { Typography } from "@/components/typography";
import { MdChevronRight } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Theme } from "@/themes";
import { PrimaryButton } from "../button/primary";
import { SecondaryButton } from "../button/secondary";

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
		<StyleContent data-state="closed">{children}</StyleContent>
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
	type?: "default" | "danger";
	icon?: ReactElement;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Item = ({
	text,
	type = "default",
	icon,
	disabled = false,
	onClick,
}: IItemProps): ReactElement => (
	<StyleItem
		className="ContextMenuItem"
		disabled={disabled}
		onClick={onClick}
		type={type}
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
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	type?: "default" | "danger";
}

const CheckItem = ({
	text,
	onClick,
	isActive = true,
	disabled = false,
	type = "default",
}: ICheckItemProps): ReactElement => (
	<StyleItem onClick={onClick} disabled={disabled} type={type}>
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

interface IColorPickerProps {
	defaultColor?: string;
	selectedColor?: string;
	swatches: (keyof typeof Theme.colors)[];
	onChange: (value: string) => void;
}

const ColorPicker = ({
	defaultColor,
	selectedColor,
	swatches,
	onChange,
}: IColorPickerProps): ReactElement => (
	<StyledColorPickerContainer>
		<MantineColorPicker
			defaultValue={defaultColor}
			value={selectedColor}
			onChange={onChange}
			fullWidth
			size="sm"
			format="hexa"
			swatches={swatches.map((swatch) => Theme.colors[swatch])}
			classNames={{
				body: "cl-picker-body",
			}}
		/>
	</StyledColorPickerContainer>
);
ColorPicker.displayName = "ColorPicker";
ContextMenu.ColorPicker = ColorPicker;

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

const Separator = (): ReactElement => <HorizontalLine />;
Separator.displayName = "Separator";
ContextMenu.Separator = Separator;

const Buttons = ({ children }: IReactChildren): ReactElement => (
	<StyledButtonsContainer>{children}</StyledButtonsContainer>
);
Buttons.displayName = "Buttons";
ContextMenu.Buttons = Buttons;

interface IButtonProps {
	variant: "primary" | "secondary";
	text?: string;
	icon?: ReactElement;
	$iconPosition?: "left" | "right";
	height?: string;
	width?: string;
	padding?: string;
	onClick?: () => any;
}

const Button = (props: IButtonProps): ReactElement => {
	const { variant } = props;

	return (
		<>
			{variant === "primary" && <PrimaryButton {...props} />}

			{variant === "secondary" && <SecondaryButton {...props} />}
		</>
	);
};
Button.displayName = "Button";
Buttons.Button = Button;
