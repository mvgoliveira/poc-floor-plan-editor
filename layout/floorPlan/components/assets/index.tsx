import { ReactElement, useEffect, useState } from "react";
import { Group } from "react-konva";
import { AssetButton } from "../assetButton";

interface IAssetsProps {
	data: IActionButtonDataProps[];
}

export const Assets = ({ data }: IAssetsProps): ReactElement => {
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

	useEffect(() => {
		const dataStats = data.map((dataItem) => {
			return getDataStats(dataItem);
		});

		setDataStats(dataStats);
	}, [data]);

	return (
		<>
			{dataStats.map((dataItemStats, idx) => (
				<Group
					x={data[idx].x}
					y={data[idx].y}
					key={`AssetButton-${idx}`}
				>
					<AssetButton dataItemStats={dataItemStats} />
				</Group>
			))}
		</>
	);
};
