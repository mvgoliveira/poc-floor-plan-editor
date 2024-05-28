import { ActionButton } from "@/components/button/action";
import { Drawer } from "@/components/drawer";
import { Icon } from "@/components/icon";
import { useApp } from "@/hooks/useApp";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import {
	DataItemStats,
	IActionButtonDataProps,
	ISectionsProps,
} from "@/interfaces/assets";
import { KonvaEventObject } from "konva/lib/Node";
import { ReactElement, useEffect, useState } from "react";
import { FaFaucetDrip } from "react-icons/fa6";
import { MdBolt, MdDeviceThermostat, MdOutlineDeviceHub } from "react-icons/md";
import { Circle, Group } from "react-konva";
import { Html } from "react-konva-utils";

interface IAssetButtonProps {
	metadata: IActionButtonDataProps;
}

export const AssetButton = ({ metadata }: IAssetButtonProps): ReactElement => {
	const { stageRef } = useApp();
	const { assets, setAssets } = useData();
	const { setType, assetMovingId } = useEditorMenu();

	const currentStageRef = stageRef.current;
	const stage = currentStageRef?.getStage();

	const [isOpen, setIsOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [dataStat, setDataStat] = useState<DataItemStats | null>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [hoverBadge, setHoverBadge] = useState(false);

	const handleSetDataStats = (): void => {
		const itemCounts: Record<string, number> = {};
		const totalCount = metadata.devices.length;

		metadata.devices.forEach((item) => {
			const type = item.type;
			itemCounts[type] = (itemCounts[type] || 0) + 1;
		});

		setDataStat({
			totalCount,
			water: {
				count: itemCounts.water || 0,
				percentage: (itemCounts.water / totalCount) * 100 || 0,
			},
			temperature: {
				count: itemCounts.temperature || 0,
				percentage: (itemCounts.temperature / totalCount) * 100 || 0,
			},
			energy: {
				count: itemCounts.energy || 0,
				percentage: (itemCounts.energy / totalCount) * 100 || 0,
			},
		});
	};

	useEffect(() => {
		handleSetDataStats();
	}, [metadata]);

	useEffect(() => {
		if (assetMovingId && metadata.id === assetMovingId) {
			setIsEditing(true);
		} else {
			setIsEditing(false);
		}
	}, [assetMovingId]);

	const handleDragStart = () => {
		setIsDragging(true);
		document.body.style.cursor = "grabbing";
	};

	const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
		if (stage) {
			const newAssets = assets.map((asset) => {
				if (asset.id === metadata.id)
					return {
						...asset,
						position: { x: e.target.x(), y: e.target.y() },
					};
				return asset;
			});

			setAssets(newAssets);
		}
		setIsDragging(false);
		document.body.style.cursor = "grab";
	};

	const getSectionData = (): ISectionsProps[] => {
		if (dataStat) {
			return [
				{
					value: dataStat.water.percentage,
					color: "blue",
					tooltip: `Água: ${dataStat.water.count} ${dataStat.water.count === 1 ? "dispositivo" : "dispositivos"}`,
				},
				{
					value: dataStat.temperature.percentage,
					color: "red",
					tooltip: `Temperatura: ${dataStat.temperature.count} ${dataStat.temperature.count === 1 ? "dispositivo" : "dispositivos"}`,
				},
				{
					value: dataStat.energy.percentage,
					color: "yellow",
					tooltip: `Energia: ${dataStat.energy.count} ${dataStat.energy.count === 1 ? "dispositivo" : "dispositivos"}`,
				},
			];
		}

		return [];
	};

	const getIcon = (): ReactElement => {
		if (dataStat) {
			if (dataStat.energy.percentage === 100) {
				return <Icon Icon={MdBolt} size={50} />;
			} else if (dataStat.water.percentage === 100) {
				return <Icon Icon={FaFaucetDrip} size={35} />;
			} else if (dataStat.temperature.percentage === 100) {
				return <Icon Icon={MdDeviceThermostat} size={50} />;
			}
		}

		return <Icon Icon={MdOutlineDeviceHub} size={50} />;
	};

	const handleMenuItemClick = () => {
		setIsDrawerOpen(true);
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleMouseEnter = () => {
		if (
			document.body.style.cursor === "default" ||
			!document.body.style.cursor
		) {
			if (isEditing) {
				document.body.style.cursor = "grab";
			} else {
				document.body.style.cursor = "pointer";
			}
		}
	};

	const handleMouseLeave = () => {
		if (
			document.body.style.cursor === "pointer" ||
			document.body.style.cursor === "grabbing" ||
			document.body.style.cursor === "grab"
		) {
			document.body.style.cursor = "default";
		}
	};

	const handleMouseEnterBadge = () => {
		if (
			document.body.style.cursor === "default" ||
			!document.body.style.cursor
		) {
			setHoverBadge(true);

			if (isEditing) {
				document.body.style.cursor = "grab";
			} else {
				document.body.style.cursor = "pointer";
			}
		}
	};

	const handleMouseLeaveBadge = () => {
		if (
			document.body.style.cursor === "pointer" ||
			document.body.style.cursor === "grabbing" ||
			document.body.style.cursor === "grab"
		) {
			document.body.style.cursor = "default";
		}
		setHoverBadge(false);
	};

	const handleClick = (e: KonvaEventObject<MouseEvent>) => {
		if (e.evt.button === 0) {
			if (
				dataStat &&
				dataStat.energy.percentage !== 100 &&
				dataStat.temperature.percentage !== 100 &&
				dataStat.water.percentage !== 100
			) {
				setIsOpen(true);
			} else {
				setIsDrawerOpen(true);
			}
		}
	};

	return (
		<Group
			name={`ASSET-BUTTON-${metadata.id}`}
			x={metadata.position.x}
			y={metadata.position.y}
			offset={{ x: 26 + 35, y: 26 + 35 }}
			draggable={isEditing}
			dragDistance={5}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onContextMenu={() => setType("asset")}
		>
			{dataStat && (
				<>
					<Html>
						<Drawer
							closeIcon
							open={isDrawerOpen}
							onClose={() => setIsDrawerOpen(false)}
						>
							<></>
						</Drawer>
					</Html>

					<Circle
						name={`ACT-BUTTON-OUTLINE-${metadata.id}`}
						x={61}
						y={61}
						radius={40}
						opacity={isEditing ? 0.7 : 0}
						strokeWidth={4}
						stroke={"white"}
					/>

					<Circle
						name={`ACTION-BUTTON-${metadata.id}`}
						x={61}
						y={61}
						radius={34.5}
						opacity={1}
						onClick={!isEditing ? handleClick : () => {}}
						onMouseMove={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>

					<Circle
						name={`BADGE-BUTTON-${metadata.id}`}
						x={61 + 25.2}
						y={61 - 25.2}
						radius={13.5}
						fill={"black"}
						onMouseMove={handleMouseEnterBadge}
						onMouseLeave={handleMouseLeaveBadge}
					/>

					<Html
						divProps={{
							style: {
								pointerEvents: "none",
								borderRadius: "50%",
								opacity: isDragging ? 0.7 : 1,
							},
						}}
					>
						<ActionButton
							open={isOpen}
							onOpenChange={handleCloseMenu}
						>
							<ActionButton.Badge
								value={dataStat.totalCount}
								isHovered={hoverBadge}
							/>
							<ActionButton.RingProgress
								sections={getSectionData()}
							>
								<ActionButton.Trigger>
									{dataStat && getIcon()}
								</ActionButton.Trigger>
							</ActionButton.RingProgress>

							{dataStat.energy.percentage !== 100 &&
								dataStat.temperature.percentage !== 100 &&
								dataStat.water.percentage !== 100 && (
									<ActionButton.Menu>
										{dataStat.water.percentage > 0 && (
											<ActionButton.Menu.Item
												icon={FaFaucetDrip}
												size={18}
												hoverColor="blue70"
												onClick={handleMenuItemClick}
											/>
										)}
										{dataStat.temperature.percentage >
											0 && (
											<ActionButton.Menu.Item
												icon={MdDeviceThermostat}
												size={25}
												hoverColor="red70"
												onClick={handleMenuItemClick}
											/>
										)}
										{dataStat.energy.percentage > 0 && (
											<ActionButton.Menu.Item
												icon={MdBolt}
												size={25}
												hoverColor="yellow70"
												onClick={handleMenuItemClick}
											/>
										)}
									</ActionButton.Menu>
								)}
						</ActionButton>
					</Html>
				</>
			)}
		</Group>
	);
};
