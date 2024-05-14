import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 100%;
	border-right: 1px solid ${({ theme }) => theme.colors.gray70};
`;
