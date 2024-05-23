import { MdCreateNewFolder, MdSearch } from "react-icons/md";
import { Container, SearchBar } from "./styles";
import { Theme } from "@/themes";
import { Input } from "@/components/input";

export function Sidebar() {
	return (
		<Container>
			<SearchBar>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						width: "100%",
					}}
				>
					<MdSearch
						size={20}
						color={Theme.colors.gray10}
						style={{ cursor: "pointer", marginTop: 1 }}
					/>

					<Input placeholder="busque plantas..." />
				</div>

				<div>
					<MdCreateNewFolder
						size={18}
						color={Theme.colors.gray10}
						style={{ cursor: "pointer", marginTop: 1 }}
					/>
				</div>
			</SearchBar>
		</Container>
	);
}
