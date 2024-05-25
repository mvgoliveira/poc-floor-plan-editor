import { useApp } from "@/hooks/useApp";
import { KonvaEventObject } from "konva/lib/Node";
import { KeyboardEvent, useEffect, useState } from "react";
import { Image, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";
import { Assets } from "./components/assets";
import { DelimitationArea } from "./components/delimitationArea";
import { IActionButtonDataProps, IDelimitationArea } from "@/interfaces/assets";
import { ContextMenu } from "@/components/contextMenu";
import { EditorMenu } from "@/components/menu/editor";
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
		setClickPosition,
	} = useApp();

	const currentStageRef = stageRef.current;
	const stage = currentStageRef?.getStage();

	const { delimiting } = useEditorMenu();

	const [assets, setAssets] = useState<IActionButtonDataProps[]>([
		{
			id: "1",
			x: 694,
			y: 708,
			devices: [
				{ type: "temperature" },
				{ type: "energy" },
				{ type: "water" },
			],
		},
		{
			id: "2",
			x: 590,
			y: 445,
			devices: [{ type: "energy" }],
		},
		{
			id: "3",
			x: 912,
			y: 384,
			devices: [{ type: "water" }, { type: "water" }],
		},
	]);

	const [delimitationAreas, setDelimitationAreas] = useState<
		IDelimitationArea[]
	>([
		{
			points: [
				{ x: 797, y: 308 },
				{ x: 1028, y: 308 },
				{ x: 1028, y: 460 },
				{ x: 797, y: 460 },
			],
			color: "blue80",
			isEditing: false,
		},
		{
			points: [
				{ x: 493, y: 811 },
				{ x: 934, y: 811 },
				{ x: 934, y: 671 },
				{ x: 880, y: 671 },
				{ x: 880, y: 603 },
				{ x: 537, y: 603 },
				{ x: 537, y: 561 },
				{ x: 421, y: 561 },
				{ x: 419, y: 625 },
				{ x: 491, y: 625 },
				{ x: 491, y: 810 },
			],
			color: "purple80",
			isEditing: false,
		},
		{
			points: [
				{ x: 419, y: 498.28125 },
				{ x: 701, y: 498.28125 },
				{ x: 701, y: 511.28125 },
				{ x: 760, y: 514.28125 },
				{ x: 760, y: 390.28125 },
				{ x: 443, y: 391.28125 },
				{ x: 443, y: 427.28125 },
				{ x: 415, y: 428.28125 },
			],
			color: "yellow80",
			isEditing: false,
		},
	]);

	const [image] = useImage(
		"https://images.adsttc.com/media/images/5e4d/5730/6ee6/7e29/3700/03bc/slideshow/Unit_Kharkiv_Ground_Floor.jpg?1582126824"
	);

	const [limitWidth, setLimitWidth] = useState(0);
	const [limitHeight, setLimitHeight] = useState(0);

	const [isSpaceBarPressed, setIsSpaceBarPressed] = useState(false);

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

		if (e.target.id() === "STAGE") {
			if (e.evt.buttons === 1 && !isSpaceBarPressed) {
				e.target.stopDrag();
			} else {
				document.body.style.cursor = "grabbing";
			}
		}
	};

	const handleDragStage = (e: KonvaEventObject<DragEvent>): void => {
		e.evt.preventDefault();

		if (e.target.id() === "STAGE") {
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
				console.log("exec");
				e.target.stopDrag();
				e.target.setPosition({
					x: e.target.x() - e.evt.movementX,
					y: e.target.y() - e.evt.movementY,
				});
			}
		}
	};

	const handleDragStageEnd = (e: KonvaEventObject<DragEvent>) => {
		if (e.target.id() === "STAGE") {
			if (isSpaceBarPressed) {
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

	const handleMouseMove = (e: KonvaEventObject<MouseEvent>): void => {
		setMousePos(e.currentTarget.getRelativePointerPosition());
	};

	const handleMouseClick = (e: KonvaEventObject<MouseEvent>): void => {
		if (e.evt.buttons === 1) {
			setClickPosition(e.currentTarget.getRelativePointerPosition());
		}
	};

	return (
		<div
			tabIndex={1}
			style={{
				outline: "none",
				overflow: "hidden",
			}}
			onKeyDown={handleSpaceBarKeyDown}
			onKeyUp={handleSpaceBarKeyUp}
		>
			<ContextMenu content={<EditorMenu />}>
				<Stage
					id="STAGE"
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
					style={{ background: "rgba(100,100,100, 0.8)" }}
				>
					<Layer>
						{image && (
							<Image
								key={0}
								x={(limitWidth - Number(image.width)) / 2}
								y={0}
								image={image}
								opacity={0.8}
							/>
						)}

						{delimitationAreas.map((delimitationArea) =>
							!delimitationArea.isEditing ? (
								<DelimitationArea metadata={delimitationArea} />
							) : (
								<PolygonDraw
									mousePos={mousePos}
									drawPos={delimitationArea.points}
									closed
								/>
							)
						)}

						<Assets data={assets} />

						{delimiting && <PolygonDraw mousePos={mousePos} />}
					</Layer>
				</Stage>
			</ContextMenu>
		</div>
	);
}
