import { ReactElement } from "react";
import { AssetButton } from "../assetButton";
import { IActionButtonDataProps } from "@/interfaces/assets";

interface IAssetsProps {
	metadata: IActionButtonDataProps[];
}

export const Assets = ({ metadata }: IAssetsProps): ReactElement => {
	return (
		<>
			{metadata.map((actionButtonData) => (
				<AssetButton
					key={`ASSET-BUTTON-${actionButtonData.id}`}
					metadata={actionButtonData}
				/>
			))}
		</>
	);
};
