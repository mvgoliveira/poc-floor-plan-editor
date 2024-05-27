import { ContextMenu } from "@/components/contextMenu";
import { useData } from "@/hooks/useData";
import { useEditorMenu } from "@/hooks/useEditorMenu";
import { ReactElement, useEffect, useState } from "react";

export const EditorDelimiterColorMenu = (): ReactElement => {
	const { clickTargetColor, clickTargetName } = useEditorMenu();
	const { changeDelimitationColor } = useData();

	const [selectedColor, setSelectedColor] = useState<string>();

	useEffect(() => {
		if (selectedColor) {
			changeDelimitationColor(clickTargetName, selectedColor);
		}
	}, [selectedColor]);

	const handleCancel = () => {
		if (clickTargetColor) {
			changeDelimitationColor(clickTargetName, clickTargetColor);
		}
	};

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
					onClick={() => {}}
				/>
			</ContextMenu.Buttons>
		</ContextMenu.Content>
	);
};
