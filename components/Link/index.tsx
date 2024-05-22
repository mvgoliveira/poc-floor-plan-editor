import { ReactElement } from "react";
import { Container } from "./styles";
import { Typography } from "@/components/typography";
import { Theme } from "@/themes";

interface ILinkProps {
	text: string;
	color: keyof typeof Theme.colors;
	onClick?: () => void;
}

export const Link = ({ text, color, onClick }: ILinkProps): ReactElement => {
	return (
		<Container color={color} onClick={onClick}>
			<Typography
				tag="p"
				color={color}
				fontFamily="roboto"
				fontSize={{ xs: "fs50" }}
				fontWeight="regular"
			>
				{text}
			</Typography>
		</Container>
	);
};
