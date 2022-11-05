import React, { useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
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


	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isScrolled, setIsScrolled] = React.useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		if (scrollPosition > 150) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}

		// getCity();
	}, [scrollPosition, isScrolled]);

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
			<div className="">
				<div className="mx-auto">
					<div className="p-5 mb-16 relative z-10 lg:p-24 ">
						<Popover>
							<div
								className={
									isScrolled
										? `fixed right-0 top-0 z-20 bg-white/75 backdrop-blur-[15px] p-5 pt-5 lg:p-7 w-full sm:px-14 md:px-24 lg:px-24 lg:pt-6 shadow-primary transition-all`
										: `fixed right-0 top-0 z-20 bg-white p-5 pt-12 lg:p-7 lg:pt-12 w-full sm:px-14 md:px-24 lg:px-24 `
								}
							>
								<nav
									className="relative flex items-center justify-between"
									aria-label="Global"
								>
									<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
										<div className="flex w-full items-center justify-between">
											<Link
												href="/"
											>
												<div className="flex">
													<Logo />
												</div>
											</Link>
											<div className="-mr-2 flex items-center md:hidden">
												<Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
													<span className="sr-only">Open main menu</span>
													<Bars3Icon className="h-6 w-6" aria-hidden="true" />
												</Popover.Button>
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

							<Transition
								as={Fragment}
								enter="duration-150 ease-out"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="duration-100 ease-in"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Popover.Panel
									focus
									className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
								></Popover.Panel>
							</Transition>
						</Popover>

						<main className="mx-auto">
							<div className=" bg-white">
								<div
									className="flex justify-center items-center"
									data-aos="fade-left"
								>
									<div className="pointer-events-none">
										<DeliveryAnimation />
									</div>
								</div>
								<h1 className="m-10 flex text-xl font-bold text-gray-800 sm:place-content-center">
									<span className="text-primary-600 mr-1">
										Being Maintenanced :{" "}
									</span>{" "}
									Products Page is delivering to you
									{/* //// */}
								</h1>
							</div>

							<div className="absolute lg:fixed bottom-0 right-0 left-0 w-screen p-10 px-24">
								<footer className="rounded-lg shadow  flex items-center justify-between p-6">
									<span className="text-sm text-gray-500 text-center hover:text-primary-600">
										© 2022 <a href="https://bradeer.my.id/">Bradeer.my.id™</a>
									</span>
									<ul className="flex items-center text-sm text-center text-gray-500 sm:mt-0 ml-10">
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
