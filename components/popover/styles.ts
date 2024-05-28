import { Theme } from "@/themes";
import { Content, Arrow, Close } from "@radix-ui/react-popover";
import styled, { keyframes } from "styled-components";

const slideUpAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(2px);
    }
    
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideRightAndFade = keyframes`
    from {
        transform: translateX(-2px);
    }
    
    to {
		opacity: 1;
        transform: translateX(0);
    }
`;

const slideDownAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(-2px);
    }
    
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideLeftAndFade = keyframes`
    from {
        opacity: 0;
		scale: 0;
        transform: translateX(50px);
    }
    
    to {
        opacity: 1;
		scale: 1;
        transform: translateY(0);
    }
`;

export const PopoverContent = styled(Content)<{
	$width: string;
	$height: string;
	$margin: string;
	$background: keyof typeof Theme.colors;
}>`
	border-radius: 2px;
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height};
	margin: ${({ $margin }) => $margin};
	background: ${({ $background, theme }) => theme.colors[$background]};
	box-shadow:
		hsl(206 22% 7% / 35%) 0 10px 38px -10px,
		hsl(206 22% 7% / 20%) 0 10px 20px -15px;
	animation-duration: 400ms;
	animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
	will-change: transform, opacity;

	&[data-state="open"] {
		&[data-side="top"] {
			animation-name: ${slideUpAndFade};
		}

		&[data-side="right"] {
			animation-name: ${slideRightAndFade};
		}

		&[data-side="bottom"] {
			animation-name: ${slideDownAndFade};
		}

		&[data-side="left"] {
			animation-name: ${slideLeftAndFade};
		}
	}
`;

export const PopoverArrow = styled(Arrow)`
	fill: ${({ theme }) => theme.colors.gray70};
`;

export const PopoverClose = styled(Close)`
	all: unset;
	font-family: inherit;
	border-radius: 100%;
	height: 25px;
	width: 25px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.gray10};
	position: absolute;
	top: 5px;
	right: 5px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.purpleA400};
		cursor: pointer;
	}
`;
