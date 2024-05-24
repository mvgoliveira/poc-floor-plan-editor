import { ContextMenu } from "@/components/contextMenu";
import { ReactElement } from "react";

export const EditorMenu = (): ReactElement => (
	<ContextMenu.Content>
		<ContextMenu.Sub text="Inserir...">
			<ContextMenu.Item text="Ativo" />
			<ContextMenu.Item text="Delimitador" />
		</ContextMenu.Sub>
	</ContextMenu.Content>
);
