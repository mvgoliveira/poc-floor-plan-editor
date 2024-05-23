import { Theme } from "@/themes";
import styled from "styled-components";

export const Container = styled.div<{ color: keyof typeof Theme.colors }>`
	p {
		margin-top: 1px;
		cursor: pointer;
		text-decoration: underline;
	}
`;
