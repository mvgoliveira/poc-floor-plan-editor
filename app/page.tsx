"use client";

import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Layer, Rect, Stage, Star } from "react-konva";

export default function Home() {
	const width = 800;
	const height = 500;

	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const stageRef = useRef<Konva.Stage>(null);

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
					let x_position =
						-(mousePointTo.x - pointerPosition.x / newScale) *
						newScale;

					let y_position =
						-(mousePointTo.y - pointerPosition.y / newScale) *
						newScale;

					if (x_position < width - width * newScale) {
						x_position = width - width * newScale;
					}

					if (x_position > 0) {
						x_position = 0;
					}

					if (y_position < height - height * newScale) {
						y_position = height - height * newScale;
					}

					if (y_position > 0) {
						y_position = 0;
					}

					const newPosition = {
						x: x_position,
						y: y_position,
					};

					setScale(newScale);
					setPosition(newPosition);
				}
			}
		}
	};

	const handleDragStage = (e: KonvaEventObject<DragEvent>): void => {
		const x_position = -e.target.x() / scale;
		const y_position = -e.target.y() / scale;

		if (x_position > width - width / scale) {
			e.target.setPosition({
				x: -(width - width / scale) * scale,
				y: e.target.y(),
			});
		}

		if (x_position < 0) {
			e.target.setPosition({ x: 0, y: e.target.y() });
		}

		if (y_position > height - height / scale) {
			e.target.setPosition({
				x: e.target.x(),
				y: -(height - height / scale) * scale,
			});
		}

		if (y_position < 0) {
			e.target.setPosition({ x: e.target.x(), y: 0 });
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
			<div className="flex flex-col">
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
					opacity={0.5}
					onDragMove={handleDragStage}
				>
					<Layer>
						<Rect
							key={1}
							id={"1"}
							x={(0 * (width - 50)) / 100}
							y={(0 * (height - 50)) / 100}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#f8d823"
							opacity={1}
							rotation={0}
							scaleX={1}
							scaleY={1}
							width={50}
							height={50}
						/>
						<Rect
							key={2}
							id={"2"}
							x={(100 * (width - 50)) / 100}
							y={(0 * (height - 50)) / 100}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#f8d823"
							opacity={1}
							rotation={0}
							scaleX={1}
							scaleY={1}
							width={50}
							height={50}
						/>
						<Rect
							key={3}
							id={"3"}
							x={(0 * (width - 50)) / 100}
							y={(100 * (height - 50)) / 100}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#f8d823"
							opacity={1}
							rotation={0}
							scaleX={1}
							scaleY={1}
							width={50}
							height={50}
						/>
						<Rect
							key={4}
							id={"4"}
							x={(100 * (width - 50)) / 100}
							y={(100 * (height - 50)) / 100}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#f8d823"
							opacity={1}
							rotation={0}
							scaleX={1}
							scaleY={1}
							width={50}
							height={50}
						/>
						<Rect
							key={5}
							id={""}
							x={(50 * (width - 50)) / 100}
							y={(50 * (height - 50)) / 100}
							numPoints={5}
							innerRadius={20}
							outerRadius={40}
							fill="#f8d823"
							opacity={1}
							rotation={0}
							scaleX={1}
							scaleY={1}
							width={50}
							height={50}
						/>
					</Layer>
				</Stage>
			</div>
		</main>
	);
}
