import Head from "next/head";
import NavBar from "../components/navbar/nav-bar";
import AppBar from "../components/appbar/app-bar";

export default function New() {

	return (
		<>
			<Head>
				<title>Gallery Himam Konsulat Malang</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<div className="navbar-new ">
				<div className="md:hidden fixed flex bg-white px-7 sm:space-x-20 sm:place-content-center bottom-0 w-full place-content-between items-center h-[75px] shadow-[0_0_3px_0_rgba(0,0,0,0.20)] z-[5]">
					<NavBar href="/" variant="home">
						Home
					</NavBar>
					<NavBar href="/event" variant="products">
						Products
					</NavBar>
					<NavBar
						className="navbar-active"
						href="/gallery"
						variant="changelogs"
					>
						Changelogs
					</NavBar>
					<NavBar href="/about" variant="about">
						About
					</NavBar>
				</div>
			</div>

			{/* default content */}
		</>
	);
}
