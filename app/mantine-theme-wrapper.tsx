"use client";

import { IReactChildren } from "@/interfaces/core";
import { createTheme, MantineProvider } from "@mantine/core";
import { ReactElement } from "react";

const theme = createTheme({
	colors: {
		blue: [
			"#e6f2ff",
			"#cee1ff",
			"#9bc0ff",
			"#649dff",
			"#397ffe",
			"#1d6dfe",
			"#0963ff",
			"#0053e4",
			"#004acc",
			"#003fb5",
		],
		yellow: [
			"#fff9e1",
			"#fff2cc",
			"#ffe39b",
			"#ffd464",
			"#ffc738",
			"#ffbf1c",
			"#ffbb09",
			"#e3a400",
			"#ca9100",
			"#af7c00",
		],
		red: [
			"#ffe8ea",
			"#ffcfd1",
			"#ff9ba1",
			"#ff646e",
			"#fe3842",
			"#fe1b27",
			"#ff0918",
			"#e4000c",
			"#cb0009",
			"#b20004",
		],
	},
});

const MatineThemeWrapper = ({ children }: IReactChildren): ReactElement => (
	<MantineProvider theme={theme}>{children}</MantineProvider>
);

export default MatineThemeWrapper;
