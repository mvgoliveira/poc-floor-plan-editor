import { ReactElement } from "react";
import { Container } from "./styles";
import { Typography } from "@/components/typography";

interface ISectionListProps {
	sections: string[];
}

export const Breadcrumb = ({ sections }: ISectionListProps): ReactElement => {
	return (
		<Container>
			{sections.map((section, idx) => (
				<>
					{idx !== sections.length - 1 ? (
						<>
							<Typography
								tag="p"
								color="gray30"
								fontFamily="roboto"
								fontSize={{ xs: "fs75" }}
								fontWeight="regular"
							>
								{section}
							</Typography>

							<Typography
								tag="p"
								color="gray30"
								fontFamily="roboto"
								fontSize={{ xs: "fs75" }}
								fontWeight="regular"
							>
								/
							</Typography>
						</>
					) : (
						<Typography
							tag="p"
							color="white"
							fontFamily="roboto"
							fontSize={{ xs: "fs75" }}
							fontWeight="regular"
						>
							{section}
						</Typography>
					)}
				</>
			))}
		</Container>
	);
};
