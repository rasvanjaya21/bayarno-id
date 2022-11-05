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
		href: "/products",
		class: "text-gray-500 hover:text-gray-900",
		onClick: (event) => {
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
		href: "#",
		class: "text-primary-600 hover:text-primary-500",
		onClick: (event) => {
			event.preventDefault();
		},
	},
];

export default function About() {
	return (
		<>
			<Head>
				<title>About - Informasi Lengkap Raja Ongkir Bradeer</title>
				<meta
					name="About Raja Ongkir Bradeer"
					content="Informasi mengenai platform Raja Ongkir Bradeer, mulai dari sejarah, visi, misi, dan tujuan."
				/>
			</Head>
			<div className=" overflow-hidden  h-screen w-screen">
				<div className="lg:hidden ">
					<div className="w-screen h-screen bg-white">
						<div className="flex justify-center items-center pr-12">
							<DeliveryAnimation />
						</div>
						<h1 className="m-10 flex text-5xl font-bold text-gray-800 sm:place-content-center">
							Pantun Sek
						</h1>
						<h1 className="m-10 flex text-2xl font-bold text-gray-800 sm:place-content-center ">
							Joko tingkir ngombe dawet, Ojo dipikir garai mumet.
						</h1>
						<h1 className="m-10 flex text-2xl font-bold text-gray-800 sm:place-content-center ">
							Gausah dipikir blok. Ojo gawe hp, gawe o laptop
						</h1>
					</div>
				</div>
				<div className="mx-auto">
					<div className="relative z-10 p-24">
						<Popover>
							<div className="bg-white shadow lg:fixed right-0 top-0 p-7  w-screen px-24 ">
								<nav
									className="relative flex items-center justify-between sm:h-10"
									aria-label="Global"
								>
									<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
										<div className="flex w-full items-center justify-between">
											<Link href="/">
												<Logo/>
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

										{/* eslint-disable-next-line react/jsx-no-target-blank */}
										<a
											href="https://github.com/rasvanjaya21/bayarno-id"
											target="_blank"
											className="inline-flex text-gray-500 hover:text-gray-900 cursor-pointer outline p-2 rounded-md"
										>
											<div className="mr-2">Contribute on Github</div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
											>
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
											</svg>
										</a>
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
									About Page is delivering to you
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
