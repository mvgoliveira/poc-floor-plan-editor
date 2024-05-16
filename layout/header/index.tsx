"use client";

import { Container, Input } from "./styles";
import { PrimaryButton } from "@/components/button/primary";
import { LogoIcon } from "@/assets/svg/icons";
import { Popover } from "@/components/popover";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useApp } from "@/hooks/useApp";

export default function Header() {
	const { zoom, setZoom, setScale } = useApp();
	const [zoomInput, setZoomInput] = useState("0%");

	function inputValidation(e: FormEvent<HTMLInputElement>) {
		e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
	}

	function handleZoomSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (Number(zoomInput) > 200) {
			setZoom(200);
			setZoomInput("200%");
			setScale(10);
		} else if (Number(zoomInput) < 0) {
			setZoom(0);
			setZoomInput("0%");
			setScale(1);
		} else {
			setZoom(Number(zoomInput));
			setZoomInput(`${Number(zoomInput)}%`);
			setScale((Number(zoomInput) * 9) / 200 + 1);
		}
	}

	function handleOpenPopoverChange() {
		setZoomInput(`${zoom}%`);
	}

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
				<Popover onOpenChange={handleOpenPopoverChange}>
					<Popover.Trigger>
						<PrimaryButton
							text={`${zoom}%`}
							iconPosition="right"
							icon={<MdKeyboardArrowDown />}
						/>
					</Popover.Trigger>
					<Popover.Content
						width="200px"
						hasCloseIcon={false}
						margin="0 5px 0 0"
					>
						<form
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								padding: "15px 10px",
								gap: 10,
								height: "100%",
								width: "100%",
							}}
							onSubmit={handleZoomSubmit}
						>
							<Input
								type="text"
								value={zoomInput}
								maxLength={3}
								onChange={(e) => setZoomInput(e.target.value)}
								onInput={inputValidation}
							/>
						</form>
					</Popover.Content>
				</Popover>
			</div>
		</Container>
	);
}
