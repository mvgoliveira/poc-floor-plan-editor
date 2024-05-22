import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-konva";
import { IDelimitationArea } from "@/interfaces/assets";
import { Theme } from "@/themes";

interface IAssetsProps {
	metadata: IDelimitationArea;
}

export const DelimitationArea = ({ metadata }: IAssetsProps): ReactElement => {
	return (
		<>
			<Line
				points={metadata.points}
				fill={Theme.colors[metadata.color]}
				opacity={0.4}
				closed
			/>
			<Line
				points={metadata.points}
				stroke={Theme.colors[metadata.color]}
				strokeWidth={2}
				closed
			/>
		</>
	);
};
