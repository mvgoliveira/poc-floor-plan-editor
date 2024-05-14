"use client";

import { Typography } from "@/components/typography";
import { Container } from "./styles";
import { forwardRef, ReactElement } from "react";

interface IPrimaryButtonProps {
	text?: string;
	icon?: ReactElement;
	iconPosition?: "left" | "right";
	height?: string;
	padding?: string;
	onClick?: () => any;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, IPrimaryButtonProps>(
	(props, ref): ReactElement => {
		const {
			height = "100%",
			padding = "0 15px",
			iconPosition = "left",
			icon,
			text,
		} = props;

		return (
			<Container height={height} padding={padding} ref={ref} {...props}>
				{iconPosition === "left" && icon}

				<Typography
					tag="p"
					color="gray10"
					fontFamily="roboto"
					fontSize={{ xs: "fs75" }}
					fontWeight="regular"
				>
					{text}
				</Typography>

				{iconPosition === "right" && icon}
			</Container>
		);
	}
);
