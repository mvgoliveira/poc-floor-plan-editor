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

export const EditorNewAssetMenu = (): ReactElement => {
	const { handleMoveAsset, handleCreateDevice, handleCancelNewAsset } =
		useData();
	const { hiddenUi, setHiddenUi, setType } = useEditorMenu();

	const handleClickUiVisibility = (): void => {
		setHiddenUi((prevState) => !prevState);
	};

	const handleClickNewDelimiter = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setType("delimiting-color");
	};

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Ativo" />

			<ContextMenu.Item
				text="Mover"
				disabled
				onClick={handleMoveAsset}
				icon={<IoMdMove size={15} />}
			/>

			<ContextMenu.Item
				text="Cancelar"
				type="danger"
				onClick={handleCancelNewAsset}
				icon={<TbDiscOff size={15} />}
			/>

			<ContextMenu.Separator />

			<ContextMenu.Label text="Aplicação" />

			<ContextMenu.Sub
				text="Inserir..."
				disabled
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
