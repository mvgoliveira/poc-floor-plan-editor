import { useApp } from "@/hooks/useApp";
import { Theme } from "@/themes";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { ReactElement, useEffect, useState } from "react";
import { Circle, Line, Stage, Text } from "react-konva";

interface IPolygonDrawProps {
	mousePos?: Vector2d | null;
	closed?: boolean;
	drawPos?: Vector2d[];
}

export const PolygonDraw = ({
	mousePos,
	closed = false,
	drawPos = [],
}: IPolygonDrawProps): ReactElement => {
	const { scale, clickPosition } = useApp();
	const { stageRef } = useApp();

	const currentStageRef = stageRef.current;
	const stage = currentStageRef?.getStage();

	const [drawPosition, setDrawPosition] = useState<Vector2d[]>(drawPos);
	const [startedDraw, setStartedDraw] = useState(false);

	const [isClosed, setIsClosed] = useState(closed);

	useEffect(() => {
		if (mousePos && !isClosed) {
			setDrawPosition((prevDrawerPosition) => {
				const newDrawerPosition = [...prevDrawerPosition];
				newDrawerPosition[0] = mousePos;
				return newDrawerPosition;
			});
		}
	}, [mousePos]);

	useEffect(() => {
		if (clickPosition && !isClosed) {
			setDrawPosition((prevState) => [clickPosition, ...prevState]);
			setStartedDraw(true);
		}
	}, [clickPosition]);

	const handleClickCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		e.evt.preventDefault();
		if (index === drawPosition.length - 1 && startedDraw && !isClosed) {
			setIsClosed(true);
			e.target.scale({ x: 1, y: 1 });
			setDrawPosition(drawPosition.slice(1));
		}
	};

	const handleMouseEnterCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (index === drawPosition.length - 1 && startedDraw && !isClosed) {
			e.target.scale({ x: 1.5, y: 1.5 });
		} else if (isClosed) {
			document.body.style.cursor = "grab";
		}
	};

	const handleMouseLeaveCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (index === drawPosition.length - 1 && startedDraw && !isClosed) {
			e.target.scale({ x: 1, y: 1 });
		} else if (isClosed) {
			document.body.style.cursor = "default";
		}
	};

	const handleDragStart = () => {
		document.body.style.cursor = "grabbing";
	};

	const handleDragMove = (e: KonvaEventObject<DragEvent>, index: number) => {
		e.evt.preventDefault();
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage) {
			const newPosition = stage.getRelativePointerPosition();

			if (newPosition) {
				setDrawPosition([
					...drawPosition.slice(0, index),
					newPosition,
					...drawPosition.slice(index + 1),
				]);
			}
		}
	};

	const handleDragEnd = () => {
		document.body.style.cursor = "grab";
	};

	return (
		<>
			{isClosed && (
				<Line
					key={`polygonDrawFill`}
					points={drawPosition.flatMap((obj) => [obj.x, obj.y])}
					fill={Theme.colors.blue80}
					opacity={0.4}
					closed={true}
				/>
			)}

			<Line
				key={`polygonDrawStroke`}
				points={drawPosition.flatMap((obj) => [obj.x, obj.y])}
				stroke={Theme.colors.blue80}
				strokeWidth={2}
				closed={isClosed}
			/>

			{stage &&
				drawPosition.map((pos, idx) => (
					<Circle
						key={`circleDraw-${idx}`}
						x={pos.x}
						y={pos.y}
						radius={6 / scale}
						fill={Theme.colors.blue80}
						stroke={Theme.colors.black}
						strokeWidth={1 / scale}
						onMouseDown={(e) => handleClickCircle(e, idx)}
						onMouseMove={(e) => handleMouseEnterCircle(e, idx)}
						onMouseLeave={(e) => handleMouseLeaveCircle(e, idx)}
						draggable={isClosed}
						onDragStart={handleDragStart}
						onDragMove={(e) => handleDragMove(e, idx)}
						onDragEnd={handleDragEnd}
					/>
				))}
		</>
	);
};
