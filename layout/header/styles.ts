import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray70};
`;
