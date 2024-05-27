import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";
import {
	MouseEvent,
	MouseEventHandler,
	ReactElement,
	useEffect,
	useState,
} from "react";
import { BiSelection } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import {
	MdDataSaverOn,
	MdDeviceHub,
	MdFormatColorFill,
	MdRefresh,
	MdSelectAll,
	MdZoomIn,
	MdZoomOut,
} from "react-icons/md";
import { RiShape2Line } from "react-icons/ri";
import { TbShapeOff } from "react-icons/tb";

export const EditorDelimiterMenu = (): ReactElement => {
	const { handleEditDelimitation, handleDeleteDelimitation } = useData();

	const { hiddenUi, setHiddenUi, setDelimiting, setType } = useEditorMenu();

	const handleClickUiVisibility = (): void => {
		setHiddenUi((prevState) => !prevState);
	};

	const handleClickChangeColor = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setType("delimiter-color");
	};

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Delimitação" />

			<ContextMenu.Item
				text="Editar"
				onClick={handleEditDelimitation}
				icon={<RiShape2Line size={15} />}
			/>

			<ContextMenu.Item
				text="Alterar cor"
				icon={<MdFormatColorFill size={15} />}
				onClick={handleClickChangeColor}
			/>

			<ContextMenu.Item
				text="Remover"
				type="danger"
				onClick={handleDeleteDelimitation}
				icon={<TbShapeOff size={15} />}
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
