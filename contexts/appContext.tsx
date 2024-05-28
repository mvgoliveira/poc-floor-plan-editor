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
	const {
		delimiting,
		setClickTargetName,
		setClickTargetColor,
		assetMovingId,
	} = useEditorMenu();

	const {
		saveDelimitation,
		delimiterClosed,
		handleCancelDelimitation,
		getDelimiterColor,
		handleCancelMoveAsset,
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
		setClickPosition(null);
		setClickTargetName(targetName);

		if (
			targetName.startsWith("DELIMITATION-AREA-") ||
			targetName === "DRAW-FILL" ||
			targetName === "DRAW-STROKE" ||
			targetName === "DRAW-CIRCLE"
		) {
			setClickTargetColor(getDelimiterColor(targetName));
		} else {
			setClickTargetColor(null);
		}

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

		if (assetMovingId) {
			const id = targetName
				.replace("ACT-BUTTON-OUTLINE-", "")
				.replace("ACTION-BUTTON-", "")
				.replace("BADGE-BUTTON-", "");

			if (assetMovingId !== id || !id) {
				handleCancelMoveAsset();
				setClickPosition(null);
			}
		}
	};

	useEffect(() => {
		if (delimiting) {
			const handleKeyDown = (evt: KeyboardEvent) => {
				var isEscape = false;
				if ("key" in evt) {
					isEscape = evt.key === "Escape" || evt.key === "Esc";
				}
				if (isEscape) {
					handleCancelDelimitation();
					setClickPosition(null);
				}
				document.removeEventListener("keydown", handleKeyDown);
			};

			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [delimiting]);

	useEffect(() => {
		if (assetMovingId) {
			const handleKeyDown = (evt: KeyboardEvent) => {
				var isEscape = false;
				if ("key" in evt) {
					isEscape = evt.key === "Escape" || evt.key === "Esc";
				}
				if (isEscape) {
					handleCancelMoveAsset();
					setClickPosition(null);
				}
				document.removeEventListener("keydown", handleKeyDown);
			};

			document.addEventListener("keydown", handleKeyDown);

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [assetMovingId]);

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
