import { Vector2d } from "konva/lib/types";

export interface IDevice {
	id: string;
	mac: string;
	name: string;
	type: "water" | "energy" | "temperature";
}

export interface IActionButtonDataProps {
	id: string;
	position: Vector2d;
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

export type TDelimitationArea = {
	id: string;
	points: Vector2d[];
	color: string;
};
