import styled from "styled-components";
import {
	Content,
	Item,
	Separator,
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

export const StyleItem = styled(Item)<{ type: "default" | "danger" }>`
	cursor: pointer;
	outline: none;
	padding: 8px;
	border-radius: 3px;

	p {
		color: ${({ theme, type }) =>
			type === "default" ? theme.colors.gray20 : theme.colors.red90};
	}

	svg {
		color: ${({ theme, type }) =>
			type === "default" ? theme.colors.gray20 : theme.colors.red90};
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
		background: ${({ theme, type }) =>
			type === "default" ? theme.colors.gray80 : theme.colors.red100};
	}
`;

export const StyledColorPickerContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 8px;

	span {
		background: transparent;
	}

	.cl-picker-body {
		padding-top: 10px;
		margin-bottom: 20px;
	}
`;

export const StyledButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	gap: 10px;
	padding: 8px;
	margin-top: 4px;
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

export const HorizontalLine = styled(Separator)`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray60};
	width: 100%;
	margin-top: 5px;
`;
