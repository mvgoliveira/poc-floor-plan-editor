import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray70};
`;

export const Input = styled.input`
	width: 150px;
	border-radius: 2px;
	background: transparent;
	outline: 2px solid ${({ theme }) => theme.colors.blue70};
	padding: 5px 8px;
	font-family: ${({ theme }) => theme.fontFamily.roboto};
	font-size: ${({ theme }) => theme.fontSize.fs75};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
	color: ${({ theme }) => theme.colors.gray10};
`;
