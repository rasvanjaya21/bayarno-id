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

export default function Home({ dataProvince, dataCity, dataCost }) {
	// console.log(dataProvince);
	// console.log(dataCity);
	// console.log(dataCost);
	const navigation = [
		{
			name: "Home",
			href: "#",
			class: "text-indigo-600 hover:text-indigo-500",
			onClick: (event) => {
				if (isCekOngkir) {
					setIsCekOngkir(false);
				} else {
					event.preventDefault();
				}
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

	const [pageState, setPageState] = React.useState();
	const [endPoint, setEndPoint] = React.useState(`/province`);
	const [isCekOngkir, setIsCekOngkir] = React.useState(false);

	return (
		<>
			<Head>
				<title>Home - Raja Ongkir Bradeer</title>
				<meta
					name="Welcome to Raja Ongkir Bradeer"
					content="Website Raja Ongkir Bradeer merupakan salah satu platform untuk mengecek harga ongkos kirim pengiriman paket."
				/>
				<link rel="icon" href="/logo.svg" />
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
					<div className="relative z-10 w-screen p-10 px-24">
						<Popover>
							<div className="relative">
								<nav
									className="relative flex items-center justify-between sm:h-10"
									aria-label="Global"
								>
									<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
										<div className="flex w-full items-center justify-between">
											<Link
												onClick={(event) => {
													if (isCekOngkir) {
														setIsCekOngkir(false);
													} else {
														event.preventDefault();
													}
												}}
												href="/"
											>
												<div className="flex">
													<svg
														width="40"
														height="40"
														viewBox="0 0 87 82"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M66.4707 8.30731L73.6172 14.6597C73.8607 14.8762 74 15.1864 74 15.5122C74 15.8237 73.8726 16.1217 73.6473 16.3369L41.8719 46.6895C40.9914 47.5306 39.8205 48 38.6028 48C37.264 48 35.9879 47.433 35.0905 46.4395L23.1555 33.2257C22.7258 32.75 22.1804 32.3935 21.5723 32.1908L21.3412 32.1137C21.1152 32.0384 20.8786 32 20.6404 32C19.9247 32 19.2531 32.3456 18.8372 32.928L17.442 34.8812C17.149 35.2914 16.918 35.7459 16.7586 36.2241C16.588 36.7361 16.5 37.2751 16.5 37.8148C16.5 38.5942 16.6815 39.363 17.0301 40.0601L17.1036 40.2071C17.3663 40.7326 17.7084 41.2144 18.1179 41.6356L33.0289 56.9726C34.289 58.2687 36.0199 59 37.8277 59C39.5434 59 41.1936 58.3411 42.4374 57.1594L70.5 30.5L87 15L84.2275 21.5532C82.4275 25.8078 81.5 30.3804 81.5 35V40.4223C81.5 45.7584 80.4818 51.0455 78.5 56L76.5588 59.6397C75.1904 62.2055 73.5452 64.6139 71.6528 66.8217C69.5586 69.2649 67.1763 71.4455 64.5578 73.3158L61.5 75.5L59.7597 76.4213C55.2769 78.7946 50.4737 80.5053 45.5 81.5L40.7811 81.8146C38.9299 81.938 37.0719 81.9156 35.2242 81.7477C33.4108 81.5828 31.6128 81.2782 29.8462 80.8366L28.2633 80.4408C25.7619 79.8155 23.3365 78.9183 21.0304 77.7652C18.0255 76.2627 15.2502 74.3395 12.7883 72.0534L9.5 69L8.52369 67.8067C6.1874 64.9513 4.28605 61.7661 2.8813 58.3546C1.96258 56.1234 1.26173 53.8087 0.788524 51.4426L0.758085 51.2904C0.253928 48.7696 0 46.2052 0 43.6345V41.7342C0 39.9145 0.150346 38.0979 0.449503 36.303C0.815563 34.1066 1.40273 31.9529 2.20206 29.8746L3.5 26.5L4.93874 23.6225C5.9778 21.5444 7.18679 19.5557 8.55336 17.6766L8.62845 17.5734C9.87423 15.8604 11.2523 14.2477 12.75 12.75L12.9026 12.5974C14.2987 11.2013 15.8021 9.91667 17.3989 8.75536C19.461 7.25563 21.6696 5.96838 23.9908 4.91326L28.657 2.79229C30.5476 1.93292 32.5194 1.26475 34.543 0.797773C36.8402 0.267637 39.1902 0 41.5479 0H44.9284C48.6128 0 52.2671 0.66265 55.7168 1.95631C57.568 2.65048 59.3478 3.5217 61.0315 4.55785L63.3241 5.9687C64.4392 6.65492 65.4921 7.43744 66.4707 8.30731Z"
															fill="#4F46E5"
														/>
													</svg>
													<div className="self-center text-indigo-600 ml-1">
														Raja Ongkir Bradeer
													</div>
												</div>
											</Link>
											<div className="-mr-2 flex items-center md:hidden">
												<Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
													<span className="sr-only">Open main menu</span>
													<Bars3Icon className="h-6 w-6" aria-hidden="true" />
												</Popover.Button>
											</div>
										</div>
									</div>
									<div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
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
											href="https://github.com/rasvanjaya21/raja-ongkir-bradeer"
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

						<main className="mx-auto mt-36">
							{isCekOngkir ? (
								<>
									<div className="flex w-12/12">
										<div className=" flex-row w-4/12">
											<RadioGroupcomponent />
											<ListProducts />
											<div className="lg:absolute lg:inset-y-0 lg:right-24 lg:top-48 pointer-events-none">
												{/* <CheckoutAnimation /> */}
												<PatternAnimation />
												{/* <DeliveryAnimation /> */}
											</div>
										</div>
										<div className="flex w-6/12">
											{/* <RadioGroupcomponent /> */}
										</div>
									</div>
								</>
							) : (
								<div className="sm:text-center lg:text-left max-w-5xl">
									<h1
										className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
										data-aos="fade-up"
									>
										<span className="block xl:inline">
											Cek ongkos kirim paket anda di website kami
										</span>{" "}
										<span className="block text-indigo-600 xl:inline">
											&#123; Raja Ongkir Bradeer &#125;
										</span>
									</h1>
									<p
										className=" text-lg text-gray-500 mt-5 max-w-3xl md:text-xl "
										data-aos="fade-up"
										data-aos-delay="150"
									>
										Kami hadir untuk memudahkan Anda, dan siapapun yang ingin
										mengecek harga ongkir pengiriman paket dari ekspedisi JNE di
										seluruh wilayah Indonesia.
									</p>
									<div
										className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
										data-aos="fade-up"
										data-aos-delay="200"
									>
										<div className="rounded-md shadow">
											<a
												onClick={() => setIsCekOngkir(true)}
												className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-7 py-4 text-base font-medium text-white hover:bg-indigo-700 md:text-lg"
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
												Cek Ongkir
											</a>
										</div>
										<div className="mt-3 sm:mt-0 sm:ml-3">
											<a
												href="#"
												className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-7 py-4 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:text-lg"
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
							)}

							<div className="absolute lg:fixed bottom-0 right-0 left-0 w-screen p-10 px-24">
								<footer className="rounded-lg shadow  flex items-center justify-between p-6">
									<span className="text-sm text-gray-500 text-center hover:text-indigo-600">
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
					{isCekOngkir ? (
						<div></div>
					) : (
						<>
							<div className="lg:absolute lg:inset-y-0 lg:right-24 lg:top-48 pointer-events-none">
								<CheckoutAnimation />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	// base
	const baseUrl = process.env.RAJAONGKIR_API_URL;
	const key = process.env.RAJAONGKIR_API_KEY;

	// get all province
	const resProvince = await fetch(baseUrl + `/province`, {
		method: "GET",
		headers: { key },
	});
	const dataProvince = await resProvince.json();

	// get all city
	const resCity = await fetch(baseUrl + `/city`, {
		method: "GET",
		headers: { key },
	});
	const dataCity = await resCity.json();

	// get all cost
	const resCost = await fetch(baseUrl + `/cost`, {
		method: "POST",
		headers: { key, "content-type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			origin: "501",
			destination: "114",
			weight: 1700,
			courier: "jne",
		}),
		form: { URLSearchParams },
	});

	const dataCost = await resCost.json();

	return { props: { dataProvince, dataCity, dataCost } };
}
