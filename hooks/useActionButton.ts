import { ActionButtonContext } from "@/contexts/actionButtonContext";
import { useContext } from "react";

function useActionButton() {
	return useContext(ActionButtonContext);
}

export { useActionButton };
