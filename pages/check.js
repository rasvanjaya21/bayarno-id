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
import TabGroup from "../components/tab/tab-group";
import Link from "next/link";
import Logo from "../components/logo/logo";
import { Router } from "next/router";
import nProgress from "nprogress";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";
import SendMessage from "../libs/send-message";
import axios from "axios";

export default function Check() {

	// SendMessage("test");


	// console.log(clientId);

	// async function hey() {
		//base
		// base

		// get all province
		// const resProvince = await fetch(baseUrl + `/province`, {
		// 	method: "GET",
		// 	headers: { key },
		// });
		// const dataProvince = await resProvince.json();
		// const province = dataProvince.rajaongkir.results;

		// try {
		// 	JSON.parse(province);
		// } catch (error) {
		// 	console.log("Error parsing JSON:", error, province);
		// }


		// get all city
		// const resCity = await fetch(baseUrl + `/city`, {
		// 	method: "GET",
		// 	headers: { key },
		// });
		// const dataCity = await resCity.json();

		// // get all cost
		// const resCost = await fetch(baseUrl + `/cost`, {
		// 	method: "POST",
		// 	headers: { key, "content-type": "application/x-www-form-urlencoded" },
		// 	body: new URLSearchParams({
		// 		origin: "501",
		// 		destination: "114",
		// 		weight: 1700,
		// 		courier: "tiki",
		// 	}),
		// 	form: { URLSearchParams },
		// });

		// const dataCost = await resCost.json();
		// console.log(dataCost);
	// }
	// hey();

	// console.log(dataProvince);
	// console.log(clientId);
	// console.log(dataProvince);
	// console.log(dataCity);
	// console.log(dataCost.rajaongkir.results[0].costs.map((cost) => cost.cost[0]));
	const navigation = [
		{
			name: "Home",
			href: "/",
			class: "text-gray-500 hover:text-gray-900",
			onClick: (event) => {},
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
	const [filterCity, setFilterCity] = React.useState("");

	const TEST_SITE_KEY = "6LeE8M8iAAAAAMz7cfo_1e7kc00DreSa6Ly8Jg-u";

	function onChange(value) {
		// console.log("Captcha value:", value);
	}

	const [dynamic, setDynamic] = React.useState("GET");
	React.useEffect(() => {
			getCity();
	}, []);

	async function getCity() {
		nProgress.start();

		const response = await fetch("http://localhost:3000/api/city"  || "https://bayarno.vercel.app/api/city");
		if (response.ok) {
			// console.log("ok");
			nProgress.done();
		} else {
			nProgress.done();
			// console.log("not ok");
		}

		const data = await response.json();
		const randomNumber = Math.floor(Math.random() * 500) + 1;

		alert(data.rajaongkir.results[randomNumber].city_name);

		// alert(data[0].results);
	}


	async function getProvince() {
		nProgress.start();

		const response = await fetch("http://localhost:3000/api/province" || "https://bayarno.vercel.app/api/province");
		if (response.ok) {
			console.log("ok");
			// nProgress.done();
		} else {
			nProgress.done();
			// console.log("not ok");
		}

		const data = await response.json();

		const randomNumber = Math.floor(Math.random() * 33) + 1;
		alert(data.rajaongkir.results[randomNumber].province);

		// alert(data);
	}

	return (
		<>
			<Head>
				<title>Home - Raja Ongkir Bradeer</title>
				<meta
					name="Welcome to Raja Ongkir Bradeer"
					content="Website Raja Ongkir Bradeer merupakan salah satu platform untuk mengecek harga ongkos kirim pengiriman paket."
				/>
			</Head>
			<Script src="https://www.google.com/recaptcha/api.js" />

			<div className=" overflow-hidden w-screen">
				{/* <div className="lg:hidden ">
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
				</div> */}
				<div className="mx-auto">
					<div className="relative p-4 pt-24 lg:p-24 lg:mt-10">
						<Popover>
							<div className="bg-white shadow fixed right-0 top-0 p-5 lg:p-7  w-full lg:px-24 z-20">
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
									className="absolute inset-x-0 top-0  origin-top-right transform p-2 transition md:hidden"
								></Popover.Panel>
							</Transition>
						</Popover>

						<main className="mx-auto mt-4">
							<div className="lg:flex w-12/12">
								<div className="lg:w-8/12 bg-blue-50 bg-opacity-90 rounded-xl lg:mr-12">
									<div className="lg:flex">
										<div className="lg:w-4/8 flex-auto p-6">
											<div className="text-md text-black">
												{"# Asal Pengiriman"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												{"Pilih alamat Provinsi dan Kota asal pengiriman anda"}
											</div>
											<div className="space-y-4">
												<ListProducts label="Province" />
												<ListProducts label="Kota" />
											</div>
										</div>
										<div className="lg:w-4/8 flex-auto p-6">
											<div className="text-md text-black">
												{"# Tujuan Pengiriman"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												{
													"Pilih alamat Provinsi dan Kota tujuan pengiriman anda"
												}
											</div>
											<div className="space-y-4">
												<ListProducts label="Province" />
												<ListProducts label="Kota" />
											</div>
										</div>
									</div>
									<div className="lg:w-4/8 flex-auto px-6">
										<div className="border-t-2 border-dashed">
											{/* {"# Tujuan Pengiriman"} */}
										</div>
									</div>
									<div className="lg:w-4/8 flex-auto pt-4 p-6">
										<div className="text-md text-black">
											{"# Ekspedisi Pengiriman"}
										</div>
										<div className="text-xs mb-4 text-gray-500">
											{"Tentukan jasa pengiriman anda yang tersedia"}
										</div>
										<div className="space-y-4">
											<RadioGroupcomponent variant="couriers" />
										</div>
									</div>
									<div className="lg:w-4/8 flex-auto px-6">
										<div className="border-t-2 border-dashed">
											{/* {"# Tujuan Pengiriman"} */}
										</div>
									</div>
									<div className="lg:flex">
										<div className="lg:w-4/8 flex-auto pt-4 p-6">
											<div className="text-md text-black">
												{"# Berat Barang"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												{"Masukkan berat barang anda"}
											</div>
											<div className="space-y-4">
												<ListProducts label="Berat" />
											</div>
											<div className="text-xs mt-6 text-gray-500">
												* Pastikan anda mengisi dengan satuan{" "}
												<span className="font-bold">gram</span>
											</div>
										</div>
										<div className="lg:w-4/8 flex-auto pt-4 p-6">
											<div className="text-md text-black">
												{"# Validate Process"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												* Please validate the captcha field
												<div className="mt-4 space-y-4">
													<ReCAPTCHA
														sitekey={TEST_SITE_KEY}
														onChange={onChange}
														type="image"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex-row h-fit lg:w-8/12 lg:mr-4 space-y-4">
									<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
										<div className="text-md text-black">{"# Pilih Produk"}</div>
										<div className="text-xs mb-4 text-gray-500">
											{"Hasil pengecekan ongkos kirim yang telah anda tentukan"}
										</div>
										<div className="space-y-4">
											<RadioGroupcomponent variant="products" />
										</div>
									</div>
									<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl h-[352px]">
										<div className="text-md text-black">
											{"# Hasil Pengecekan"}
										</div>
										<div className="text-xs mb-4 text-gray-500">
											Hasil pengecekan ongkos kirim dari{" "}
											<span className="font-bold text-black">Gresik</span> ke
											<span className="font-bold text-black">
												{" "}
												Jakarta
											</span>{" "}
											dengan berat{" "}
											<span className="font-bold text-black">1.000</span> gram
											(default)
										</div>
										<div className="space-y-4">
											<TabGroup />
										</div>
									</div>
									<div className="flex w-8/8 items-center">
										<div className="lg:w-4/8 flex-auto p-6 pt-0">
											<div className="text-md text-black">
												{"# Status :"}
												<span className="text-green-500 font-bold"> VALID</span>
											</div>
										</div>
									</div>
									<div className="lg:w-4/8 flex-auto p-6 pt-0">
										<button
											type="submit"
											className="w-full bg-primary-600 p-2 rounded-lg text-white"
											// href="https://api.telegram.org/bot1656411725:AAH5KeZ0RN1udWK_Bduf7gNfUNbqtr7JD2A/sendMessage?chat_id=938738771&text=Hello%20from%20your%20new%20bot"
											onClick={(event) => {
												getCity();
											}}
										>
											Check City
										</button>
									</div>

									<div className="lg:w-4/8 flex-auto p-6 pt-0">
										<button
											type="submit"
											className="w-full bg-primary-600 p-2 rounded-lg text-white"
											// href="https://api.telegram.org/bot1656411725:AAH5KeZ0RN1udWK_Bduf7gNfUNbqtr7JD2A/sendMessage?chat_id=938738771&text=Hello%20from%20your%20new%20bot"
											onClick={(event) => {
												getProvince();
											}}
										>
											Check Province
										</button>
									</div>
									{/* <div className="flex lg:w-4/8  pt-0 p-6 pb-4 rounded-xl text-end items-center">
										<div className="text-md text-black">
											{"# Status :"}
											<span className="text-green-500 font-bold">
												{" "}
												VALID
											</span>
										</div>
										<button
											className="bg-primary-600 p-2 rounded-lg text-white"
											onClick={(event) => {
												// setShowModal(true);
												// Router.events(event);
												nProgress.start();

												// Router.events.on("onClick", nProgress.start);
											}}
										>
											Calculate Postage
										</button>
									</div> */}
								</div>
							</div>

							{/* <div className="absolute lg:fixed bottom-0 right-0 left-0 w-screen p-10 px-24">
								<footer className="rounded-xl shadow  flex items-center justify-between ">
									<span className="flex text-sm text-gray-500 text-center hover:text-primary-600 p-6">
										<ul className="flex items-center text-sm text-center text-gray-500 ">
											<li className="flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 text-primary-600 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
													/>
												</svg>

												<a className="mr-6 self-center">Fast Service</a>
											</li>
											<li className="flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 text-primary-600 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
													/>
												</svg>

												<a className="mr-6 self-center">Secure Operation</a>
											</li>
											<li className="flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 text-primary-600 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
													/>
												</svg>

												<a className="mr-6 self-center">Synchronized</a>
											</li>
											<li className="flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 text-primary-600 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
													/>
												</svg>
												<a className="mr-6 self-center">Opensource Project</a>
											</li>
										</ul>
									</span>
									<button
										className="bg-primary-600 p-2 mr-4 rounded-lg text-white"
										onClick={(event) => {
											// setShowModal(true);
											// Router.events(event);
											nProgress.start();

											// Router.events.on("onClick", nProgress.start);
										}}
									>
										Calculate Postage
									</button>
								</footer>
							</div> */}
						</main>
					</div>
				</div>
			</div>
		</>
	);
}

// export async function getStaticProps() {

// 	// const botToken = process.env.TELEGRAM_BOT_TOKEN;
// 	// const clientId = process.env.TELEGRAM_CLIENT_ID;

// 	// return {
// 	// 	props: {
// 	// 		botToken,
// 	// 		clientId,
// 	// 	},
// 	// };

// 	// base
// 	const baseUrl = process.env.RAJAONGKIR_API_URL;
// 	const key = process.env.RAJAONGKIR_API_KEY;

// 	// get all province
// 	const resProvince = await fetch(baseUrl + `/province`, {
// 		method: "GET",
// 		headers: { key },
// 	});
// 	const dataProvince = await resProvince.json();

// 	// get all city
// 	const resCity = await fetch(baseUrl + `/city`, {
// 		method: "GET",
// 		headers: { key },
// 	});
// 	const dataCity = await resCity.json();

// 	// get all cost
// 	const resCost = await fetch(baseUrl + `/cost`, {
// 		method: "POST",
// 		headers: { key, "content-type": "application/x-www-form-urlencoded" },
// 		body: new URLSearchParams({
// 			origin: "501",
// 			destination: "114",
// 			weight: 1700,
// 			courier: "tiki",
// 		}),
// 		form: { URLSearchParams },
// 	});

// 	const dataCost = await resCost.json();

// 	return { props: { dataProvince, dataCity, dataCost } };
// }