import { DataContext } from "@/contexts/dataContext";
import { useContext } from "react";

function useData() {
	return useContext(DataContext);
}

export { useData };
