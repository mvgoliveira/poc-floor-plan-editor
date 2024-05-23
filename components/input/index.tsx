import { ReactElement } from "react";
import { StyledInput } from "./styles";

interface IInputProps {
	placeholder?: string;
}

export const Input = ({ placeholder = "" }: IInputProps): ReactElement => {
	return <StyledInput type="text" placeholder={placeholder} />;
};
