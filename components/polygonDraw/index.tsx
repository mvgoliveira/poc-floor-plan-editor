import { useApp } from "@/hooks/useApp";
import { Theme } from "@/themes";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { ReactElement, useEffect, useState } from "react";
import { Circle, Line } from "react-konva";

interface IPolygonDrawProps {
	mousePos?: Vector2d | null;
}

export const PolygonDraw = ({ mousePos }: IPolygonDrawProps): ReactElement => {
	const { scale, clickPosition } = useApp();

	const [drawerPosition, setDrawerPosition] = useState<Vector2d[]>([
		{ x: 0, y: 0 },
	]);
	const [startedDraw, setStartedDraw] = useState(false);

	const [isClosed, setIsClosed] = useState(false);

	useEffect(() => {
		if (mousePos && !isClosed) {
			setDrawerPosition((prevDrawerPosition) => {
				const newDrawerPosition = [...prevDrawerPosition];
				newDrawerPosition[0] = mousePos;
				return newDrawerPosition;
			});
		}
	}, [mousePos]);

	useEffect(() => {
		if (clickPosition && !isClosed) {
			setDrawerPosition((prevState) => [clickPosition, ...prevState]);
		}
	}, [clickPosition]);

	const handleClickCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (index === drawerPosition.length - 1 && startedDraw && !isClosed) {
			setIsClosed(true);
			e.target.scale({ x: 1, y: 1 });
			setDrawerPosition(drawerPosition.slice(1));
		} else if (index === drawerPosition.length - 1 && !isClosed) {
			setStartedDraw(true);
		}
	};

	const handleMouseEnterCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (index === drawerPosition.length - 1 && startedDraw && !isClosed) {
			e.target.scale({ x: 1.5, y: 1.5 });
		}
	};

	const handleMouseLeaveCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (index === drawerPosition.length - 1 && startedDraw && !isClosed) {
			console.log(scale);
			e.target.scale({ x: 1, y: 1 });
		}
	};

	return (
		<>
			{isClosed && (
				<Line
					key={`polygonDrawFill`}
					points={drawerPosition.flatMap((obj) => [obj.x, obj.y])}
					fill={Theme.colors.blue80}
					opacity={0.4}
					closed={true}
				/>
			)}

			<Line
				key={`polygonDrawStroke`}
				points={drawerPosition.flatMap((obj) => [obj.x, obj.y])}
				stroke={Theme.colors.blue80}
				strokeWidth={2}
				closed={isClosed}
			/>

			{drawerPosition.map((pos, idx) => (
				<Circle
					key={`circleDraw-${idx}`}
					x={pos.x}
					y={pos.y}
					radius={6 / scale}
					fill={Theme.colors.blue80}
					stroke={Theme.colors.black}
					strokeWidth={1 / scale}
					onClick={(e) => handleClickCircle(e, idx)}
					onMouseMove={(e) => handleMouseEnterCircle(e, idx)}
					onMouseLeave={(e) => handleMouseLeaveCircle(e, idx)}
					// draggable
					// onDragMove={() => {}}
				/>
			))}
		</>
	);
};
