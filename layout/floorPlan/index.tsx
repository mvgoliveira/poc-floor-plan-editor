import { useApp } from "@/hooks/useApp";
import { KonvaEventObject } from "konva/lib/Node";
import { KeyboardEvent, useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import { Assets } from "./components/assets";
import { DelimitationArea } from "./components/delimitationArea";
import { ContextMenu } from "@/components/contextMenu";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { PolygonDraw } from "@/components/polygonDraw";
import { Vector2d } from "konva/lib/types";

interface IFloorPlanProps {
	width: number;
	height: number;
}

export function FloorPlan({ width, height }: IFloorPlanProps) {
	const {
		scale,
		changeZoomByScale,
		setMinScale,
		stageRef,
		minScale,
		maxScale,
		assets,
		delimitationAreas,
		image,
		handleStageClick,
		handleOpenContextMenu,
	} = useApp();

	const currentStageRef = stageRef.current;
	const stage = currentStageRef?.getStage();

	const { delimiting, setType, handleGetMenuType, setClickTargetName } =
		useEditorMenu();

	const [limitWidth, setLimitWidth] = useState(0);
	const [limitHeight, setLimitHeight] = useState(0);

	const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);
	const [isCtrlLeftPressed, setIsCtrlLeftPressed] = useState(false);

	const [mousePos, setMousePos] = useState<Vector2d | null>(null);

	useEffect(() => {
		if (image) {
			if (
				image.width < width ||
				image.height < height ||
				(image.width > width && image.height > height)
			) {
				const widthInitialScale = width / image.width;
				const heightInitialScale = height / image.height;

				const minScale = Math.max(
					widthInitialScale,
					heightInitialScale
				);

				setMinScale(minScale);

				setLimitWidth(image.width);
				setLimitHeight(image.height);
			}
			setLimitWidth(image.width);
			setLimitHeight(image.height);
		}
	}, [image, width, height]);

	useEffect(() => {
		if (stage) {
			var oldScale = stage.scaleX();

			const centerX = width / 2;
			const centerY = height / 2;

			const x_position = centerX / oldScale - stage.x() / oldScale;
			const y_position = centerY / oldScale - stage.y() / oldScale;

			const newX = Math.min(
				limitWidth - centerX / scale,
				Math.max(centerX / scale, x_position)
			);

			const newY = Math.min(
				limitHeight - centerY / scale,
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

				var oldScale = stage.scaleX();

				if (pointerPosition) {
					const mousePointTo = {
						x: pointerPosition.x / oldScale - stage.x() / oldScale,
						y:
							pointerPosition.y / stage.scaleY() -
							stage.y() / stage.scaleY(),
					};

					const scrollSpeed = 0.3;

					const unboundedNewScale =
						oldScale - (e.evt.deltaY * scrollSpeed) / 100;

					const newScale = Math.min(
						Math.max(unboundedNewScale, minScale),
						maxScale
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
					changeZoomByScale(newScale);
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
				const oldX = stage.x();
				const oldY = stage.y();
				const newX = Math.max(
					Math.min(0, oldX - e.evt.deltaX / 2),
					width - limitWidth * stage.scaleY()
				);
				const newY = Math.max(
					Math.min(0, oldY - e.evt.deltaY / 2),
					height - limitHeight * stage.scaleX()
				);
				stage.x(newX);
				stage.y(newY);
				stage.batchDraw();
			}
		}
	};

	const handleDragStageStart = (e: KonvaEventObject<DragEvent>) => {
		e.evt.preventDefault();

		if (e.target.name() === "STAGE") {
			if (
				e.evt.buttons === 1 &&
				!isSpaceBarPressed &&
				!isCtrlLeftPressed
			) {
				e.target.stopDrag();
			} else {
				document.body.style.cursor = "grabbing";
			}
		}
	};

	const handleDragStage = (e: KonvaEventObject<DragEvent>): void => {
		e.evt.preventDefault();

		if (e.target.name() === "STAGE") {
			const currentStageRef = stageRef.current;
			const stage = currentStageRef?.getStage();

			if (
				stage &&
				(e.evt.buttons === 4 || isSpaceBarPressed || isCtrlLeftPressed)
			) {
				const newX = -e.target.x() / stage.scaleX();
				const newY = -e.target.y() / stage.scaleY();

				if (newX < 0) {
					e.target.setPosition({ x: 0, y: e.target.y() });
				}

				if (newX > limitWidth - width / stage.scaleX()) {
					e.target.setPosition({
						x:
							-(limitWidth - width / stage.scaleX()) *
							stage.scaleX(),
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
		}
	};

	const handleDragStageEnd = (e: KonvaEventObject<DragEvent>) => {
		if (e.target.name() === "STAGE") {
			if (isSpaceBarPressed || isCtrlLeftPressed) {
				document.body.style.cursor = "grab";
			} else {
				document.body.style.cursor = "default";
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
					? Math.min(Math.max(oldScale * 1.5, minScale), maxScale)
					: Math.min(Math.max(oldScale / 1.5, minScale), maxScale);

			changeZoomByScale(newScale);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.code === "ControlLeft" && !isCtrlLeftPressed) {
			document.body.style.cursor = "grab";
			setIsCtrlLeftPressed(true);
		}
		if (e.code === "Space" && !isSpaceBarPressed) {
			document.body.style.cursor = "grab";
			setIsSpaceBarPressed(true);
		}
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.code === "ControlLeft" && isCtrlLeftPressed) {
			document.body.style.cursor = "default";
			setIsCtrlLeftPressed(false);
		}
		if (e.code === "Space" && isSpaceBarPressed) {
			document.body.style.cursor = "default";
			setIsSpaceBarPressed(false);
		}
	};

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>): void => {
		setMousePos(e.currentTarget.getRelativePointerPosition());
	};

	const handleMouseClick = (e: KonvaEventObject<MouseEvent>): void => {
		if (e.evt.buttons === 1) {
			handleStageClick(
				e.target.name(),
				e.currentTarget.getRelativePointerPosition()
			);
		}
	};

	const handleContextMenu = (e: KonvaEventObject<PointerEvent>) => {
		setClickTargetName(e.target.name());

		handleOpenContextMenu(e.target.name());
	};

	return (
		<div
			tabIndex={1}
			style={{
				outline: "none",
				overflow: "hidden",
			}}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			<ContextMenu content={handleGetMenuType()}>
				<Stage
					name="STAGE"
					width={width}
					height={height}
					onWheel={handleScroll}
					ref={stageRef}
					draggable
					dragDistance={5}
					onDragStart={handleDragStageStart}
					onDragMove={handleDragStage}
					onDragEnd={handleDragStageEnd}
					onMouseMove={handleMouseMove}
					onMouseDown={handleMouseClick}
					onContextMenu={handleContextMenu}
					style={{ background: "rgba(100,100,100, 0.8)" }}
				>
					<Layer>
						{image && (
							<Image
								name="STAGE-IMG"
								key={0}
								x={(limitWidth - Number(image.width)) / 2}
								y={0}
								image={image}
								opacity={0.8}
								onContextMenu={() => setType("stage")}
							/>
						)}

						{delimitationAreas.map((delimitationArea, idx) => (
							<DelimitationArea
								name={`DELIMITATION-AREA-${delimitationArea.id}`}
								metadata={delimitationArea}
								key={`DELIMITATION-AREA-${idx}`}
							/>
						))}

						<Assets data={assets} />

						{delimiting && <PolygonDraw mousePos={mousePos} />}
					</Layer>
				</Stage>
			</ContextMenu>
		</div>
	);
}
