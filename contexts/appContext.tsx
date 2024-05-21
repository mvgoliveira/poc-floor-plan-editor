import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useRef,
	useState,
} from "react";

type AppContextProviderPropsType = {
	children: ReactNode;
};

type AppContextType = {
	zoom: number;
	setZoom: Dispatch<SetStateAction<number>>;
	scale: number;
	setScale: Dispatch<SetStateAction<number>>;
	stageRef: RefObject<Stage>;
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider(props: AppContextProviderPropsType) {
	const [zoom, setZoom] = useState(0);
	const [scale, setScale] = useState(1);
	const stageRef = useRef<Konva.Stage>(null);

	return (
		<AppContext.Provider
			value={{ zoom, setZoom, scale, setScale, stageRef }}
		>
			{props.children}
		</AppContext.Provider>
	);
}
