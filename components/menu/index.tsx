import { ReactElement } from "react";
import { IconType } from "react-icons";
import Icon from "@/components/icon";
import { Container } from "./styles";

interface IStageMenuProps {
	options: {
		text: string;
		icon: {
			name: IconType;
			size: number;
		};
	}[];
}

export const Menu = ({ options }: IStageMenuProps): ReactElement => {
	return (
		<Container>
			{options.map((option) => (
				<Icon Icon={option.icon.name} size={option.icon.size} />
			))}
		</Container>
	);
};
