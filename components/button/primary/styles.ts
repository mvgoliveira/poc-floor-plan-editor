import { Item } from "@radix-ui/react-context-menu";
import styled from "styled-components";

export const Container = styled(Item)<{
	$height: string;
	$width: string;
	$padding: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ $padding }) => $padding};
	height: ${({ $height }) => $height};
	width: ${({ $width }) => $width};
	background: ${({ theme }) => theme.colors.purple70};
	border-radius: 4px;
	cursor: pointer;

	outline: 2px solid ${({ theme }) => theme.colors.purple70};

	&:hover {
		background: ${({ theme }) => theme.colors.purple60};
	}
`;
