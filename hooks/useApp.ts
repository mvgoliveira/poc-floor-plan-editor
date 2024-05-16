import { AppContext } from "@/contexts/appContext";
import { useContext } from "react";

function useApp() {
	return useContext(AppContext);
}

export { useApp };
