import styled from "styled-components";

export const Container = styled.button<{
	height: string;
	padding: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ padding }) => padding};
	height: ${({ height }) => height};

	&:hover {
		background: ${({ theme }) => theme.colors.gray100};
	}
`;
