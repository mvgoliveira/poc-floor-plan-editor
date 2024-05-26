import { IActionButtonDataProps, IDelimitationArea } from "@/interfaces/assets";
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

type DataContextProviderPropsType = {
	children: ReactNode;
};

type DataContextType = {
	assets: IActionButtonDataProps[];
	delimitationAreas: IDelimitationArea[];
	image: HTMLImageElement | undefined;
	delimiterClosed: boolean;
	setDelimiterClosed: Dispatch<SetStateAction<boolean>>;
	delimiterDraw: IDelimitationArea;
	setDelimiterDraw: Dispatch<SetStateAction<IDelimitationArea>>;
	handleEditDelimitation: () => void;
	handleDeleteDelimitation: () => void;
	setDelimitationAreas: Dispatch<SetStateAction<IDelimitationArea[]>>;
};

export const DataContext = createContext({} as DataContextType);

export function DataContextProvider(props: DataContextProviderPropsType) {
	const { delimiting, handleChangeDelimiting, clickTargetName } =
		useEditorMenu();

	const [delimiterClosed, setDelimiterClosed] = useState(false);

	const [image] = useImage(
		"https://images.adsttc.com/media/images/5e4d/5730/6ee6/7e29/3700/03bc/slideshow/Unit_Kharkiv_Ground_Floor.jpg?1582126824"
	);

	const [assets, setAssets] = useState<IActionButtonDataProps[]>([
		{
			id: uuid(),
			x: 694,
			y: 708,
			devices: [
				{ type: "temperature" },
				{ type: "energy" },
				{ type: "water" },
			],
		},
		{
			id: uuid(),
			x: 590,
			y: 445,
			devices: [{ type: "energy" }],
		},
		{
			id: uuid(),
			x: 912,
			y: 384,
			devices: [{ type: "water" }, { type: "water" }],
		},
	]);

	const [delimitationAreas, setDelimitationAreas] = useState<
		IDelimitationArea[]
	>([
		{
			id: uuid(),
			points: [
				{ x: 797, y: 308 },
				{ x: 1028, y: 308 },
				{ x: 1028, y: 460 },
				{ x: 797, y: 460 },
			],
			color: "blue80",
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
			color: "purple80",
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
			color: "yellow80",
		},
	]);

	const [delimiterDraw, setDelimiterDraw] = useState<IDelimitationArea>({
		id: uuid(),
		color: "blue80",
		points: [],
	});

	const handleEditDelimitation = () => {
		if (!delimiting && clickTargetName.match("DELIMITATION-AREA-")) {
			const index = delimitationAreas.findIndex(
				(delimitationArea) =>
					delimitationArea.id ===
					clickTargetName.replace("DELIMITATION-AREA-", "")
			);

			const delimitationArea = delimitationAreas[index];

			const newDelimitationAreas: IDelimitationArea[] = [
				...delimitationAreas.slice(0, index),
				...delimitationAreas.slice(index + 1),
			];

			setDelimitationAreas(newDelimitationAreas);
			handleChangeDelimiting(true);
			setDelimiterClosed(true);
			setDelimiterDraw({ ...delimitationArea });
		}
	};

	const handleDeleteDelimitation = () => {
		if (!delimiting && clickTargetName.match("DELIMITATION-AREA-")) {
			const index = delimitationAreas.findIndex(
				(delimitationArea) =>
					delimitationArea.id ===
					clickTargetName.replace("DELIMITATION-AREA-", "")
			);

			const newDelimitationAreas: IDelimitationArea[] = [
				...delimitationAreas.slice(0, index),
				...delimitationAreas.slice(index + 1),
			];

			setDelimitationAreas(newDelimitationAreas);
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

	return (
		<DataContext.Provider
			value={{
				assets,
				delimitationAreas,
				image,
				delimiterClosed,
				setDelimiterClosed,
				delimiterDraw,
				setDelimiterDraw,
				handleEditDelimitation,
				handleDeleteDelimitation,
				setDelimitationAreas,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
}
