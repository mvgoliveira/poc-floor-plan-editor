"use client";

import { Container } from "./styles";
import { PrimaryButton } from "@/components/button/primary";
import { LogoIcon } from "@/assets/svg/icons";
import { Popover } from "@/components/popover";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Typography } from "@/components/typography";

export default function Header() {
	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				<PrimaryButton icon={<LogoIcon />} onClick={() => {}} />
				<PrimaryButton text="Início" onClick={() => {}} />
				<PrimaryButton text="Arquivo" onClick={() => {}} />
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				<Popover>
					<Popover.Trigger>
						<PrimaryButton
							text="18%"
							iconPosition="right"
							icon={<MdKeyboardArrowDown />}
						/>
					</Popover.Trigger>
					<Popover.Content width="200px" hasCloseIcon={false}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								padding: "15px 10px",
								gap: 10,
								height: "100%",
								width: "100%",
							}}
						>
							<input
								type="text"
								style={{ width: "150px", borderRadius: 2 }}
							/>
						</div>
					</Popover.Content>
				</Popover>
			</div>
		</Container>
	);
}
