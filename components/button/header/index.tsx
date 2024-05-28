import { Typography } from "@/components/typography";
import { Container } from "./styles";
import { forwardRef, ReactElement } from "react";

interface IHeaderButtonProps {
	text?: string;
	icon?: ReactElement;
	$iconPosition?: "left" | "right";
	height?: string;
	width?: string;
	padding?: string;
	onClick?: () => any;
}

export const HeaderButton = forwardRef<HTMLButtonElement, IHeaderButtonProps>(
	(props, ref): ReactElement => {
		const {
			height = "100%",
			width = "100%",
			padding = "0 15px",
			$iconPosition = "left",
			icon,
			text,
		} = props;

		return (
			<Container
				$width={width}
				$height={height}
				$padding={padding}
				ref={ref}
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
	}
);
