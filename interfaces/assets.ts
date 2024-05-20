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
