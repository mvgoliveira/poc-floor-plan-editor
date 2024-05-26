import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";
import { IActionButtonDataProps, IDelimitationArea } from "@/interfaces/assets";
import { v4 as uuid } from "uuid";
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import useImage from "use-image";
import { useEditorMenu } from "@/hooks/useEditorMenu";

type AppContextProviderPropsType = {
	children: ReactNode;
};

type AppContextType = {
	zoom: number;
	scale: number;
	minScale: number;
	setMinScale: Dispatch<SetStateAction<number>>;
	maxScale: number;
	setMaxScale: Dispatch<SetStateAction<number>>;
	maxZoom: number;
	stageRef: RefObject<Stage>;
	changeZoomByScale: (scale: number) => void;
	getScaleByZoom: (zoom: number) => number;
	editMode: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
	clickPosition: Vector2d | null;
	assets: IActionButtonDataProps[];
	delimitationAreas: IDelimitationArea[];
	image: HTMLImageElement | undefined;
	handleStageClick: (targetName: string, position: Vector2d | null) => void;
	delimiterClosed: boolean;
	setDelimiterClosed: Dispatch<SetStateAction<boolean>>;
	delimiterDraw: IDelimitationArea;
	setDelimiterDraw: Dispatch<SetStateAction<IDelimitationArea>>;
	handleEditDelimitation: () => void;
	handleDeleteDelimitation: () => void;
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider(props: AppContextProviderPropsType) {
	const { delimiting, handleChangeDelimiting, clickTargetName } =
		useEditorMenu();

	const [zoom, setZoom] = useState(0);
	const [scale, setScale] = useState(1);
	const [minScale, setMinScale] = useState(1);
	const [maxScale, setMaxScale] = useState(3);
	const [maxZoom, setMaxZoom] = useState(200);
	const stageRef = useRef<Konva.Stage>(null);
	const [editMode, setEditMode] = useState(true);
	const [clickPosition, setClickPosition] = useState<Vector2d | null>(null);
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

	const resetVariables = () => {
		handleChangeDelimiting(false);
		setDelimiterClosed(false);
		setClickPosition(null);
		setDelimiterDraw({
			id: uuid(),
			color: "blue80",
			points: [],
		});
	};

	const changeZoomByScale = (scale: number): void => {
		setZoom(
			Math.floor(((scale - minScale) * maxZoom) / (maxScale - minScale))
		);

		setScale(scale);
	};

	const getScaleByZoom = (zoom: number): number => {
		return (Number(zoom) * (maxScale - minScale)) / maxZoom + minScale;
	};

	const handleStageClick = (
		targetName: string,
		position: Vector2d | null
	) => {
		setClickPosition(position);

		if (
			delimiting &&
			delimiterClosed &&
			targetName !== "DRAW-FILL" &&
			targetName !== "DRAW-STROKE" &&
			targetName !== "DRAW-CIRCLE"
		) {
			setDelimitationAreas((prevState) => [
				...prevState,
				{ ...delimiterDraw },
			]);

			resetVariables();
		}
	};

	const handleEditDelimitation = () => {
		if (!delimiting) {
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
		if (!delimiting) {
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
		} else {
			resetVariables();

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
		changeZoomByScale(minScale);
	}, [minScale]);

	useEffect(() => {
		if (delimitationAreas) {
			setDelimiterDraw((prevState) => ({
				...prevState,
				id: uuid(),
			}));
		}
	}, [delimitationAreas]);

	return (
		<AppContext.Provider
			value={{
				zoom,
				scale,
				stageRef,
				changeZoomByScale,
				maxScale,
				minScale,
				setMaxScale,
				setMinScale,
				maxZoom,
				getScaleByZoom,
				editMode,
				setEditMode,
				clickPosition,
				assets,
				delimitationAreas,
				image,
				delimiterClosed,
				handleStageClick,
				setDelimiterClosed,
				delimiterDraw,
				setDelimiterDraw,
				handleEditDelimitation,
				handleDeleteDelimitation,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}
