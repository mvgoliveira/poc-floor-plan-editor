"use client";

import { ActionButton } from "@/components/button/action";
import Icon from "@/components/icon";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FloorPlan } from "@/layout/floorPlan";
import { Header } from "@/layout/header";
import { Sidebar } from "@/layout/sidebar";
import { ReactElement, useEffect, useState } from "react";
import { FaFaucetDrip } from "react-icons/fa6";
import { MdBolt, MdDeviceThermostat, MdOutlineDeviceHub } from "react-icons/md";

interface IDevice {
	type: "water" | "energy" | "temperature";
}

interface IActionButtonDataProps {
	id: string;
	x: number;
	y: number;
	devices: IDevice[];
}

interface ISectionsProps {
	value: number;
	color: string;
	tooltip?: string;
}

type DeviceTypeStats = {
	count: number;
	percentage: number;
};

type DataItemStats = {
	totalCount: number;
	water: DeviceTypeStats;
	energy: DeviceTypeStats;
	temperature: DeviceTypeStats;
};

export default function Home() {
	const { width, height } = useWindowSize();

	const [data, setData] = useState<IActionButtonDataProps[]>([
		{
			id: "1",
			x: 0,
			y: 0,
			devices: [
				{ type: "temperature" },
				{ type: "energy" },
				{ type: "water" },
			],
		},
	]);

	const [dataStats, setDataStats] = useState<DataItemStats[]>([]);

	const getDataStats = (dataItem: IActionButtonDataProps): DataItemStats => {
		const itemCounts: Record<string, number> = {};
		const totalCount = dataItem.devices.length;

		dataItem.devices.forEach((item) => {
			const type = item.type;
			itemCounts[type] = (itemCounts[type] || 0) + 1;
		});

		return {
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
		};
	};

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

	useEffect(() => {
		const dataStats = data.map((dataItem) => {
			return getDataStats(dataItem);
		});

		setDataStats(dataStats);
	}, [data]);

	return (
		<main className="flex min-h-screen h-screen flex-col bg-theme-gray-100">
			<Header />

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Sidebar />
				<FloorPlan width={width - 300} height={height - 50} />
			</div>
		</main>
	);
}
