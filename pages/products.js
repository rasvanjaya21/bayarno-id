import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DeliveryAnimation from "../components/delivery/delivery-animation";
import Link from "next/link";
import Logo from "../components/logo/logo";
import Head from "next/head";

const navigation = [
	{
		name: "Home",
		href: "/",
		class: "text-gray-500 hover:text-gray-900",
		onClick: (event) => {
		},
	},
	{
		name: "Products",
		href: "#",
		class: "text-primary-600 hover:text-primary-500",
		onClick: (event) => {
			event.preventDefault();
		},
	},
	{
		name: "Changelogs",
		href: "/changelogs",
		class: "text-gray-500 hover:text-gray-900",
		onClick: (event) => {
		},
	},
	{
		name: "About",
		href: "/about",
		class: "text-gray-500 hover:text-gray-900",
		onClick: (event) => {
		},
	},
];

export default function Products() {


	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		if (isNavOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		if (scrollPosition > 5) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}

		// getCity();
	}, [scrollPosition, isScrolled, isNavOpen]);

	return (
		<>
			<Head>
				<title>Products - Kami Menyediakan Produk Raja Ongkir Bradeer</title>
				<meta
					name="Products Raja Ongkir Bradeer"
					content="Kami menyediakan produk Raja Ongkir Bradeer, mulai dari produk gratis, produk berbayar, dan produk premium."
				/>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<div className="overflow-hidden">
				{isNavOpen ? (
					<div
						className={
							isScrolled
								? `md:hidden fixed p-5 pr-3 sm:pr-12 pt-5 lg:p-7 lg:pt-12 sm:px-14 md:px-24 lg:px-24 z-30 h-screen w-full bg-white/40 backdrop-blur-[10px]`
								: `md:hidden fixed p-5 pr-3 sm:pr-12 pt-10 lg:p-7 lg:pt-12 sm:px-14 md:px-24 lg:px-24 z-30 h-screen w-full bg-white/40 backdrop-blur-[10px]`
						}
					>
						<div
							className="flex w-full items-center justify-between"
							data-aos="fade-down"
						>
							<div>
								<Logo />
							</div>
							<button
								className="inline-flex justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
								onClick={(event) => {
									event.preventDefault();
									setIsNavOpen(false);
								}}
							>
								<XMarkIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<nav className="pt-12" data-aos="fade-down">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									
									onClick={item.onClick}
								>
									<div className={`font-medium ${item.class}`}>
										{item.name}
									</div>
								</Link>
							))}
						</nav>
					</div>
				) : (
					<></>
				)}
				<div
					className={
						isScrolled
							? `fixed right-0 top-0 z-20 bg-white/40 backdrop-blur-[15px] p-5 pt-5 lg:p-7 w-full sm:px-14 md:px-24 lg:px-24 lg:pt-6 shadow-primary transition-all duration-300`
							: `fixed right-0 top-0 z-20 bg-white p-5 pt-10 lg:p-7 lg:pt-12 w-full sm:px-14 md:px-24 lg:px-24 transition-all duration-300 pb-5`
					}
				>
					<nav
						className="relative flex items-center justify-between sm:h-10"
						aria-label="Global"
					>
						<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
							<div className="flex w-full items-center justify-between">
								<Link href="/">
									<Logo />
								</Link>
								<div className="-mr-2 flex items-center md:hidden">
									<button
										className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
										onClick={(event) => {
											console.log("clicked");
											setIsNavOpen(true);
										}}
									>
										<Bars3Icon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
						<div className="hidden md:ml-10 md:block md:space-x-8">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`font-medium ${item.class}`}
									onClick={item.onClick}
								>
									{item.name}
								</Link>
							))}
						</div>
					</nav>
				</div>
				<main className="m-auto">
					<div className="pt-40 bg-white">
						<div
							className="pr-14 flex justify-center items-center"
							data-aos="fade-in"
						>
							<div className="pointer-events-none">
								<DeliveryAnimation />
							</div>
						</div>
						<h1 className="m-2 sm:m-10 text-center text-xs sm:text-xl font-bold text-gray-800">
							<span className="text-primary-600 mr-1">
								Being Maintenanced :{" "}
							</span>{" "}
							Products Page is delivering to you
							{/* //// */}
						</h1>
					</div>
					<div className="fixed lg:fixed bottom-0 right-0 left-0 w-screen p-6 sm:px-14 md:px-24 lg:p-10 lg:px-24 lg:pt-0 pt-0 ">
						<footer className="rounded-lg shadow  flex items-center justify-between p-4 lg:p-6 bg-white/40 backdrop-blur-[15px]">
							<span className="inline text-xs lg:text-sm text-gray-500 text-center hover:text-primary-600">
								© 2022 <a href="#">Bayarno™</a>
							</span>
							<ul className="flex items-center text-xs lg:text-sm text-center text-gray-500 sm:mt-0 lg:ml-10">
								<li>
									<a href="#" className="mr-4 hover:underline md:mr-6">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="mr-4 hover:underline md:mr-6">
										Licensing
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Contact
									</a>
								</li>
							</ul>
						</footer>
					</div>
				</main>
			</div>
		</>
	);
}
