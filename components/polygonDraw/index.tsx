import { useApp } from "@/hooks/useApp";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { ReactElement, useEffect, useState } from "react";
import { Circle, Line } from "react-konva";

interface IPolygonDrawProps {
	mousePos?: Vector2d | null;
}

export const PolygonDraw = ({ mousePos }: IPolygonDrawProps): ReactElement => {
	const {
		scale,
		clickPosition,
		stageRef,
		delimiterClosed,
		setDelimiterClosed,
		delimiterDraw,
		setDelimiterDraw,
	} = useApp();

	const currentStageRef = stageRef.current;
	const stage = currentStageRef?.getStage();

	const [startedDraw, setStartedDraw] = useState(false);

	useEffect(() => {
		if (mousePos && !delimiterClosed) {
			setDelimiterDraw((prevState) => {
				const newPoints = [...prevState.points];
				newPoints[0] = mousePos;
				return { ...prevState, points: newPoints };
			});
		}
	}, [mousePos]);

	useEffect(() => {
		if (clickPosition && !delimiterClosed) {
			setDelimiterDraw((prevState) => ({
				...prevState,
				points: [clickPosition, ...prevState.points],
			}));
			setStartedDraw(true);
		}
	}, [clickPosition]);

	const handleClickCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		e.evt.preventDefault();
		if (
			index === delimiterDraw.points.length - 1 &&
			startedDraw &&
			!delimiterClosed
		) {
			setDelimiterClosed(true);
			e.target.scale({ x: 1, y: 1 });
			const newPoints = delimiterDraw.points.slice(1);
			setDelimiterDraw({ ...delimiterDraw, points: newPoints });
		}
	};

	const handleMouseEnterCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (
			index === delimiterDraw.points.length - 1 &&
			startedDraw &&
			!delimiterClosed
		) {
			e.target.scale({ x: 1.5, y: 1.5 });
		} else if (delimiterClosed) {
			document.body.style.cursor = "grab";
		}
	};

	const handleMouseLeaveCircle = (
		e: KonvaEventObject<MouseEvent>,
		index: number
	) => {
		if (
			index === delimiterDraw.points.length - 1 &&
			startedDraw &&
			!delimiterClosed
		) {
			e.target.scale({ x: 1, y: 1 });
		} else if (delimiterClosed) {
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
				const newPoints = [
					...delimiterDraw.points.slice(0, index),
					newPosition,
					...delimiterDraw.points.slice(index + 1),
				];

				setDelimiterDraw({ ...delimiterDraw, points: newPoints });
			}
		}
	};

	const handleDragEnd = () => {
		document.body.style.cursor = "grab";
	};

	return (
		<>
			{delimiterClosed && (
				<Line
					key="DRAW-FILL"
					name="polygonDrawFill"
					points={delimiterDraw.points.flatMap((obj) => [
						obj.x,
						obj.y,
					])}
					fill={Theme.colors[delimiterDraw.color]}
					opacity={0.4}
					closed={true}
				/>
			)}

			<Line
				key={`polygonDrawStroke`}
				name="DRAW-STROKE"
				points={delimiterDraw.points.flatMap((obj) => [obj.x, obj.y])}
				stroke={Theme.colors[delimiterDraw.color]}
				strokeWidth={2}
				closed={delimiterClosed}
			/>

			{stage &&
				delimiterDraw.points.map((pos, idx) => (
					<Circle
						key={`circleDraw-${idx}`}
						name="DRAW-CIRCLE"
						x={pos.x}
						y={pos.y}
						radius={6 / scale}
						fill={Theme.colors[delimiterDraw.color]}
						stroke={Theme.colors.black}
						strokeWidth={1 / scale}
						onMouseDown={(e) => handleClickCircle(e, idx)}
						onMouseMove={(e) => handleMouseEnterCircle(e, idx)}
						onMouseLeave={(e) => handleMouseLeaveCircle(e, idx)}
						draggable={delimiterClosed}
						onDragStart={handleDragStart}
						onDragMove={(e) => handleDragMove(e, idx)}
						onDragEnd={handleDragEnd}
					/>
				))}
		</>
	);
};
