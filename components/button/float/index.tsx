import { MouseEventHandler, ReactElement } from "react";
import { StyledFloatButton } from "./styles";

interface IFloatButtonProps {
	icon: ReactElement;
	height?: string;
	width?: string;
	padding?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const FloatButton = ({
	icon,
	width = "40px",
	height = "40px",
	padding = "0",
	onClick = (e: any) => {},
}: IFloatButtonProps): ReactElement => (
	<StyledFloatButton
		$width={width}
		$height={height}
		$padding={padding}
		onClick={onClick}
	>
		{icon}
	</StyledFloatButton>
);
