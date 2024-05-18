import { Theme } from "@/themes";
import { IconType } from "react-icons";

interface IconProps {
	Icon: IconType;
	size?: number;
	color?: keyof typeof Theme.colors;
}

const Icon: React.FC<IconProps> = ({ Icon, size = 24, color = "white" }) => {
	return <Icon size={size} color={Theme.colors[color]} />;
};

export default Icon;
