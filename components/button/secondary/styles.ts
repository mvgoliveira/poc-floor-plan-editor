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
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.gray50};
	}

	&:focus {
		outline: 2px solid ${({ theme }) => theme.colors.gray50};
	}
`;
