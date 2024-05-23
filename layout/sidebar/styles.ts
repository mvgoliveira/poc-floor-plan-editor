import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	height: 100%;
	width: 300px;
	border-right: 1px solid ${({ theme }) => theme.colors.gray70};
`;

export const SearchBar = styled.div`
	display: flex;
	padding: 15px 18px 14px 15px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray70};
	height: fit-content;
	width: 100%;
	gap: 10px;
`;
