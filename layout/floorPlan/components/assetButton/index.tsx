import { ActionButton } from "@/components/button/action";
import Icon from "@/components/icon";
import { useApp } from "@/hooks/useApp";
import { ReactElement, useEffect, useState } from "react";
import { FaFaucetDrip } from "react-icons/fa6";
import { MdBolt, MdDeviceThermostat, MdOutlineDeviceHub } from "react-icons/md";
import { Circle } from "react-konva";
import { Html } from "react-konva-utils";

interface IAssetButtonProps {
	dataItemStats: DataItemStats;
}

export const AssetButton = ({
	dataItemStats,
}: IAssetButtonProps): ReactElement => {
	const [isOpen, setIsOpen] = useState(false);

	const getSectionData = (dataItemStats: DataItemStats): ISectionsProps[] => {
		return [
			{
				value: dataItemStats.water.percentage,
				color: "blue",
				tooltip: `Água: ${dataItemStats.water.count} ${dataItemStats.water.count === 1 ? "dispositivo" : "dispositivos"}`,
			},
			{
				value: dataItemStats.temperature.percentage,
				color: "red",
				tooltip: `Temperatura: ${dataItemStats.temperature.count} ${dataItemStats.temperature.count === 1 ? "dispositivo" : "dispositivos"}`,
			},
			{
				value: dataItemStats.energy.percentage,
				color: "yellow",
				tooltip: `Energia: ${dataItemStats.energy.count} ${dataItemStats.energy.count === 1 ? "dispositivo" : "dispositivos"}`,
			},
		];
	};

	const getIcon = (dataItemStats: DataItemStats): ReactElement => {
		if (dataItemStats.energy.percentage === 100) {
			return <Icon Icon={MdBolt} size={50} />;
		} else if (dataItemStats.water.percentage === 100) {
			return <Icon Icon={FaFaucetDrip} size={35} />;
		} else if (dataItemStats.temperature.percentage === 100) {
			return <Icon Icon={MdDeviceThermostat} size={50} />;
		} else {
			return <Icon Icon={MdOutlineDeviceHub} size={50} />;
		}
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleMouseEnter = () => {
		if (
			document.body.style.cursor === "default" ||
			!document.body.style.cursor
		) {
			document.body.style.cursor = "pointer";
		}
	};

	const handleMouseLeave = () => {
		if (document.body.style.cursor === "pointer") {
			document.body.style.cursor = "default";
		}
	};

	return (
		<>
			<Circle
				name="actionButton"
				x={61}
				y={61}
				radius={35}
				opacity={0}
				onClick={!isOpen ? handleOpenMenu : () => {}}
				onMouseMove={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>

			<Html
				divProps={{
					style: {
						pointerEvents: "none",
						borderRadius: "50%",
					},
				}}
			>
				<ActionButton open={isOpen} onOpenChange={handleCloseMenu}>
					<ActionButton.Badge value={dataItemStats.totalCount} />
					<ActionButton.RingProgress
						sections={getSectionData(dataItemStats)}
					>
						<ActionButton.Trigger>
							{dataItemStats && getIcon(dataItemStats)}
						</ActionButton.Trigger>
					</ActionButton.RingProgress>

					<ActionButton.Menu>
						<ActionButton.Menu.Item
							icon={FaFaucetDrip}
							size={18}
							hoverColor="blue80"
						/>
						<ActionButton.Menu.Item
							icon={MdDeviceThermostat}
							size={25}
							hoverColor="red80"
						/>
						<ActionButton.Menu.Item
							icon={MdBolt}
							size={25}
							hoverColor="yellow80"
						/>
					</ActionButton.Menu>
				</ActionButton>
			</Html>
		</>
	);
};
