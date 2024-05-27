import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { ReactElement } from "react";
import { BiSelection } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import {
	MdDataSaverOn,
	MdDeviceHub,
	MdRefresh,
	MdSelectAll,
	MdZoomIn,
	MdZoomOut,
} from "react-icons/md";
import { RiShape2Line } from "react-icons/ri";
import { TbShapeOff } from "react-icons/tb";

export const EditorDelimitingMenu = (): ReactElement => {
	const { hiddenUi, setHiddenUi, setDelimiting } = useEditorMenu();
	const { handleCancelDelimitation } = useData();

	const handleClickUiVisibility = (): void => {
		setHiddenUi((prevState) => !prevState);
	};

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Delimitação" />

			<ContextMenu.Item
				text="Editar"
				disabled
				icon={<RiShape2Line size={15} />}
			/>

			<ContextMenu.Item
				text="Remover"
				type="danger"
				onClick={handleCancelDelimitation}
				icon={<TbShapeOff size={15} />}
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
					disabled
					icon={<MdDataSaverOn size={15} />}
				/>
				<ContextMenu.Item
					text="Delimitação"
					onClick={() => setDelimiting(true)}
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
