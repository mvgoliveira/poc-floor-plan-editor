import { EditorMenu } from "@/components/menu/editor";
import { EditorDelimiterMenu } from "@/components/menu/editorDelimiter";
import { EditorDelimitingMenu } from "@/components/menu/editorDelimiting";

import {
	createContext,
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type MenuType = "stage" | "delimiter" | "delimiting";

type EditorMenuContextProviderPropsType = {
	children: ReactNode;
};

type EditorMenuContextType = {
	hiddenUi: boolean;
	setHiddenUi: Dispatch<SetStateAction<boolean>>;
	delimiting: boolean;
	setDelimiting: Dispatch<SetStateAction<boolean>>;
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

	const handleGetMenuType = (): ReactElement => {
		switch (type) {
			case "delimiter":
				return <EditorDelimiterMenu />;

			case "delimiting":
				return <EditorDelimitingMenu />;

			default:
				return <EditorMenu />;
		}
	};

	return (
		<EditorMenuContext.Provider
			value={{
				hiddenUi,
				setHiddenUi,
				delimiting,
				setDelimiting,
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
