import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
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
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider(props: AppContextProviderPropsType) {
	const [zoom, setZoom] = useState(0);
	const [scale, setScale] = useState(1);

	return (
		<AppContext.Provider value={{ zoom, setZoom, scale, setScale }}>
			{props.children}
		</AppContext.Provider>
	);
}
