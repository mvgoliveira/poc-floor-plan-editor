import { ReactElement } from "react";
import { AssetButton } from "../assetButton";
import { IActionButtonDataProps } from "@/interfaces/assets";
import { useData } from "@/hooks/useData";
import { NewAssetButton } from "../newAssetButton";

interface IAssetsProps {
	metadata: IActionButtonDataProps[];
}

export const Assets = ({ metadata }: IAssetsProps): ReactElement => {
	const { newAsset } = useData();

	return (
		<>
			{metadata.map((actionButtonData) => (
				<AssetButton
					key={`ASSET-BUTTON-${actionButtonData.id}`}
					metadata={actionButtonData}
				/>
			))}

			{newAsset && <NewAssetButton metadata={newAsset} />}
		</>
	);
};
