import { IReactChildren } from "@interfaces/core";
import { Theme } from "@themes/Theme";
import React, { ReactElement } from "react";

import { StyledTypography } from "./styles";

type FontSizeBreakpoints = {
	xs?: keyof typeof Theme.fontSize | undefined;
	sm?: keyof typeof Theme.fontSize | undefined;
	md?: keyof typeof Theme.fontSize | undefined;
	lg?: keyof typeof Theme.fontSize | undefined;
	xl?: keyof typeof Theme.fontSize | undefined;

	xxl?: keyof typeof Theme.fontSize | undefined;
};

export interface ITypography extends IReactChildren {
	tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "pre";
	color?: keyof typeof Theme.colors;
	fontWeight?: "regular" | "medium" | "semibold" | "bold";
	fontSize?: FontSizeBreakpoints;
	fontFamily?: keyof typeof Theme.fontFamily;
	$textAlign?: string;
}

const Typography = ({
	tag = "p",
	color = "white",
	fontWeight = "regular",
	fontFamily = "roboto",
	fontSize = {
		xs: "fs100",
		sm: "fs100",
		md: "fs100",
		lg: "fs100",
		xl: "fs100",
		xxl: "fs100",
	},
	$textAlign = "left",
	children,
}: ITypography): ReactElement => {
	let size: keyof typeof Theme.fontSize | undefined = "fs100";
	const BREAK_POINTS = ["xs", "sm", "md", "lg", "xl", "xxl"];

	// eslint-disable-next-line array-callback-return
	BREAK_POINTS.map((key: string) => {
		if (fontSize[key as keyof typeof fontSize] !== undefined) {
			size = fontSize[key as keyof typeof fontSize];
		} else if (fontSize[key as keyof typeof fontSize] === undefined) {
			// eslint-disable-next-line no-param-reassign
			fontSize[key as keyof typeof fontSize] = size;
		}
	});

	return (
		// @ts-ignore
		<StyledTypography
			tag={tag}
			color={color}
			fontWeight={fontWeight}
			fontFamily={fontFamily}
			$textAlign={$textAlign}
			fontSize={fontSize}
		>
			{children}
		</StyledTypography>
	);
};

export { Typography };
