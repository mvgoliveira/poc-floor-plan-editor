import styled from "styled-components";

export const StyledInput = styled.input`
	background: transparent;
	color: ${({ theme }) => theme.colors.white};
	font-size: ${({ theme }) => theme.fontSize.fs75};
	outline: none;
	font-family: ${({ theme }) => theme.fontFamily.roboto};
	width: 100%;

	&::placeholder {
		color: ${({ theme }) => theme.colors.gray30};
	}
`;
