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
	handleChangeDelimiter: (option: boolean) => void;
};

export const EditorMenuContext = createContext({} as EditorMenuContextType);

export function EditorMenuContextProvider(
	props: EditorMenuContextProviderPropsType
) {
	const [hiddenUi, setHiddenUi] = useState(false);
	const [delimiting, setDelimiter] = useState(false);

	const handleChangeDelimiter = (option: boolean) => {
		setDelimiter(option);
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
