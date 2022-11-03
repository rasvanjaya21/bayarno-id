import Head from "next/head";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CheckoutAnimation from "../components/background/checkout-animation";
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

	return (
		<>
			<Head>
				<title>Home - Raja Ongkir Bradeer</title>
				<meta
					name="Welcome to Raja Ongkir Bradeer"
					content="Website Raja Ongkir Bradeer merupakan salah satu platform untuk mengecek harga ongkos kirim pengiriman paket."
				/>
			</Head>
			<div className="">
				<div className="mx-auto">
					<div className="p-5 mb-16 relative z-10 lg:p-24">
						<Popover>
							<div className="bg-white shadow fixed right-0 top-0 p-5 lg:p-7  w-screen lg:px-24 ">
								<nav
									className="relative flex items-center justify-between sm:h-10"
									aria-label="Global"
								>
									<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
										<div className="flex w-full items-center justify-between">
											<Link
												href=""
												onClick={(event) => {
													event.preventDefault();
												}}
											>
												<div className="flex">
													<Logo />
													{/* <div className="self-center text-primary-600 ml-3 pt-1.5">
														Raja Ongkir Bradeer
													</div> */}
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

						<main className="mx-auto mt-24 lg:mt-32">
							<div className="opacity-0 right-0 fixed lg:opacity-100 lg:absolute lg:inset-y-0 lg:right-24 lg:top-48 pointer-events-none">
								<CheckoutAnimation />
							</div>
							{/* <div className="fixed lg:opacity-0 right-0 lg:inset-y-0 lg:right-24 lg:top-48 pointer-events-none">
								<PatternAnimation />
							</div> */}
							<div className="lg:fixed sm:text-left lg:text-left max-w-5xl p-6 pr-1 pl-1 lg:p-0 mt-72 lg:mt-0">
								<h1
									className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-gray-900"
									data-aos="fade-up"
								>
									<p className="">Cek ongkos kirim paket anda di website</p>
									<p className=" text-primary-600 ">
										&#123; Raja Ongkir Bradeer &#125;
									</p>
								</h1>
								<p
									className="text-md text-justify lg:text-lg text-gray-500 mt-5 max-w-3xl"
									data-aos="fade-up"
									data-aos-delay="150"
								>
									Kami hadir untuk memudahkan Anda, dan siapapun yang ingin
									mengecek harga ongkir pengiriman paket dari ekspedisi JNE di
									seluruh wilayah Indonesia.
								</p>
								<div
									className="mt-5 sm:mt-8 sm:flex sm:justify-start lg:justify-start"
									data-aos="fade-up"
									data-aos-delay="200"
								>
									<div className="rounded-md shadow">
										<Link
											href="/check"
											className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-7 py-4 text-base font-medium text-white hover:bg-primary-700 md:text-lg"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 mr-3"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
												/>
											</svg>
											Cek Ongkos Kirim
										</Link>
									</div>
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<a
											href="#"
											className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-100 px-7 py-4 text-base font-medium text-primary-700 hover:bg-primary-200 md:text-lg"
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
											Dokumentasi API
										</a>
									</div>
								</div>
							</div>
							<div className="fixed lg:fixed bottom-0 right-0 left-0 w-screen p-6 lg:p-10 lg:px-24 pt-0 bg-white">
								<footer className="rounded-lg shadow  flex items-center justify-between p-4 lg:p-6 bg-white">
									<span className="inline text-xs lg:text-sm text-gray-500 text-center hover:text-primary-600">
										© 2022 <a href="https://bradeer.my.id/"> Bradeer™</a>
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
