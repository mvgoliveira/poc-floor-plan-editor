import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-konva";
import { TDelimitationArea } from "@/interfaces/assets";
import { Theme } from "@/themes";
import { useEditorMenu } from "@/hooks/useEditorMenu";

interface IAssetsProps {
	metadata: TDelimitationArea;
	name: string;
}

export const DelimitationArea = ({
	metadata,
	name,
}: IAssetsProps): ReactElement => {
	const { setType } = useEditorMenu();

	return (
		<>
			<Line
				points={metadata.points.flatMap((obj) => [obj.x, obj.y])}
				fill={metadata.color}
				opacity={0.4}
				closed
			/>
			<Line
				points={metadata.points.flatMap((obj) => [obj.x, obj.y])}
				stroke={metadata.color}
				strokeWidth={2}
				name={name}
				onContextMenu={() => setType("delimiter")}
				closed
			/>
		</>
	);
};
