import { Theme } from "@/themes";
import { Vector2d } from "konva/lib/types";

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
	id: string;
	points: Vector2d[];
	color: keyof typeof Theme.colors;
}
