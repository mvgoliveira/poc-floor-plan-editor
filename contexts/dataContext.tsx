import { IActionButtonDataProps, TDelimitationArea } from "@/interfaces/assets";
import { v4 as uuid } from "uuid";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import useImage from "use-image";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";

type DataContextProviderPropsType = {
	children: ReactNode;
};

type DataContextType = {
	assets: IActionButtonDataProps[];
	setAssets: Dispatch<SetStateAction<IActionButtonDataProps[]>>;
	delimitationAreas: TDelimitationArea[];
	image: HTMLImageElement | undefined;
	delimiterClosed: boolean;
	setDelimiterClosed: Dispatch<SetStateAction<boolean>>;
	delimiterDraw: TDelimitationArea;
	setDelimiterDraw: Dispatch<SetStateAction<TDelimitationArea>>;
	saveDelimitation: () => void;
	handleEditDelimitation: () => void;
	handleDeleteDelimitation: () => void;
	setDelimitationAreas: Dispatch<SetStateAction<TDelimitationArea[]>>;
	resetVariables: () => void;
	handleCancelDelimitation: () => void;
	getDelimiterColor: (targetName: string) => string | null;
	changeDelimitationColor: (
		delimitationName: string,
		newColor: string
	) => void;
	setDelimiterDrawColor: (value: SetStateAction<string>) => void;
	handleMoveAsset: () => void;
	handleCancelMoveAsset: () => void;
	handleDeleteAsset: () => void;
};

export const DataContext = createContext({} as DataContextType);

export function DataContextProvider(props: DataContextProviderPropsType) {
	const { delimiting, setDelimiting, setAssetMovingId, clickTargetName } =
		useEditorMenu();

	const [delimiterClosed, setDelimiterClosed] = useState(false);

	const [image] = useImage(
		"https://images.adsttc.com/media/images/5e4d/5730/6ee6/7e29/3700/03bc/slideshow/Unit_Kharkiv_Ground_Floor.jpg?1582126824"
	);

	const [assets, setAssets] = useState<IActionButtonDataProps[]>([
		{
			id: uuid(),
			position: {
				x: 694,
				y: 708,
			},
			devices: [
				{
					id: uuid(),
					type: "temperature",
					mac: uuid(),
					name: "device-name",
				},
				{
					id: uuid(),
					type: "energy",
					mac: uuid(),
					name: "device-name",
				},
				{ id: uuid(), type: "water", mac: uuid(), name: "device-name" },
			],
		},
		{
			id: uuid(),
			position: {
				x: 590,
				y: 445,
			},
			devices: [
				{
					id: uuid(),
					type: "energy",
					mac: uuid(),
					name: "device-name",
				},
			],
		},
		{
			id: uuid(),
			position: {
				x: 912,
				y: 384,
			},
			devices: [
				{ id: uuid(), type: "water", mac: uuid(), name: "device-name" },
				{ id: uuid(), type: "water", mac: uuid(), name: "device-name" },
			],
		},
	]);

	const [delimitationAreas, setDelimitationAreas] = useState<
		TDelimitationArea[]
	>([
		{
			id: uuid(),
			points: [
				{ x: 797, y: 308 },
				{ x: 1028, y: 308 },
				{ x: 1028, y: 460 },
				{ x: 797, y: 460 },
			],
			color: Theme.colors.blue70,
		},
		{
			id: uuid(),
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
			color: Theme.colors.purple70,
		},
		{
			id: uuid(),
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
			color: Theme.colors.yellow70,
		},
	]);

	const [delimiterDrawColor, setDelimiterDrawColor] = useState<string>(
		Theme.colors.blue70
	);

	const [delimiterDraw, setDelimiterDraw] = useState<TDelimitationArea>({
		id: uuid(),
		color: delimiterDrawColor,
		points: [],
	});

	const getDelimiterColor = (targetName: string): string | null => {
		if (targetName.startsWith("DELIMITATION-AREA-")) {
			const delimitationArea = delimitationAreas.findLast(
				(delimitationArea) =>
					delimitationArea.id ===
					targetName.replace("DELIMITATION-AREA-", "")
			);

			if (delimitationArea) {
				return delimitationArea.color;
			}
		} else if (
			targetName === "DRAW-FILL" ||
			targetName === "DRAW-STROKE" ||
			targetName === "DRAW-CIRCLE"
		) {
			return delimiterDraw.color;
		}

		return null;
	};

	const changeDelimitationColor = (
		delimitationName: string,
		newColor: string
	) => {
		if (delimitationName.startsWith("DELIMITATION-AREA-")) {
			const index = delimitationAreas.findIndex(
				(delimitationArea) =>
					delimitationArea.id ===
					delimitationName.replace("DELIMITATION-AREA-", "")
			);

			const delimitationArea = delimitationAreas[index];
			delimitationArea.color = newColor;

			const newDelimitationAreas: TDelimitationArea[] = [
				...delimitationAreas.slice(0, index),
				delimitationArea,
				...delimitationAreas.slice(index + 1),
			];

			setDelimitationAreas(newDelimitationAreas);
		}
	};

	const resetVariables = () => {
		setAssetMovingId(null);
		setDelimiting(false);
		setDelimiterClosed(false);
		setDelimiterDraw({
			id: uuid(),
			color: delimiterDrawColor,
			points: [],
		});
	};

	const saveDelimitation = () => {
		setDelimitationAreas((prevState) => [
			...prevState,
			{ ...delimiterDraw },
		]);
		resetVariables();
	};

	const handleEditDelimitation = () => {
		if (!delimiting && clickTargetName.startsWith("DELIMITATION-AREA-")) {
			const index = delimitationAreas.findIndex(
				(delimitationArea) =>
					delimitationArea.id ===
					clickTargetName.replace("DELIMITATION-AREA-", "")
			);

			const delimitationArea = delimitationAreas[index];

			const newDelimitationAreas: TDelimitationArea[] = [
				...delimitationAreas.slice(0, index),
				...delimitationAreas.slice(index + 1),
			];

			setDelimitationAreas(newDelimitationAreas);
			setDelimiting(true);
			setDelimiterClosed(true);
			setDelimiterDraw({ ...delimitationArea });
		}
	};

	const handleDeleteDelimitation = () => {
		if (!delimiting && clickTargetName.startsWith("DELIMITATION-AREA-")) {
			const index = delimitationAreas.findIndex(
				(delimitationArea) =>
					delimitationArea.id ===
					clickTargetName.replace("DELIMITATION-AREA-", "")
			);

			const newDelimitationAreas: TDelimitationArea[] = [
				...delimitationAreas.slice(0, index),
				...delimitationAreas.slice(index + 1),
			];

			setDelimitationAreas(newDelimitationAreas);
		}
	};

	const handleCancelDelimitation = () => {
		resetVariables();
	};

	const handleMoveAsset = () => {
		if (
			clickTargetName.startsWith("ACT-BUTTON-OUTLINE") ||
			clickTargetName.startsWith("ACTION-BUTTON") ||
			clickTargetName.startsWith("BADGE-BUTTON")
		) {
			const id = clickTargetName
				.replace("ACT-BUTTON-OUTLINE-", "")
				.replace("ACTION-BUTTON-", "")
				.replace("BADGE-BUTTON-", "");

			setAssetMovingId(id);
		}
	};

	const handleCancelMoveAsset = () => {
		resetVariables();
	};

	const handleDeleteAsset = () => {
		if (
			clickTargetName.startsWith("ACT-BUTTON-OUTLINE") ||
			clickTargetName.startsWith("ACTION-BUTTON") ||
			clickTargetName.startsWith("BADGE-BUTTON")
		) {
			const clickTargetId = clickTargetName
				.replace("ACT-BUTTON-OUTLINE-", "")
				.replace("ACTION-BUTTON-", "")
				.replace("BADGE-BUTTON-", "");

			const newAssets = assets.filter(
				(asset) => asset.id !== clickTargetId
			);

			setAssets(newAssets);
		}
	};

	useEffect(() => {
		if (delimitationAreas) {
			setDelimiterDraw((prevState) => ({
				...prevState,
				id: uuid(),
			}));
		}
	}, [delimitationAreas]);

	useEffect(() => {
		if (delimiterDrawColor) {
			setDelimiterDraw((prevState) => ({
				...prevState,
				color: delimiterDrawColor,
			}));
		}
	}, [delimiterDrawColor]);

	return (
		<DataContext.Provider
			value={{
				assets,
				setAssets,
				delimitationAreas,
				image,
				delimiterClosed,
				setDelimiterClosed,
				delimiterDraw,
				setDelimiterDraw,
				handleEditDelimitation,
				handleDeleteDelimitation,
				setDelimitationAreas,
				saveDelimitation,
				resetVariables,
				handleCancelDelimitation,
				getDelimiterColor,
				changeDelimitationColor,
				setDelimiterDrawColor,
				handleMoveAsset,
				handleCancelMoveAsset,
				handleDeleteAsset,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
}
