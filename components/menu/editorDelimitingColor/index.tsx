import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";

export const EditorDelimitingColorMenu = (): ReactElement => {
	const { setDelimiterDrawColor, handleCancelDelimitation } = useData();
	const { setDelimiting } = useEditorMenu();

	const [selectedColor, setSelectedColor] = useState<string>(
		Theme.colors.blue70
	);

	const handleChoseColor = () => {
		setDelimiterDrawColor(selectedColor);
		setDelimiting(true);
	};

	const handleCancel = () => {
		handleCancelDelimitation();
	};

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Alterar cor" />

			<ContextMenu.ColorPicker
				selectedColor={selectedColor}
				onChange={setSelectedColor}
				swatches={["blue70", "red70", "yellow70"]}
			/>

			<div style={{ padding: "0 8px" }}>
				<ContextMenu.Separator />
			</div>

			<ContextMenu.Buttons>
				<ContextMenu.Buttons.Button
					variant="secondary"
					text="Cancelar"
					onClick={handleCancel}
				/>
				<ContextMenu.Buttons.Button
					variant="primary"
					text="Concluir"
					width="100%"
					onClick={handleChoseColor}
				/>
			</ContextMenu.Buttons>
		</ContextMenu.Content>
	);
};
