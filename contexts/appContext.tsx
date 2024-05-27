import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";
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
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { useData } from "@/hooks/useData";

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
	handleStageClick: (targetName: string, position: Vector2d | null) => void;
	handleOpenContextMenu: (targetName: string) => void;
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider(props: AppContextProviderPropsType) {
	const { delimiting, setClickTargetName, setClickTargetColor } =
		useEditorMenu();

	const {
		saveDelimitation,
		delimiterClosed,
		handleCancelDelimitation,
		getDelimiterColor,
	} = useData();

	const [zoom, setZoom] = useState(0);
	const [scale, setScale] = useState(1);
	const [minScale, setMinScale] = useState(1);
	const [maxScale, setMaxScale] = useState(3);
	const [maxZoom, setMaxZoom] = useState(200);
	const stageRef = useRef<Konva.Stage>(null);
	const [editMode, setEditMode] = useState(true);
	const [clickPosition, setClickPosition] = useState<Vector2d | null>(null);

	const changeZoomByScale = (scale: number): void => {
		setZoom(
			Math.floor(((scale - minScale) * maxZoom) / (maxScale - minScale))
		);

		setScale(scale);
	};

	const getScaleByZoom = (zoom: number): number => {
		return (Number(zoom) * (maxScale - minScale)) / maxZoom + minScale;
	};

	const handleOpenContextMenu = (targetName: string) => {
		if (targetName.match("DELIMITATION-AREA-")) {
			setClickTargetColor(getDelimiterColor(targetName));
		} else {
			setClickTargetColor(null);
		}

		setClickTargetName(targetName);

		if (
			delimiting &&
			delimiterClosed &&
			targetName !== "DRAW-FILL" &&
			targetName !== "DRAW-STROKE" &&
			targetName !== "DRAW-CIRCLE"
		) {
			saveDelimitation();
			setClickPosition(null);
		}
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
			saveDelimitation();
			setClickPosition(null);
		}
	};

	useEffect(() => {
		document.onkeydown = (evt) => {
			evt = evt;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key === "Escape" || evt.key === "Esc";
			}
			if (isEscape) {
				if (delimiting) {
					handleCancelDelimitation();
					setClickPosition(null);
				}
			}
		};
	}, [delimiting]);

	useEffect(() => {
		changeZoomByScale(minScale);
	}, [minScale]);

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
				handleStageClick,
				handleOpenContextMenu,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}
