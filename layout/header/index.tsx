import { Container, Input } from "./styles";
import { PrimaryButton } from "@/components/button/primary";
import { LogoIcon } from "@/assets/svg/icons";
import { Popover } from "@/components/popover";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Breadcrumb } from "@/components/breadcrumb";
import { Link } from "@/components/Link";
import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";

export function Header() {
	const {
		zoom,
		changeZoomByScale,
		maxScale,
		minScale,
		maxZoom,
		getScaleByZoom,
		editMode,
	} = useApp();
	const [zoomInput, setZoomInput] = useState("0%");

	function inputValidation(e: FormEvent<HTMLInputElement>) {
		e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
	}

	function handleZoomSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (Number(zoomInput) > maxZoom) {
			changeZoomByScale(maxScale);
			setZoomInput(`${maxZoom}%`);
		} else if (Number(zoomInput) < 0) {
			changeZoomByScale(minScale);
			setZoomInput("0%");
		} else {
			changeZoomByScale(getScaleByZoom(Number(zoomInput)));
			setZoomInput(`${Number(zoomInput)}%`);
		}
	}

	function handleOpenPopoverChange() {
		setZoomInput(`${zoom}%`);
	}

	return (
		<ContextMenu
			content={
				<Menu>
					<MenuItem text="Save" />
					<MenuItem text="Save as..." />
					<MenuItem text="Delete..." intent="danger" />
				</Menu>
			}
		>
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
						gap: 12,
					}}
				>
					<Breadcrumb sections={["Projetos", "Rio de Janeiro"]} />

					{!editMode && (
						<Link text="Somente visualização" color="gray30" />
					)}
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
								width="80px"
								text={`${zoom}%`}
								iconPosition="right"
								icon={<MdKeyboardArrowDown color="white" />}
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
									onChange={(e) =>
										setZoomInput(e.target.value)
									}
									onInput={inputValidation}
								/>
							</form>
						</Popover.Content>
					</Popover>
				</div>
			</Container>
		</ContextMenu>
	);
}
