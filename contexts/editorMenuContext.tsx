import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type EditorMenuContextProviderPropsType = {
	children: ReactNode;
};

type EditorMenuContextType = {
	hiddenUi: boolean;
	setHiddenUi: Dispatch<SetStateAction<boolean>>;
	delimiting: boolean;
	handleChangeDelimiter: (isActive: boolean) => void;
};

export const EditorMenuContext = createContext({} as EditorMenuContextType);

export function EditorMenuContextProvider(
	props: EditorMenuContextProviderPropsType
) {
	const [hiddenUi, setHiddenUi] = useState(false);
	const [delimiting, setDelimiter] = useState(true);

	const handleChangeDelimiter = (isActive: boolean) => {
		if (isActive) {
			setDelimiter(false);
		} else {
			setDelimiter(true);
		}
	};

	return (
		<EditorMenuContext.Provider
			value={{
				hiddenUi,
				setHiddenUi,
				delimiting,
				handleChangeDelimiter,
			}}
		>
			{props.children}
		</EditorMenuContext.Provider>
	);
}
