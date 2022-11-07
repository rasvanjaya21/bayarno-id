import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	ShoppingCartIcon,
	BookmarkIcon,
	CalculatorIcon,
	HeartIcon,
	RocketLaunchIcon,
	ShoppingBagIcon,
	XMarkIcon,
	TagIcon,
} from "@heroicons/react/24/outline";
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
import InputAddress from "../components/input/input-address";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import {
	CreditCardIcon,
	MinusIcon,
	PlusIcon,
	XCircleIcon,
} from "@heroicons/react/20/solid";

import CheckIcon from "../components/svg/check-icon";
import html2canvas from "html2canvas";

export default function Checkout({ dataProducts }) {
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

	const [pageState, setPageState] = useState();
	const [endPoint, setEndPoint] = useState(`/province`);
	const [filterCity, setFilterCity] = useState("");

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const [isNavOpen, setIsNavOpen] = useState(false);

	const [processState, setProcessState] = useState("products");

	const [pickedProduct, setPickedProduct] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");

	const [pickedVariantProduct, setPickedVariantProduct] = useState("");

	const [pickedQuantityProduct, setPickedQuantityProduct] = useState(1);

	const [totalProductCost, setTotalProductCost] = useState(0);

	const timestampProduct = Date.now(); // This would be the timestamp you want to format

	const TEST_SITE_KEY = "6LeE8M8iAAAAAMz7cfo_1e7kc00DreSa6Ly8Jg-u";

	function saveAsImage(uri, filename) {
		const link = document.createElement("a");

		link.href = uri;
		link.download = filename;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function handleScroll() {
		const position = window.pageYOffset;
		setScrollPosition(position);
	}

	function onChange(value) {
		// console.log("Captcha value:", value);
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		if (scrollPosition > 5) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	}, [scrollPosition, isScrolled]);
	
	useEffect(() => {
			
	}, []);

	async function getCity() {

		// nProgress.start();
		
		const response = await fetch(`https://bayarno.vercel.app/api/city`, {
			method: "GET",
			headers: {
				keys: "bayarno.id",
			},
		});

		nProgress.done();
		
		// if (response.ok) {
		// 	// nProgress.done();
		// 	console.log("ok");
		// 	nProgress.done();
		// } else {
		// 	nProgress.done();
		// 	console.log("not ok");
		// }

		const data = await response.json();

		const randomNumber = Math.floor(Math.random() * 500) + 1;

		alert(data.rajaongkir.results[randomNumber].city_name);
	}

	async function getProvince() {
		nProgress.start();

		const response = await fetch("https://bayarno.vercel.app/api/province");
		if (response.ok) {
			// console.log("ok");
			nProgress.done();
		} else {
			nProgress.done();
			// console.log("not ok");
		}

		const data = await response.json();

		const randomNumber = Math.floor(Math.random() * 33) + 1;
		// alert(data.rajaongkir.results[randomNumber].province);

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

			<div className="overflow-hidden w-screen">
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
				<div className="mx-auto">
					<div className="absolute min-w-fit w-full left-0 right-0 sm:right-0 p-4 pt-24 sm:px-14 md:p-24 lg:pr-20 3xl:pr-24 md:mt-10">
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
						<main className="mx-auto mt-4">
							<div className="lg:flex-row w-12/12 w-full">
								{processState === "products" ? (
									<>
										<div className="space-y-4 pb-32 md:pb-12">
											<div className="flex-row w-12/12  pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Preview Produk
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Daftar produk yang kami tawarkan
													</div>
												</div>
												<div className="flex flex-col sm:flex-row w-12/12 space-x-0 sm:space-x-2 lg:space-x-3">
													<div className="hidden sm:flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg hover:shadow-primary hover:transition-all duration-300"
																src="/first-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																priority={true}
															/>
														</div>
													</div>

													<div className="hidden sm:flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg hover:shadow-primary hover:transition-all duration-300"
																src="/second-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																priority={true}
															/>
														</div>
													</div>

													<div className="hidden sm:flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg hover:shadow-primary hover:transition-all duration-300"
																src="/third-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																priority={true}
															/>
														</div>
													</div>

													<div className="hidden sm:flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg hover:shadow-primary hover:transition-all duration-300"
																src="/fourth-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																priority={true}
															/>
														</div>
													</div>
													<div className="flex flex-col lg:w-4/12 sm:hidden rounded-xl shadow-primary">
														<Swiper
															className="rounded-xl"
															spaceBetween={30}
															autoplay={{
																delay: 2500,
																disableOnInteraction: false,
															}}
															modules={[Autoplay]}
														>
															<SwiperSlide className="rounded-xl"></SwiperSlide>
															<SwiperSlide className="rounded-xl"></SwiperSlide>
															<SwiperSlide className="rounded-xl"></SwiperSlide>
															<SwiperSlide className="rounded-xl"></SwiperSlide>
														</Swiper>
													</div>
												</div>
											</div>

											<div className="flex-row w-12/12  pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Pilih Produk
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Tentukan produk yang tersedia yang ingin kamu beli
													</div>
													<div className="space-y-4">
														{/* <RadioGroupcomponent
															value={pickedProduct}
															option="product"
															onChange={(event) => {
																setPickedProduct(event);
															}}
														/> */}
														<div className="flex w-full">
															<div className="w-full">
																<RadioGroup
																	className="space-x-4"
																	value={selectedProduct}
																	onChange={(event) => {
																		setSelectedProduct(event);
																		setPickedProduct(event);
																	}}
																>
																	<div className="space-y-4">
																		{dataProducts.product.map((product) => (
																			<RadioGroup.Option
																				key={product.name}
																				value={product}
																				className={({ active, checked }) =>
																					`${active ? "" : ""}
																					 ${checked ? "bg-primary-600 text-white" : "bg-white"} relative flex cursor-pointer rounded-lg px-5 py-3.5 shadow-primary focus:outline-none`
																				}
																			>
																				{({ active, checked }) => (
																					
																						<div className="flex w-full items-center justify-between">
																							<div className="flex items-center">
																								<div className="text-sm">
																									<p
																										className={`font-medium  ${
																											checked
																												? "text-white"
																												: "text-gray-900"
																										}`}
																									>
																										{product.name}
																									</p>
																									<span
																										className={`inline ${
																											checked
																												? "text-white"
																												: "text-gray-500"
																										} text-xs`}
																									>
																										<span className="text-justify">
																											{typeof product.description ===
																											"number"
																												? `Rp. ${product.description}.000`
																												: product.description}
																										</span>
																									</span>
																								</div>
																							</div>
																							{checked && (
																								<CheckIcon/>
																							)}
																						</div>
																					
																				)}
																			</RadioGroup.Option>
																		))}
																	</div>
																</RadioGroup>
															</div>
														</div>
													</div>
												</div>
												<div className="border-t-2 my-6 border-dashed"></div>
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Pilih Variant
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Tentukan variant yang tersedia yang ingin kamu beli
													</div>
													{pickedProduct === "" ? (
														<div className="bg-red-400 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none">
															<div className="w-full">
																<div className="text-sm font-medium text-white">
																	<>
																		<span className="bg-white/80 text-red-400 px-1">
																			Anda belum memilih produk
																		</span>
																	</>
																</div>
																<div className="inline-flex text-justify text-white/50 text-xs">
																	<>
																		Silakan pilih produk yang tersedia terlebih
																		dahulu untuk melanjutkan variant produk
																	</>
																</div>
															</div>
														</div>
													) : (
														<div className="space-y-4">
															<RadioGroupcomponent
																option="variant"
																value={pickedVariantProduct}
																onChange={(event) => {
																	setPickedVariantProduct(event);
																	setTotalProductCost(
																		event.description * pickedQuantityProduct
																	);
																}}
															/>
														</div>
													)}
												</div>
												<div className="border-t-2 my-6 border-dashed"></div>
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Jumlah Produk
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Terakhir, tentukan jumlah produk yang ingin kamu
														beli
													</div>
													{pickedVariantProduct === "" ? (
														<div className="bg-red-400 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none">
															<div className="w-full">
																<div className="text-sm font-medium text-white">
																	<>
																		<span className="bg-white/80 text-red-400 px-1">
																			Anda belum memilih variant
																		</span>
																	</>
																</div>
																<div className="inline-flex text-justify text-white/50 text-xs">
																	<>
																		Silakan pilih variant yang tersedia terlebih
																		dahulu untuk memborong produk
																	</>
																</div>
															</div>
														</div>
													) : (
														<>
															<div className="w-full">
																<div className="relative">
																	<div className="relative  py-5 text-sm w-full  overflow-hidden rounded-xl bg-white text-left shadow-primary  sm:text-sm">
																		<div className="text-xs absolute inset-y-0 p-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center  bg-primary-600 w-fit">
																			Kuantitas
																		</div>
																		<div className="flex -m-5 pl-[105px] items-center h-10 text-md select-none">
																			{pickedQuantityProduct} bungkus
																		</div>

																		<div className="absolute inset-y-0 right-12 flex items-center ">
																			<MinusIcon
																				className="bg-primary-700/10 rounded p-2 h-8 w-8 text-primary cursor-pointer"
																				aria-hidden="true"
																				onClick={() => {
																					if (pickedQuantityProduct > 1) {
																						setPickedQuantityProduct(
																							pickedQuantityProduct - 1
																						);
																						setTotalProductCost(
																							totalProductCost -
																								pickedVariantProduct.description
																						);
																					}
																				}}
																			/>
																		</div>
																		<div className="absolute inset-y-0 right-0 flex items-center pr-2">
																			<PlusIcon
																				className="bg-primary-700/10 rounded p-2 h-8 w-8 text-primary cursor-pointer"
																				aria-hidden="true"
																				onClick={(event) => {
																					event;
																					if (pickedQuantityProduct < 100) {
																						setPickedQuantityProduct(
																							pickedQuantityProduct + 1
																						);
																						setTotalProductCost(
																							totalProductCost +
																								pickedVariantProduct.description
																						);
																					}
																				}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</>
													)}
												</div>
											</div>

											<div className="flex-row w-12/12  pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Keterangan
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Ringkasan produk yang tersedia yang kamu beli
													</div>
													{pickedProduct === "" ? (
														<div className="bg-red-400 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none">
															<div className="w-full">
																<div className="text-sm font-medium text-white">
																	<span className="bg-white/80 text-red-400 px-1">
																		Invoice Produk, Variant, dan Kuantitas
																	</span>

																	<div className="border-t-2 my-3 border-dashed"></div>
																	<div className="text-md flex justify-between ">
																		<div>PRODUK</div>
																		<div>NaN</div>
																	</div>
																	<div className="text-md flex justify-between ">
																		<div>VARIANT</div>
																		<div>NaN</div>
																	</div>
																	<div className="border-t-2 my-3 border-dashed"></div>

																	<div className="text-md flex justify-between ">
																		<div>KUANTITAS</div>
																		<div>NaN</div>
																	</div>
																	<div className="text-md flex justify-between ">
																		<div>TOTAL HARGA</div>
																		<div>NaN</div>
																	</div>
																	<div className="border-t-2 my-3 border-dashed"></div>
																</div>
																<div className="inline-flex text-justify text-white/50 text-xs">
																	{`Silakan pilih setidaknya produk terlebih dahulu untuk melengkapi invoice`}
																</div>
															</div>
														</div>
													) : (
														<>
															<div
																id="invoice-pemilihan-produk"
																className="bg-emerald-600 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none"
															>
																<div className="w-full">
																	<div className="text-sm font-medium text-white">
																		<div className="flex justify-between uppercase text-white">
																			Invoice Pemilihan Produk{" "}
																			<span>
																				<CreditCardIcon className="w-4 h-4 inline-block" />
																			</span>
																		</div>

																		<div className="border-t-2 my-3 border-dashed"></div>
																		<div className="text-md flex justify-between ">
																			<div>PRODUK</div>
																			<div>{pickedProduct.name}</div>
																		</div>
																		<div className="text-md flex justify-between ">
																			<div>VARIANT</div>
																			{pickedVariantProduct === "" ? (
																				<div>NaN</div>
																			) : (
																				<div>{pickedVariantProduct.name}</div>
																			)}
																		</div>
																		<div className="border-t-2 my-3 border-dashed"></div>

																		<div className="text-md flex justify-between ">
																			<div>KUANTITAS</div>
																			<div>
																				{pickedVariantProduct === "" ? (
																					<div>NaN</div>
																				) : (
																					<div>
																						{pickedQuantityProduct} Bungkus x{" "}
																						Rp.{" "}
																						{pickedVariantProduct.description}
																						.000
																					</div>
																				)}
																			</div>
																		</div>
																		<div className="text-md flex justify-between ">
																			<div>TOTAL HARGA</div>
																			{pickedVariantProduct === "" ? (
																				<div>NaN</div>
																			) : (
																				(console.log(pickedVariantProduct.name),
																				(
																					<div>
																						{totalProductCost > 1000 ? (
																							<>
																								{/* slice a number */}
																								Rp.{" "}
																								{totalProductCost
																									.toString()
																									.slice(0, -3)}
																								.
																								{totalProductCost
																									.toString()
																									.slice(-3)}
																								.000
																							</>
																						) : (
																							<>
																								Rp. {totalProductCost}
																								.000
																							</>
																						)}
																					</div>
																				))
																			)}
																		</div>
																		<div className="border-t-2 my-3 border-dashed"></div>
																	</div>
																	{pickedVariantProduct === "" ? (
																		<div className="inline-flex text-justify text-white/50 text-xs">
																			{`NaN :  Anda telah memilih produk ${pickedProduct.name} tapi belum memilih varian produknya. Silahkan pilih varian produk terlebih dahulu.`}
																		</div>
																	) : (
																		<>
																			<div className="inline-flex text-justify text-white/50 text-xs">
																				{`Pembelian produk ${pickedVariantProduct.name} sebanyak ${pickedQuantityProduct} bungkus siap diproses. Silakan
																	tekan tombol "Lanjutkan Proses" untuk menuju ke
																	halaman berikutnya / melalui tombol
																	navigasi dibawah`}
																			</div>
																			<div className="border-t-2 my-3 border-dashed"></div>
																			<div className="flex text-xs justify-between text-white/50">
																				© 2022 by bayarno.id
																				<span>
																					{new Intl.DateTimeFormat("en-US", {
																						year: "numeric",
																						month: "2-digit",
																						day: "2-digit",
																						hour: "2-digit",
																						minute: "2-digit",
																						second: "2-digit",
																					}).format(timestampProduct)}
																				</span>
																			</div>
																		</>
																	)}
																</div>
															</div>
															{pickedVariantProduct === "" ? (
																<></>
															) : (
																<>
																	<div className="text-xs pt-6 text-gray-500">
																		Notes : simpan invoice sebagai bukti
																		pemilihan produk, jika dibutuhkan.{" "}
																		<span
																			className="text-primary cursor-pointer hover:underline"
																			onClick={(event) => {
																				event.preventDefault();
																				html2canvas(
																					document.querySelector(
																						"#invoice-pemilihan-produk"
																					)
																				).then((canvas) => {
																					saveAsImage(
																						canvas.toDataURL(),
																						"invoice-pemilihan-produk.png"
																					);
																				});
																			}}
																		>
																			Download Invoice Pemilihan Produk
																		</span>
																	</div>
																	<div className="border-t-2 my-6 border-dashed"></div>
																	<button
																		type="submit"
																		className="w-full bg-emerald-600 shadow-primary p-2 rounded-lg text-white"
																		onClick={(event) => {
																			event.preventDefault();
																			setProcessState("address");
																			getCity();
																			nProgress.start();
																		}}
																	>
																		Lanjutkan Proses
																	</button>
																</>
															)}
														</>
													)}
												</div>
											</div>
										</div>
									</>
								) : processState === "address" ? (
									<>
										<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
											<div className="text-md text-primary-600	">
												{"# Alamat dan Data Pengiriman"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												Silakan isi alamat lengkap dan data pengiriman anda
											</div>
											<div className="space-y-4">
												<div className="w-full ">
													<div className="relative">
														<div className="relative  py-5 text-sm w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
															<button className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center  bg-primary-600 w-full">
																{`Alamat Lengkap : Contoh : Jl. KH Syafi'i, Ds. Suci, Kec. Gresik`}
															</button>
															<button className="absolute inset-y-0 right-0 flex items-center pr-2">
																<BookmarkIcon
																	className="h-5 w-5 text-white"
																	aria-hidden="true"
																/>
															</button>
														</div>
													</div>
												</div>
												<div className="w-full ">
													<div className="relative">
														<div className="relative w-full cursor-default h-fit overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
															<input
																placeholder="Contoh : Jl. KH Syafi'i, Ds. Suci, Kec. Gresik"
																className="w-full border-none py-2  pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
																onChange={(event) =>
																	console.log(event.target.value)
																}
															/>
															<button className="absolute inset-y-0 right-0 flex items-center pr-2">
																<BookmarkIcon
																	className="h-5 w-5 text-gray-400"
																	aria-hidden="true"
																/>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								) : processState === "postage" ? (
									<div className="lg:w-8/12 bg-blue-50 bg-opacity-90 rounded-xl lg:mr-12">
										<div className="lg:flex">
											<div className="lg:w-4/8 flex-auto p-6 pt-4">
												<div className="text-md text-primary-600	">
													{"# Asal Pengiriman"}
												</div>
												<div className="text-xs mb-4 text-gray-500">
													{
														"Pilih alamat Provinsi dan Kota asal pengiriman anda"
													}
												</div>
												<div className="space-y-4">
													<ListProducts label="Provinsi" />
													<ListProducts label="Kota/Kab" />
												</div>
											</div>
											<div className="lg:w-4/8 flex-auto p-6">
												<div className="text-md text-primary-600	">
													{"# Tujuan Pengiriman"}
												</div>
												<div className="text-xs mb-4 text-gray-500">
													{
														"Pilih alamat Provinsi dan Kota tujuan pengiriman anda"
													}
												</div>
												<div className="space-y-4">
													<ListProducts label="Provinsi" />
													<ListProducts label="Kota/Kab" />
												</div>
											</div>
										</div>
										<div className="lg:w-4/8 flex-auto px-6">
											<div className="border-t-2 border-dashed">
												{/* {"# Tujuan Pengiriman"} */}
											</div>
										</div>
										<div className="lg:w-4/8 flex-auto pt-4 p-6">
											<div className="text-md text-primary-600	">
												{"# Ekspedisi Pengiriman"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												{"Tentukan jasa pengiriman anda yang tersedia"}
											</div>
											<div className="space-y-4">
												<RadioGroupcomponent option="courier" />
											</div>
										</div>
										<div className="lg:w-4/8 flex-auto px-6">
											<div className="border-t-2 border-dashed">
												{/* {"# Tujuan Pengiriman"} */}
											</div>
										</div>
										<div className="lg:flex">
											<div className="lg:w-4/8 flex-auto pt-4 p-6">
												<div className="text-md text-primary-600	">
													{"# Berat Barang"}
												</div>
												<div className="text-xs mb-4 text-gray-500">
													{"Masukkan berat barang anda"}
												</div>
												<div className="space-y-4">
													<ListProducts label="Berat (gr)" />
												</div>
												<div className="text-xs mt-6 text-gray-500">
													* Pastikan anda mengisi dengan satuan{" "}
													<span className="font-bold">gram</span>
												</div>
											</div>
											<div className="lg:w-4/8 flex-auto pt-4 p-6">
												<div className="text-md text-primary-600	">
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
								) : processState === "order" ? (
									<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
										<div className="text-md text-primary-600	">
											{"# Hasil Pengecekan"}
										</div>
										<div className="text-xs mb-4 text-gray-500">
											Hasil pengecekan ongkos kirim dari{" "}
											<span className="font-bold text-primary-600	">Gresik</span>{" "}
											ke
											<span className="font-bold text-primary-600	">
												{" "}
												Jakarta
											</span>{" "}
											dengan berat{" "}
											<span className="font-bold text-primary-600	">
												1.000
											</span>{" "}
											gram (default)
										</div>
										<div className="space-y-4">
											<TabGroup />
										</div>
									</div>
								) : (
									<>{console.log("error")}</>
								)}
							</div>
							<div className="z-10 fixed w-full bottom-0 right-0 left-0 p-4 pb-0 pt-0 sm:px-14 sm:pt-0 md:px-24 md:pt-0 lg:p-10 lg:px-24 lg:pt-0 lg:pb-0 shadow-[0_0_3px_0_rgba(0,0,0,0.20)] bg-white/40 backdrop-blur-[15px]">
								<footer className=" items-center justify-between">
									<div className="border-solid conet h-10 w-full">
										<div className="flex h-full items-center border-b">
											<div className="flex-row">
												<div className=" text-xs text-gray-500">
													# Petunjuk : Bacalah keterangan pada masing - masing
													judul
												</div>
											</div>
										</div>
									</div>
									<div className="flex text-center w-12/12 m-3 mx-0 ">
										<div
											className={`${
												processState === "products"
													? `flex-row justify-center mr-2 py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center mr-2 py-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												setProcessState("products");
											}}
										>
											<div className="flex place-content-center">
												<ShoppingCartIcon
													className={`${
														processState === "products"
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "products"
														? `text-xs mt-1 text-center text-white `
														: `text-xs mt-1 text-center text-primary`
												}`}
											>
												Produk
											</div>
										</div>
										<div
											className={`${
												processState === "address"
													? `flex-row justify-center mr-2 py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center mr-2 py-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												setProcessState("address");
											}}
										>
											<div className="flex place-content-center">
												<BookmarkIcon
													className={`${
														processState === "address"
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "address"
														? `text-xs mt-1 text-center text-white `
														: `text-xs mt-1 text-center text-primary`
												}`}
											>
												Alamat
											</div>
										</div>
										<div
											className={`${
												processState === "postage"
													? `flex-row justify-center mr-2 py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center mr-2 py-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												setProcessState("postage");
											}}
										>
											<div className="flex place-content-center">
												<CalculatorIcon
													className={`${
														processState === "postage"
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "postage"
														? `text-xs mt-1 text-center text-white `
														: `text-xs mt-1 text-center text-primary`
												}`}
											>
												Ongkir
											</div>
										</div>
										<div
											className={`${
												processState === "order"
													? `flex-row justify-center py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center p-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												setProcessState("order");
											}}
										>
											<div className="flex place-content-center">
												<RocketLaunchIcon
													className={`${
														processState === "order"
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "order"
														? `text-xs mt-1 text-center text-white `
														: `text-xs mt-1 text-center text-primary`
												}`}
											>
												Pesan
											</div>
										</div>
									</div>
								</footer>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}

// {
// 	isLoading ? (
// 		<div
// 			className={
// 				isScrolled
// 					? `fixed z-30 h-screen w-full bg-white/40 backdrop-blur-[10px]`
// 					: `fixed z-30 h-screen w-full bg-white/40 backdrop-blur-[10px]`
// 			}
// 		>
// 			<div className="flex h-screen w-full place-content-center">
// 				<div className="m-auto">
// 					<Logo />
// 				</div>
// 			</div>
// 		</div>
// 	) : (
// 		<div></div>
// 	);
// }

{
	/* <div className="flex lg:w-4/8  pt-0 p-6 pb-4 rounded-xl text-end items-center">
<div className="text-md text-primary-600	">
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
</div> */
}

// export async function getStaticProps() {

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

export async function getServerSideProps() {
	const resProducts = await fetch(`https://bayarno.vercel.app/api/products`, {
		headers: {
			keys: "bayarno.id",
		},
	});

	const dataProducts = await resProducts.json();

	// console.log(dataProducts);
	// console.log(dataProducts.products.map((product) => product.variants));

	return {
		props: {
			dataProducts,
		},
	};
}
