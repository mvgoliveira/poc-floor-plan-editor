import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type ActionButtonContextProviderPropsType = {
	children: ReactNode;
};

type ActionButtonContextType = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ActionButtonContext = createContext({} as ActionButtonContextType);

export function ActionButtonContextProvider(
	props: ActionButtonContextProviderPropsType
) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<ActionButtonContext.Provider value={{ isOpen, setIsOpen }}>
			{props.children}
		</ActionButtonContext.Provider>
	);
}
