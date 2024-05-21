import { Theme } from "@/themes";

interface IDevice {
	type: "water" | "energy" | "temperature";
}

export interface IActionButtonDataProps {
	id: string;
	x: number;
	y: number;
	devices: IDevice[];
}

export interface ISectionsProps {
	value: number;
	color: string;
	tooltip?: string;
}

type DeviceTypeStats = {
	count: number;
	percentage: number;
};

export type DataItemStats = {
	totalCount: number;
	water: DeviceTypeStats;
	energy: DeviceTypeStats;
	temperature: DeviceTypeStats;
};

export interface IDelimitationArea {
	points: number[];
	color: keyof typeof Theme.colors;
}
