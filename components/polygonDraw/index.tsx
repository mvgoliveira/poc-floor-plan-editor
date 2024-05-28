import { useApp } from "@/hooks/useApp";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";
import { KonvaEventObject } from "konva/lib/Node";
import { ReactElement, useEffect, useState } from "react";
import { Circle, Line } from "react-konva";

export const PolygonDraw = (): ReactElement => {
	const { scale, clickPosition, mousePosition } = useApp();

	const {
		delimiterClosed,
		setDelimiterClosed,
		delimiterDraw,
		setDelimiterDraw,
	} = useData();

	const { setType } = useEditorMenu();

	const [startedDraw, setStartedDraw] = useState(false);

	useEffect(() => {
		if (mousePosition && !delimiterClosed) {
			setDelimiterDraw((prevState) => {
				const newPoints = [...prevState.points];
				newPoints[0] = mousePosition;
				return { ...prevState, points: newPoints };
			});
		}
	}, [mousePosition]);

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
		const newPoints = [
			...delimiterDraw.points.slice(0, index),
			{ x: e.target.x(), y: e.target.y() },
			...delimiterDraw.points.slice(index + 1),
		];

		setDelimiterDraw({ ...delimiterDraw, points: newPoints });
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
					fill={delimiterDraw.color}
					opacity={0.4}
					closed={true}
					onContextMenu={() => setType("delimiting")}
				/>
			)}

			<Line
				key={`polygonDrawStroke`}
				name="DRAW-STROKE"
				points={delimiterDraw.points.flatMap((obj) => [obj.x, obj.y])}
				stroke={delimiterDraw.color}
				strokeWidth={2}
				closed={delimiterClosed}
				onContextMenu={() => setType("delimiting")}
			/>

			{delimiterDraw.points.map((pos, idx) => (
				<Circle
					key={`circleDraw-${idx}`}
					name="DRAW-CIRCLE"
					x={pos.x}
					y={pos.y}
					radius={6 / scale}
					fill={delimiterDraw.color}
					stroke={Theme.colors.black}
					strokeWidth={1 / scale}
					onMouseDown={(e) => handleClickCircle(e, idx)}
					onMouseMove={(e) => handleMouseEnterCircle(e, idx)}
					onMouseLeave={(e) => handleMouseLeaveCircle(e, idx)}
					draggable={delimiterClosed}
					onDragStart={handleDragStart}
					onDragMove={(e) => handleDragMove(e, idx)}
					onDragEnd={handleDragEnd}
					onContextMenu={() => setType("delimiting")}
				/>
			))}
		</>
	);
};
