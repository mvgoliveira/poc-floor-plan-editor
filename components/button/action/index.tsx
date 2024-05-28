import { IReactChildren } from "@/interfaces/core";
import {
	BadgeContainer,
	Button,
	Container,
	MenuContainer,
	MenuItem,
} from "./styles";
import { forwardRef, MouseEventHandler, ReactElement } from "react";
import { Center, RingProgress as MantineRingProgress } from "@mantine/core";
import { Typography } from "@/components/typography";
import { Icon } from "@/components/icon";
import { IconType } from "react-icons";
import { Theme } from "@/themes";
import { Popover } from "@/components/popover";

interface IActionButtonProps {
	open: boolean;
	onOpenChange: () => void;
}

export const ActionButton = ({
	children,
	open,
	onOpenChange,
}: IActionButtonProps & IReactChildren): ReactElement => {
	return (
		<Popover open={open} onOpenChange={onOpenChange}>
			<Container>{children}</Container>
		</Popover>
	);
};

interface IRingProgressProps {
	size?: number;
	thickness?: number;
	sections: {
		value: number;
		color: string;
		tooltip?: string;
	}[];
}

const RingProgress = ({
	size = 122,
	thickness = 10,
	children,
	sections,
}: IReactChildren & IRingProgressProps): ReactElement => (
	<Popover.Trigger>
		<MantineRingProgress
			size={size}
			thickness={thickness}
			sections={sections}
			label={<Center>{children}</Center>}
			rootColor="transparent"
		/>
	</Popover.Trigger>
);
RingProgress.displayName = "RingProgress";
ActionButton.RingProgress = RingProgress;

interface ITriggerProps {
	padding?: string;
	onClick?: () => any;
}

const Trigger = forwardRef<HTMLButtonElement, ITriggerProps & IReactChildren>(
	(props, ref): ReactElement => {
		const { padding = "0px", children } = props;

		return (
			<Button $padding={padding} ref={ref} {...props}>
				{children}
			</Button>
		);
	}
);
Trigger.displayName = "Trigger";
ActionButton.Trigger = Trigger;

interface IBadgeProps {
	value: number;
	isHovered?: boolean;
}

const Badge = ({ value, isHovered = false }: IBadgeProps): ReactElement => {
	return (
		<BadgeContainer isHovered={isHovered}>
			<Typography
				tag="p"
				color="white"
				fontFamily="roboto"
				fontSize={{ xs: "fs200" }}
				fontWeight="bold"
			>
				{value}
			</Typography>
		</BadgeContainer>
	);
};
Badge.displayName = "Badge";
ActionButton.Badge = Badge;

const Menu = ({ children }: IReactChildren): ReactElement => {
	return (
		<Popover.Content
			side="left"
			width="45px"
			hasCloseIcon={false}
			hasArrow={false}
			margin="0"
			background="transparent"
		>
			<MenuContainer>{children}</MenuContainer>
		</Popover.Content>
	);
};
Menu.displayName = "Menu";
ActionButton.Menu = Menu;

interface IItemProps {
	icon: IconType;
	size: number;
	hoverColor: keyof typeof Theme.colors;
	onClick?: () => void;
}

const Item = ({
	icon,
	size,
	hoverColor,
	onClick,
}: IItemProps): ReactElement => {
	return (
		<MenuItem hoverColor={hoverColor} onClick={onClick}>
			<Icon Icon={icon} size={size} />
		</MenuItem>
	);
};
Item.displayName = "Item";
Menu.Item = Item;
