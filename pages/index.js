import Head from "next/head";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BoltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DeliveryAnimation from "../components/delivery/delivery-animation";
import PatternAnimation from "../components/pattern/pattern-animation";
import RadioGroupcomponent from "../components/radio/radio-group";
import ListProducts from "../components/product/list-products";
import Link from "next/link";
import Logo from "../components/logo/logo";

export default function Home() {
	// console.log(dataProvince);
	// console.log(dataCity);
	// console.log(dataCost);
	const navigation = [
		{
			name: "Home",
			href: "/",
			class: "text-primary-600 hover:text-primary-500",
			onClick: (event) => {
				event.preventDefault();
			},
		},
		{
			name: "Products",
			href: "/products",
			class: "text-gray-500 hover:text-gray-900",
			onClick: (event) => {},
		},
		{
			name: "Changelogs",
			href: "/changelogs",
			class: "text-gray-500 hover:text-gray-900",
			onClick: (event) => {},
		},
		{
			name: "About",
			href: "/about",
			class: "text-gray-500 hover:text-gray-900",
			onClick: (event) => {},
		},
	];

	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isScrolled, setIsScrolled] = React.useState(false);

	const [isNavOpen, setIsNavOpen] = React.useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		if (scrollPosition > 5) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}

		// getCity();
	}, [scrollPosition, isScrolled]);

	return (
		<>
			<Head>
				<title>Bayarno.id - Kon Butuh Opo Tak Bayarno </title>
				<meta
					name="Welcome to Raja Ongkir Bradeer"
					content="Website Raja Ongkir Bradeer merupakan salah satu platform untuk mengecek harga ongkos kirim pengiriman paket."
				/>
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
							<Link href="/">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									Home
								</div>
							</Link>
							<Link href="/about">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									About
								</div>
							</Link>
							<Link href="/contact">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									Contact
								</div>
							</Link>
							<Link href="/blog">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									Blog
								</div>
							</Link>
							<Link href="/login">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									Login
								</div>
							</Link>
							<Link href="/register">
								<div className="font-medium text-gray-500 hover:text-gray-900">
									Register
								</div>
							</Link>
						</nav>
					</div>
				) : (
					<div></div>
				)}
				=
				<div className="mx-auto">
					<div className="p-5 mb-16 relative z-10 lg:p-24 ">
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

						<main className="mx-auto mt-24 lg:mt-44 xl:mt-12 sm:px-8 md:px-20 lg:px-0">
							<div className=" sm:text-left lg:text-left max-w-5xl p-6 pr-1 pl-1 lg:p-0 mt-44 lg:mt-32">
								<h1
									className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-gray-900"
									data-aos="fade-up"
								>
									<div className=" text-primary-600 inline">
										&#123; Bayarno.id &#125;
									</div>
									<div className="">Kon Tuku Opo Tak Bayarno</div>
								</h1>
								<p
									className="text-md text-justify lg:text-lg text-gray-500 mt-5 max-w-3xl"
									data-aos="fade-up"
									data-aos-delay="150"
								>
									Platform belanja online sekaligus solusi untuk memudahkan bagi
									dropshiper, dan siapapun yang ingin mengecek harga ongkir
									pengiriman paket dari ekspedisi JNE di seluruh wilayah
									Indonesia.
								</p>
								<div
									className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start"
									data-aos="fade-up"
									data-aos-delay="200"
								>
									<div className="rounded-md shadow">
										<Link
											href="/checkout"
											className="shadow-primary cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-7 py-4 text-base font-medium text-white hover:bg-primary-700 md:text-lg"
										>
											<BoltIcon className="w-6 h-6 mr-3" />
											<div>Tes Layanan Gratis</div>
										</Link>
									</div>
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<a
											href="#"
											className="shadow-primary flex w-full items-center justify-center rounded-md border border-transparent bg-primary-100 px-7 py-4 text-base font-medium text-primary-700 hover:bg-primary-200 md:text-lg"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 mr-3"
											>
												<path
													fillRule="evenodd"
													d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
													clipRule="evenodd"
												/>
											</svg>
											Dokumentasi APIs
										</a>
									</div>
								</div>
								<h1
									className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-20"
									data-aos="fade-up"
								>
									<div className="">#01 Lorem ipsum dolor sit amet</div>
								</h1>
								<p
									className="text-md text-justify lg:text-lg text-gray-500 mt-5 max-w-3xl"
									data-aos="fade-up"
									data-aos-delay="150"
								>
									Platform belanja online sekaligus solusi untuk memudahkan bagi
									dropshiper, dan siapapun yang ingin mengecek harga ongkir
									pengiriman paket dari ekspedisi JNE di seluruh wilayah
									Indonesia.
								</p>
								<div
									className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start"
									data-aos="fade-up"
									data-aos-delay="200"
								></div>
								<h1
									className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-20"
									data-aos="fade-up"
								>
									<div className="">#02 Lorem ipsum dolor sit amet</div>
								</h1>
								<p
									className="text-md text-justify lg:text-lg text-gray-500 mt-5 max-w-3xl"
									data-aos="fade-up"
									data-aos-delay="150"
								>
									Platform belanja online sekaligus solusi untuk memudahkan bagi
									dropshiper, dan siapapun yang ingin mengecek harga ongkir
									pengiriman paket dari ekspedisi JNE di seluruh wilayah
									Indonesia.
								</p>
								<div
									className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start"
									data-aos="fade-up"
									data-aos-delay="200"
								></div>
								<h1
									className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-20"
									data-aos="fade-up"
								>
									<div className="">#03 Lorem ipsum dolor sit amet</div>
								</h1>
								<p
									className="text-md text-justify lg:text-lg text-gray-500 mt-5 max-w-3xl"
									data-aos="fade-up"
									data-aos-delay="150"
								>
									Platform belanja online sekaligus solusi untuk memudahkan bagi
									dropshiper, dan siapapun yang ingin mengecek harga ongkir
									pengiriman paket dari ekspedisi JNE di seluruh wilayah
									Indonesia.
								</p>
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
				</div>
			</div>
		</>
	);
}
