import { Typography } from "@/components/typography";
import { Container } from "./styles";
import { forwardRef, MouseEventHandler, ReactElement } from "react";

interface ISecondaryButtonProps {
	text?: string;
	icon?: ReactElement;
	$iconPosition?: "left" | "right";
	height?: string;
	width?: string;
	padding?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export const SecondaryButton = (props: ISecondaryButtonProps): ReactElement => {
	const {
		height = "100%",
		width = "fit-content",
		padding = "8px 15px",
		$iconPosition = "left",
		icon,
		text,
	} = props;

	return (
		<Container width={width} height={height} padding={padding} {...props}>
			{$iconPosition === "left" && icon}

			<Typography
				tag="p"
				color="gray30"
				fontFamily="roboto"
				fontSize={{ xs: "fs75" }}
				fontWeight="regular"
			>
				{text}
			</Typography>

			{$iconPosition === "right" && icon}
		</Container>
	);
};
