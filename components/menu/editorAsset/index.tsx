import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { MouseEvent, ReactElement } from "react";
import { BiSelection } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoMdMove } from "react-icons/io";
import {
	MdDataSaverOn,
	MdDeviceHub,
	MdRefresh,
	MdSelectAll,
	MdZoomIn,
	MdZoomOut,
} from "react-icons/md";
import { TbDiscOff } from "react-icons/tb";
import { TiCancel } from "react-icons/ti";

export const EditorAssetMenu = (): ReactElement => {
	const { handleMoveAsset, handleDeleteAsset, handleCreateDevice } =
		useData();

	const { hiddenUi, setHiddenUi, setType, assetMovingId, clickTargetName } =
		useEditorMenu();

	const handleClickUiVisibility = (): void => {
		setHiddenUi((prevState) => !prevState);
	};

	const handleClickNewDelimiter = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setType("delimiting-color");
	};

	const getMoveItemOption = (): "Mover" | "Cancelar" => {
		if (assetMovingId) {
			const clickTargetId = clickTargetName
				.replace("ACT-BUTTON-OUTLINE-", "")
				.replace("ACTION-BUTTON-", "")
				.replace("BADGE-BUTTON-", "");

			if (clickTargetId === assetMovingId) {
				return "Cancelar";
			}
		}
		return "Mover";
	};

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Ativo" />

			<ContextMenu.Item
				text={getMoveItemOption()}
				onClick={handleMoveAsset}
				icon={
					getMoveItemOption() === "Mover" ? (
						<IoMdMove size={15} />
					) : (
						<TiCancel size={15} />
					)
				}
			/>

			<ContextMenu.Item
				text="Remover"
				type="danger"
				onClick={handleDeleteAsset}
				icon={<TbDiscOff size={15} />}
			/>

			<ContextMenu.Separator />

			<ContextMenu.Label text="Aplicação" />

			<ContextMenu.Sub
				text="Inserir..."
				icon={<HiOutlineViewGridAdd size={15} />}
			>
				<ContextMenu.Item
					text="Ativo"
					disabled
					icon={<MdDeviceHub size={15} />}
				/>
				<ContextMenu.Item
					text="Dispositivo"
					onClick={() => handleCreateDevice()}
					icon={<MdDataSaverOn size={15} />}
				/>
				<ContextMenu.Item
					text="Delimitação"
					onClick={handleClickNewDelimiter}
					icon={<BiSelection size={15} />}
				/>
			</ContextMenu.Sub>

			<ContextMenu.Item
				text="Selecione tudo"
				disabled
				icon={<MdSelectAll size={15} />}
			/>

			<ContextMenu.Item
				text="Recarregar"
				disabled
				icon={<MdRefresh size={15} />}
			/>

			<ContextMenu.Separator />

			<ContextMenu.Label text="Layout" />

			<ContextMenu.CheckItem
				text="Mostrar UI"
				isActive={!hiddenUi}
				onClick={handleClickUiVisibility}
			/>
			<ContextMenu.Item
				text="Ampliar"
				disabled
				icon={<MdZoomIn size={15} />}
			/>
			<ContextMenu.Item
				text="Reduzir"
				disabled
				icon={<MdZoomOut size={15} />}
			/>
		</ContextMenu.Content>
	);
};
