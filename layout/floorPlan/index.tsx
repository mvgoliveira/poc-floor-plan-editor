"use client";

import { useApp } from "@/hooks/useApp";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
interface IFloorPlanProps {
	width: number;
	height: number;
}

export default function FloorPlan({ width, height }: IFloorPlanProps) {
	const { scale, setScale, setZoom } = useApp();

	const stageRef = useRef<Konva.Stage>(null);

	const [image] = useImage(
		"https://images.adsttc.com/media/images/5e4d/5730/6ee6/7e29/3700/03bc/slideshow/Unit_Kharkiv_Ground_Floor.jpg?1582126824"
	);

	const [limitWidth, setLimitWidth] = useState(0);
	const [limitHeight, setLimitHeight] = useState(0);

	const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);

	useEffect(() => {
		if (image) {
			image.width < width
				? setLimitWidth(width)
				: setLimitWidth(image.width);

			image.height < height
				? setLimitHeight(height)
				: setLimitHeight(image.height);
		}
	}, [image]);

	useEffect(() => {
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage) {
			var oldScale = stage.scaleX();

			const centerX = width / 2;
			const centerY = height / 2;

			const x_position = centerX / oldScale - stage.x() / oldScale;
			const y_position = centerY / oldScale - stage.y() / oldScale;

			const newX = Math.min(
				width - centerX / scale,
				Math.max(centerX / scale, x_position)
			);

			const newY = Math.min(
				height - centerY / scale,
				Math.max(centerY / scale, y_position)
			);

			stage.scale({ x: scale, y: scale });

			var newPos = {
				x: -(newX - centerX / scale) * scale,
				y: -(newY - centerY / scale) * scale,
			};

			stage.position(newPos);
			stage.batchDraw();
		}
	}, [scale]);

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

					const scrollSpeed = 0.3;

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
						width - limitWidth * newScale
					);

					const y_position = Math.max(
						Math.min(
							-(mousePointTo.y - pointerPosition.y / newScale) *
								newScale,
							0
						),
						height - limitHeight * newScale
					);

					stage.scale({ x: newScale, y: newScale });
					setScale(newScale);
					setZoom(Math.floor(((newScale - 1) * 200) / 9));
					stage.x(x_position);
					stage.y(y_position);
					stage.batchDraw();
				}
			} else if (e.evt.shiftKey) {
				const oldX = stage.x();
				const newX = Math.max(
					Math.min(0, oldX - e.evt.deltaY / 2),
					width - limitWidth * stage.scaleX()
				);
				stage.x(newX);
				stage.batchDraw();
			} else {
				const oldY = stage.y();
				const oldX = stage.x();
				const newY = Math.max(
					Math.min(0, oldY - e.evt.deltaY / 2),
					height - limitHeight * stage.scaleX()
				);
				const newX = Math.max(
					Math.min(0, oldX - e.evt.deltaX / 2),
					width - limitWidth * stage.scaleY()
				);
				stage.x(newX);
				stage.y(newY);
				stage.batchDraw();
			}
		}
	};

	const handleDragStageStart = (e: KonvaEventObject<DragEvent>) => {
		e.evt.preventDefault();
		if (e.evt.buttons === 1 && !isSpaceBarPressed) {
			e.target.stopDrag();
		} else {
			document.body.style.cursor = "grabbing";
		}
	};

	const handleDragStage = (e: KonvaEventObject<DragEvent>): void => {
		e.evt.preventDefault();
		const currentStageRef = stageRef.current;
		const stage = currentStageRef?.getStage();

		if (stage && (e.evt.buttons === 4 || isSpaceBarPressed)) {
			const newX = -e.target.x() / stage.scaleX();
			const newY = -e.target.y() / stage.scaleY();

			if (newX < 0) {
				e.target.setPosition({ x: 0, y: e.target.y() });
			}

			if (newX > limitWidth - width / stage.scaleX()) {
				e.target.setPosition({
					x: -(limitWidth - width / stage.scaleX()) * stage.scaleX(),
					y: e.target.y(),
				});
			}

			if (newY < 0) {
				e.target.setPosition({ x: e.target.x(), y: 0 });
			}

			if (newY > limitHeight - height / stage.scaleY()) {
				e.target.setPosition({
					x: e.target.x(),
					y:
						-(limitHeight - height / stage.scaleY()) *
						stage.scaleY(),
				});
			}
		} else {
			e.target.stopDrag();
			e.target.setPosition({
				x: e.target.x() - e.evt.movementX,
				y: e.target.y() - e.evt.movementY,
			});
		}
	};

	const handleDragStageEnd = (e: KonvaEventObject<DragEvent>) => {
		if (isSpaceBarPressed) {
			document.body.style.cursor = "grab";
		} else {
			document.body.style.cursor = "default";
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

	const handleSpaceBarKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.code === "Space" && !isSpaceBarPressed) {
			document.body.style.cursor = "grab";
			setIsSpaceBarPressed(true);
		}
	};

	const handleSpaceBarKeyUp = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.code === "Space" && isSpaceBarPressed) {
			document.body.style.cursor = "default";
			setIsSpaceBarPressed(false);
		}
	};

	return (
		<div
			tabIndex={1}
			style={{
				outline: "none",
			}}
			onKeyDown={handleSpaceBarKeyDown}
			onKeyUp={handleSpaceBarKeyUp}
		>
			<Stage
				width={width}
				height={height}
				onWheel={handleScroll}
				ref={stageRef}
				draggable
				onDragStart={handleDragStageStart}
				onDragMove={handleDragStage}
				onDragEnd={handleDragStageEnd}
				style={{ background: "#fff", opacity: 0.7 }}
			>
				<Layer>
					<Image
						key={2}
						x={(limitWidth - Number(image?.width)) / 2}
						y={0}
						image={image}
					/>
				</Layer>
			</Stage>
		</div>
	);
}
