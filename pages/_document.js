// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html style={{ scrollBehavior: "smooth" }}>
			<Head>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}