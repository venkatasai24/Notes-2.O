import React from "react";
import { Themecontext } from "./App";
import { useContext } from "react";

function Footer() {
	const { theme } = useContext(Themecontext);
	return (
		<footer>
			<p style={{ color: !theme ? "black" : "white" }}>ⓒ Venkata Sai</p>
		</footer>
	);
}

export default Footer;
