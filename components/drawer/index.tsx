import type { DrawerProps } from "antd";
import { Drawer as AntdDrawer } from "antd";
import React, { ReactElement, ReactNode } from "react";
import { MdOutlineClose } from "react-icons/md";

import { StyledWrapper } from "./styles";
import { useWindowSize } from "@/hooks/useWindowSize";

export interface IDrawerProps extends DrawerProps {
	children: ReactNode | ReactNode[];
}

const Drawer = ({ children, ...props }: IDrawerProps): ReactElement => {
	const windowsSize = useWindowSize();

	return (
		<StyledWrapper>
			<AntdDrawer
				width={windowsSize.width > 1000 ? "640px" : "100%"}
				height={windowsSize.height > 1000 ? "100%" : "90vh"}
				placement={windowsSize.width > 1000 ? "right" : "bottom"}
				style={{
					background: "#1E1E1E",
				}}
				bodyStyle={{
					padding: "20px",
					overflow: "hidden",
				}}
				headerStyle={{
					display: "none",
				}}
				footerStyle={{
					display: "none",
				}}
				closeIcon={<MdOutlineClose size={22} color="#9E9E9E" />}
				{...props}
			>
				{children}
			</AntdDrawer>
		</StyledWrapper>
	);
};

export { Drawer };
