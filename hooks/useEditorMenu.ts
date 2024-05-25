import { EditorMenuContext } from "@/contexts/editorMenuContext";
import { useContext } from "react";

function useEditorMenu() {
	return useContext(EditorMenuContext);
}

export { useEditorMenu };
