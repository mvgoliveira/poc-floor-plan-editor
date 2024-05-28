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
import { ReactElement, useEffect, useState } from "react";
import { FaFaucetDrip } from "react-icons/fa6";
import { MdBolt, MdDeviceThermostat, MdOutlineDeviceHub } from "react-icons/md";
import { Circle, Group } from "react-konva";
import { Html } from "react-konva-utils";

interface IAssetButtonProps {
	metadata: IActionButtonDataProps;
}

export const NewAssetButton = ({
	metadata,
}: IAssetButtonProps): ReactElement => {
	const [dataStat, setDataStat] = useState<DataItemStats | null>(null);
	const { mousePosition, clickPosition } = useApp();
	const { handleMoveNewDevice, handleSaveNewDevice } = useData();
	const { setType } = useEditorMenu();

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

	useEffect(() => {
		handleSetDataStats();
	}, [metadata]);

	useEffect(() => {
		if (mousePosition) {
			handleMoveNewDevice(mousePosition);
		}
	}, [mousePosition]);

	useEffect(() => {
		if (clickPosition) {
			handleSaveNewDevice();
		}
	}, [clickPosition]);

	return (
		<Group
			name={`ASSET-BUTTON-${metadata.id}`}
			x={metadata.position.x}
			y={metadata.position.y}
			offset={{ x: 26 + 35, y: 26 + 35 }}
			onContextMenu={() => setType("new-asset")}
		>
			{dataStat && (
				<>
					<Html>
						<Drawer closeIcon open={false} onClose={() => {}}>
							<></>
						</Drawer>
					</Html>

					<Circle
						name={`ACT-BUTTON-OUTLINE-${metadata.id}`}
						x={61}
						y={61}
						radius={40}
						opacity={0}
						strokeWidth={4}
						stroke={"white"}
					/>

					<Circle
						name={`ACTION-BUTTON-${metadata.id}`}
						x={61}
						y={61}
						radius={34.5}
						opacity={1}
					/>

					<Circle
						name={`BADGE-BUTTON-${metadata.id}`}
						x={61 + 25.2}
						y={61 - 25.2}
						radius={13.5}
						fill={"black"}
					/>

					<Html
						divProps={{
							style: {
								pointerEvents: "none",
								borderRadius: "50%",
								opacity: 0.7,
							},
						}}
					>
						<ActionButton open={false} onOpenChange={() => {}}>
							<ActionButton.Badge
								value={dataStat.totalCount}
								isHovered={false}
							/>
							<ActionButton.RingProgress
								sections={getSectionData()}
							>
								<ActionButton.Trigger>
									{dataStat && getIcon()}
								</ActionButton.Trigger>
							</ActionButton.RingProgress>
						</ActionButton>
					</Html>
				</>
			)}
		</Group>
	);
};
