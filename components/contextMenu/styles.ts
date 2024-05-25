import styled from "styled-components";
import {
	Content,
	Item,
	SubContent,
	SubTrigger,
} from "@radix-ui/react-context-menu";

export const StyleContent = styled(Content)`
	z-index: 11;
	background: ${({ theme }) => theme.colors.gray70};
	padding: 5px;
	width: 230px;
	border-radius: 7px;
	border: 1px solid ${({ theme }) => theme.colors.gray50};
`;

export const StyleSubContentContent = styled(SubContent)`
	z-index: 11;
	background: ${({ theme }) => theme.colors.gray70};
	padding: 5px;
	width: 230px;
	margin: 0 8px;
	border-radius: 4px;
	border: 1px solid ${({ theme }) => theme.colors.gray50};
`;

export const StyleLabel = styled.div`
	cursor: default;
	padding: 10px 8px 5px 8px;
`;

export const StyleItem = styled(Item)`
	cursor: pointer;
	outline: none;
	padding: 8px;
	border-radius: 3px;

	svg {
		color: ${({ theme }) => theme.colors.gray20};
	}

	&[data-disabled] {
		cursor: default;

		p {
			color: ${({ theme }) => theme.colors.gray40};
		}

		svg {
			color: ${({ theme }) => theme.colors.gray40};
		}

		&:hover {
			background: transparent;
		}
	}

	&:hover {
		background: ${({ theme }) => theme.colors.gray80};
	}
`;

export const StyleSubTrigger = styled(SubTrigger)`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	outline: none;
	padding: 8px;
	border-radius: 3px;

	svg {
		color: ${({ theme }) => theme.colors.gray20};
	}

	&[data-disabled] {
		cursor: default;

		p {
			color: ${({ theme }) => theme.colors.gray40};
		}

		svg {
			color: ${({ theme }) => theme.colors.gray40};
		}

		&:hover {
			background: transparent;
		}
	}

	&:hover {
		background: ${({ theme }) => theme.colors.gray80};
	}
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 15px;
	height: 15px;
`;

export const HorizontalLine = styled.div`
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray60};
	width: 100%;
	margin-top: 5px;
`;
