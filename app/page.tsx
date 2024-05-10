"use client";

import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Layer, Stage, Star } from "react-konva";

export default function Home() {
	const [x_position, setX_position] = useState(50);
	const [y_position, setY_position] = useState(50);
	const width = 800;
	const height = 500;

	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const stageRef = useRef<Konva.Stage>(null);

	const handleDragMove = (e: KonvaEventObject<DragEvent>): void => {
		setX_position((e.target.attrs.x * 100) / width);
		setY_position((e.target.attrs.y * 100) / height);
	};

	const handleZoom = (e: KonvaEventObject<WheelEvent>): void => {
		e.evt.preventDefault();
		const currentStageRef = stageRef.current;

		if (currentStageRef) {
			const stage = currentStageRef.getStage();

			if (e.evt.ctrlKey) {
				const oldScale = stage.scaleX();

				const pointerPosition = stage.getPointerPosition();

				if (pointerPosition) {
					const mousePointTo = {
						x: pointerPosition.x / oldScale - stage.x() / oldScale,
						y: pointerPosition.y / oldScale - stage.y() / oldScale,
					};

					const unboundedNewScale = oldScale - e.evt.deltaY * 0.01;
					let newScale = unboundedNewScale;
					if (unboundedNewScale < 1) {
						newScale = 1;
					} else if (unboundedNewScale > 10.0) {
						newScale = 10.0;
					}

					const newPosition = {
						x:
							-(mousePointTo.x - pointerPosition.x / newScale) *
							newScale,
						y:
							-(mousePointTo.y - pointerPosition.y / newScale) *
							newScale,
					};

					setScale(newScale);
					setPosition(newPosition);
				}
			} else {
				const dragDistanceScale = 0.75;
				const newPosition = {
					x: position.x - dragDistanceScale * e.evt.deltaX,
					y: position.y - dragDistanceScale * e.evt.deltaY,
				};

				setPosition(newPosition);
			}
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
			<div className="flex flex-col">
				<p className="text-sm">{`\n\t\t\tX = ${stageRef.current && stageRef.current.getStage().getPointerPosition()?.x}`}</p>
				<p className="text-sm">{`\n\n\t\t\tY = ${y_position}%`}</p>

				<Stage
					width={width}
					height={height}
					className="bg-neutral-900"
					onWheel={handleZoom}
					ref={stageRef}
					x={position.x}
					y={position.y}
					scaleX={scale}
					scaleY={scale}
					draggable
				>
					<Layer>
						<Star
							key={1}
							id={"1"}
							x={(x_position * width) / 100}
							y={height * 0.5}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#3c8676"
							opacity={1}
							draggable
							rotation={0}
							scaleX={1}
							scaleY={1}
							onDragMove={handleDragMove}
						/>
					</Layer>
				</Stage>
			</div>
		</main>
	);
}
