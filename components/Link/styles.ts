import { Theme } from "@/themes";
import styled from "styled-components";

export const Container = styled.div<{ color: keyof typeof Theme.colors }>`
	p {
		line-height: 16px;
		cursor: pointer;
		text-decoration: underline;
	}
`;
