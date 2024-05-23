import Konva from "konva";
import { Stage } from "konva/lib/Stage";
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
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider(props: AppContextProviderPropsType) {
	const [zoom, setZoom] = useState(0);
	const [scale, setScale] = useState(1);
	const [minScale, setMinScale] = useState(1);
	const [maxScale, setMaxScale] = useState(3);
	const [maxZoom, setMaxZoom] = useState(200);
	const stageRef = useRef<Konva.Stage>(null);
	const [editMode, setEditMode] = useState(true);

	const changeZoomByScale = (scale: number): void => {
		setZoom(
			Math.floor(((scale - minScale) * maxZoom) / (maxScale - minScale))
		);

		setScale(scale);
	};

	const getScaleByZoom = (zoom: number): number => {
		return (Number(zoom) * (maxScale - minScale)) / maxZoom + minScale;
	};

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
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}
