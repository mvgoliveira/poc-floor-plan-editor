import { Theme } from "@/themes";
import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: scale(0.7);
`;

export const Button = styled.button<{
	padding: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ padding }) => padding};
	background: ${({ theme }) => theme.colors.gray70};
	border-radius: 50%;
	min-width: 90px;
	min-height: 90px;
`;

export const BadgeContainer = styled.div`
	position: absolute;
	z-index: 2;
	top: 5px;
	right: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: ${({ theme }) => theme.colors.gray50};
	border: 3px solid ${({ theme }) => theme.colors.gray70};
	cursor: default;
`;

export const MenuContainer = styled.div`
	flex-direction: column;
	align-items: center;
	justify-content: center;
	pointer-events: all;

	:hover,
	:active,
	:focus {
		outline: none;
	}
`;

export const MenuItem = styled.button<{
	hoverColor: keyof typeof Theme.colors;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.colors.gray70};
	border: 1px solid ${({ theme }) => theme.colors.gray80};
	cursor: default;
	width: 45px;
	height: 45px;
	cursor: pointer;
	transition: 0.06s linear background;

	&:hover {
		background: ${({ theme, hoverColor }) => theme.colors[hoverColor]};
	}

	&:first-of-type {
		border-radius: 5px 5px 0 0;
	}

	&:last-of-type {
		border-radius: 0 0 5px 5px;
	}
`;
