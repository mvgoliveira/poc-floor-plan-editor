import { Typography } from "@/components/typography";
import { Container } from "./styles";
import { MouseEventHandler, ReactElement } from "react";

interface IPrimaryButtonProps {
	text?: string;
	icon?: ReactElement;
	$iconPosition?: "left" | "right";
	height?: string;
	width?: string;
	padding?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

export const PrimaryButton = (props: IPrimaryButtonProps): ReactElement => {
	const {
		height = "100%",
		width = "fit-content",
		padding = "8px 15px",
		$iconPosition = "left",
		icon,
		text,
	} = props;

	return (
		<Container
			$width={width}
			$height={height}
			$padding={padding}
			{...props}
		>
			{$iconPosition === "left" && icon}

			<Typography
				tag="p"
				color="gray10"
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
