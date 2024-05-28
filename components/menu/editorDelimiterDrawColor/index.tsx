import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";

export const EditorDelimiterDrawColorMenu = (): ReactElement => {
	const { setDelimiterDrawColor } = useData();
	const { setDelimiting, clickTargetColor } = useEditorMenu();

	const [selectedColor, setSelectedColor] = useState<string>(
		Theme.colors.blue70
	);

	const handleChoseColor = () => {
		setDelimiting(true);
	};

	const handleCancel = () => {
		if (clickTargetColor) {
			setDelimiterDrawColor(clickTargetColor);
		}
	};

	useEffect(() => {
		setDelimiterDrawColor(selectedColor);
	}, [selectedColor]);

	useEffect(() => {
		if (clickTargetColor) {
			setSelectedColor(clickTargetColor);
		}
	}, [clickTargetColor]);

	return (
		<ContextMenu.Content>
			<ContextMenu.Label text="Alterar cor" />

			<ContextMenu.ColorPicker
				defaultColor={clickTargetColor ? clickTargetColor : undefined}
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
