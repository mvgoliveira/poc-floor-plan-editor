import { EditorMenu } from "@/components/menu/editor";
import { EditorDelimiterColorMenu } from "@/components/menu/editorDelimiterColor";
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
import { EditorDelimitingColorMenu } from "@/components/menu/editorDelimitingColor";

type MenuType =
	| "stage"
	| "delimiter"
	| "delimiter-color"
	| "delimiting"
	| "delimiting-color";

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
	clickTargetColor: string | null;
	setClickTargetColor: Dispatch<SetStateAction<string | null>>;
};

export const EditorMenuContext = createContext({} as EditorMenuContextType);

export function EditorMenuContextProvider(
	props: EditorMenuContextProviderPropsType
) {
	const [type, setType] = useState<MenuType>("stage");
	const [hiddenUi, setHiddenUi] = useState(false);
	const [delimiting, setDelimiting] = useState(false);
	const [clickTargetName, setClickTargetName] = useState("");
	const [clickTargetColor, setClickTargetColor] = useState<string | null>(
		null
	);

	const handleGetMenuType = (): ReactElement => {
		switch (type) {
			case "delimiter":
				return <EditorDelimiterMenu />;

			case "delimiting":
				return <EditorDelimitingMenu />;

			case "delimiter-color":
				return <EditorDelimiterColorMenu />;

			case "delimiting-color":
				return <EditorDelimitingColorMenu />;

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
				clickTargetColor,
				setClickTargetColor,
			}}
		>
			{props.children}
		</EditorMenuContext.Provider>
	);
}
