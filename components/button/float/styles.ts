import styled, { css } from "styled-components";

interface IStyledFloatButtonProps {
	$height: string;
	$width: string;
	$padding: string;
}

export const StyledFloatButton = styled.button<IStyledFloatButtonProps>`
	${({ theme, $height, $width, $padding }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		background: ${theme.colors.gray70};
		border: 2px solid ${theme.colors.gray80};
		width: ${$width};
		height: ${$height};
		padding: ${$padding};
		border-radius: 5px;
	`}
`;
