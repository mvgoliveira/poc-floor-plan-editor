"use client";

import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { Html } from "react-konva-utils";

export default function Home() {
	const width = 800;
	const height = 500;

	const stageRef = useRef<Konva.Stage>(null);

	const handleScroll = (e: KonvaEventObject<WheelEvent>): void => {
		e.evt.preventDefault();
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage) {
			if (e.evt.ctrlKey) {
				const pointerPosition = stage.getPointerPosition();

				if (pointerPosition) {
					const mousePointTo = {
						x:
							pointerPosition.x / stage.scaleX() -
							stage.x() / stage.scaleX(),
						y:
							pointerPosition.y / stage.scaleY() -
							stage.y() / stage.scaleY(),
					};

					const scrollSpeed = 1;

					const unboundedNewScale =
						stage.scaleX() - (e.evt.deltaY * scrollSpeed) / 100;

					const newScale = Math.min(
						Math.max(unboundedNewScale, 1),
						10.0
					);

					const x_position = Math.max(
						Math.min(
							-(mousePointTo.x - pointerPosition.x / newScale) *
								newScale,
							0
						),
						width - width * newScale
					);

					const y_position = Math.max(
						Math.min(
							-(mousePointTo.y - pointerPosition.y / newScale) *
								newScale,
							0
						),
						height - height * newScale
					);

					stage.scale({ x: newScale, y: newScale });
					stage.x(x_position);
					stage.y(y_position);
					stage.batchDraw();
				}
			} else if (e.evt.shiftKey) {
				const oldX = stage.x();
				const newX = Math.max(
					Math.min(0, oldX - e.evt.deltaY / 2),
					width - width * stage.scaleX()
				);
				stage.x(newX);
				stage.batchDraw();
			} else {
				const oldY = stage.y();
				const newY = Math.max(
					Math.min(0, oldY - e.evt.deltaY / 2),
					height - height * stage.scaleX()
				);
				stage.y(newY);
				stage.batchDraw();
			}
		}
	};

	const handleDragStage = (e: KonvaEventObject<DragEvent>): void => {
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage) {
			const newX = -e.target.x() / stage.scaleX();
			const newY = -e.target.y() / stage.scaleY();

			if (newX > width - width / stage.scaleX()) {
				e.target.setPosition({
					x: -(width - width / stage.scaleX()) * stage.scaleX(),
					y: e.target.y(),
				});
			}
			if (newX < 0) {
				e.target.setPosition({ x: 0, y: e.target.y() });
			}
			if (newY > height - height / stage.scaleY()) {
				e.target.setPosition({
					x: e.target.x(),
					y: -(height - height / stage.scaleY()) * stage.scaleY(),
				});
			}
			if (newY < 0) {
				e.target.setPosition({ x: e.target.x(), y: 0 });
			}
		}
	};

	const handleZoom = (type: "in" | "out"): void => {
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage) {
			var oldScale = stage.scaleX();

			var newScale =
				type === "in"
					? Math.min(Math.max(oldScale * 1.5, 1), 10.0)
					: Math.min(Math.max(oldScale / 1.5, 1), 10.0);

			const centerX = width / 2;
			const centerY = height / 2;

			const x_position = centerX / oldScale - stage.x() / oldScale;
			const y_position = centerY / oldScale - stage.y() / oldScale;

			const newX = Math.min(
				width - centerX / newScale,
				Math.max(centerX / newScale, x_position)
			);

			const newY = Math.min(
				height - centerY / newScale,
				Math.max(centerY / newScale, y_position)
			);

			stage.scale({ x: newScale, y: newScale });

			var newPos = {
				x: -(newX - centerX / newScale) * newScale,
				y: -(newY - centerY / newScale) * newScale,
			};

			stage.position(newPos);
			stage.batchDraw();
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
			<div className="flex flex-col items-start gap-5">
				<div className="flex gap-1">
					<button
						className="flex items-center justify-center w-6 h-6 rounded-sm bg-indigo-500"
						onClick={() => handleZoom("in")}
					>
						+
					</button>

					<button
						className="flex items-center justify-center w-6 h-6 rounded-sm bg-indigo-500"
						onClick={() => handleZoom("out")}
					>
						-
					</button>
				</div>
				<Stage
					width={width}
					height={height}
					className="bg-neutral-900"
					onWheel={handleScroll}
					ref={stageRef}
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
					</Layer>
				</Stage>
			</div>
		</main>
	);
}
