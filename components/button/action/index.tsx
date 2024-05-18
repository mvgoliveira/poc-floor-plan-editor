import { IReactChildren } from "@/interfaces/core";
import {
	BadgeContainer,
	Button,
	Container,
	MenuContainer,
	MenuItem,
} from "./styles";
import { forwardRef, ReactElement } from "react";
import { Center, RingProgress as MantineRingProgress } from "@mantine/core";
import { Typography } from "@/components/typography";
import Icon from "@/components/icon";
import { IconType } from "react-icons";
import { Theme } from "@/themes";

interface IFloatActionButtonProps {
	padding?: string;
	onClick?: () => any;
}

export const ActionButton = ({ children }: IReactChildren): ReactElement => {
	return <Container>{children}</Container>;
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
	<MantineRingProgress
		size={size}
		thickness={thickness}
		sections={sections}
		label={<Center>{children}</Center>}
		rootColor="transparent"
	/>
);
RingProgress.displayName = "RingProgress";
ActionButton.RingProgress = RingProgress;

const Trigger = forwardRef<
	HTMLButtonElement,
	IFloatActionButtonProps & IReactChildren
>((props, ref): ReactElement => {
	const { padding = "0px", children } = props;

	return (
		<Button padding={padding} ref={ref} {...props}>
			{children}
		</Button>
	);
});
Trigger.displayName = "Trigger";
ActionButton.Trigger = Trigger;

interface IBadgeProps {
	value: number;
}

const Badge = ({ value }: IBadgeProps): ReactElement => {
	return (
		<BadgeContainer>
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

interface IMenuProps {
	isOpen?: boolean;
}

const Menu = ({
	children,
	isOpen = true,
}: IReactChildren & IMenuProps): ReactElement => {
	return <MenuContainer isOpen={isOpen}>{children}</MenuContainer>;
};
Menu.displayName = "Menu";
ActionButton.Menu = Menu;

interface IItemProps {
	icon: IconType;
	size: number;
	hoverColor: keyof typeof Theme.colors;
}

const Item = ({ icon, size, hoverColor }: IItemProps): ReactElement => {
	return (
		<MenuItem hoverColor={hoverColor}>
			<Icon Icon={icon} size={size} />
		</MenuItem>
	);
};
Item.displayName = "Item";
Menu.Item = Item;
