import { EditorMenu } from "@/components/menu/editor";
import { EditorDelimiterMenu } from "@/components/menu/editorDelimiter";

import {
	createContext,
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type MenuType = "stage" | "delimiter";

type EditorMenuContextProviderPropsType = {
	children: ReactNode;
};

type EditorMenuContextType = {
	hiddenUi: boolean;
	setHiddenUi: Dispatch<SetStateAction<boolean>>;
	delimiting: boolean;
	handleChangeDelimiting: (option: boolean) => void;
	setType: Dispatch<SetStateAction<MenuType>>;
	handleGetMenuType: () => ReactElement;
	clickTargetName: string;
	setClickTargetName: Dispatch<SetStateAction<string>>;
};

export const EditorMenuContext = createContext({} as EditorMenuContextType);

export function EditorMenuContextProvider(
	props: EditorMenuContextProviderPropsType
) {
	const [type, setType] = useState<MenuType>("stage");
	const [hiddenUi, setHiddenUi] = useState(false);
	const [delimiting, setDelimiting] = useState(false);
	const [clickTargetName, setClickTargetName] = useState("");

	const handleChangeDelimiting = (option: boolean) => {
		setDelimiting(option);
	};

	const handleGetMenuType = (): ReactElement => {
		if (type === "delimiter") {
			return <EditorDelimiterMenu />;
		}
		return <EditorMenu />;
	};

	return (
		<EditorMenuContext.Provider
			value={{
				hiddenUi,
				setHiddenUi,
				delimiting,
				handleChangeDelimiting,
				setType,
				handleGetMenuType,
				clickTargetName,
				setClickTargetName,
			}}
		>
			{props.children}
		</EditorMenuContext.Provider>
	);
}
