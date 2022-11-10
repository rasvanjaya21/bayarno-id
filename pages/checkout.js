import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Combobox, Dialog, Popover, RadioGroup, Transition } from "@headlessui/react";
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
	PhotoIcon,
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
	ChevronUpDownIcon,
	CreditCardIcon,
	MinusIcon,
	PlusIcon,
	XCircleIcon,
} from "@heroicons/react/20/solid";

import CheckIcon from "../components/icon/check-icon";
import html2canvas from "html2canvas";

import DialogModal from "../components/modal/dialog-modal";

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

	const TEST_SITE_KEY = "6LeE8M8iAAAAAMz7cfo_1e7kc00DreSa6Ly8Jg-u";

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const [isNavOpen, setIsNavOpen] = useState(false);

	const [processState, setProcessState] = useState("gallery");
	const [isPickedProductDone, setIsPickedProductDone] = useState(false);
	const [isAgreeProduct, setIsAgreeProduct] = useState(false);

	const [pickedProduct, setPickedProduct] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");

	const [pickedVariantProduct, setPickedVariantProduct] = useState("");
	const [selectedVariantProduct, setSelectedVariantProduct] = useState("");

	const [pickedQuantityProduct, setPickedQuantityProduct] = useState(1);

	const [totalProductCost, setTotalProductCost] = useState(0);

	const timestampProduct = Date.now(); // This would be the timestamp you want to format

	const [isOpen, setIsOpen] = useState(false);

	const [pickedReceiverName, setPickedReceiverName] = useState("");
	const [pickedReceiverWhatsApp, setPickedReceiverWhatsApp] = useState("");
	const [pickedReceiverAddress, setPickedReceiverAddress] = useState("");

	const [dataProvince, setDataProvince] = useState("");
	const [pickedReceiverProvince, setPickedReceiverProvince] = useState(dataProvince);
	const [queryDataProvince, setQueryDataProvince] = useState("");

	const filteredDataProvince = queryDataProvince === "" ? dataProvince : dataProvince.filter((items) => items.province.toLowerCase().includes(queryDataProvince.toLowerCase()));
	
	const [dataCity, setDataCity] = useState("");
	const [pickedReceiverCity, setPickedReceiverCity] = useState(dataCity);
	const [queryDataCity, setQueryDataCity] = useState("");

	const filteredDataCity = queryDataCity === "" ? dataCity : dataCity.filter((items) => items.city_name.toLowerCase().includes(queryDataCity.toLowerCase()));

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

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	useEffect(() => {

		// if isNavOpen is true then add overflow-hidden class to body
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
		console.log("selected data Provinsi", pickedReceiverProvince ? pickedReceiverProvince : "kosong");
		console.log("selected data City", pickedReceiverCity ? pickedReceiverCity : "kosong");
		console.log("length of datacity", dataCity.length);
		console.log("filtered data city", filteredDataCity);

	}, [scrollPosition, isScrolled, pickedReceiverProvince, pickedReceiverCity, dataCity, filteredDataCity, isNavOpen]);

	useEffect(() => {
		if (processState === "products") {
			nProgress.done();
			window.scrollTo(0, 0);
		} else if (processState === "address") {
			nProgress.done();
			window.scrollTo(0, 0);
		}
	}, [processState]);

	function getProvince() {
		
		if (dataProvince.length === 0) {
			fetch("https://bayarno.vercel.app/api/province", {
				method: "GET",
				headers: {
					keys: "bayarno.id",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.rajaongkir.status.code === 200) {
						// setDataCity(data.data);
						// nProgress.done();
						console.log("city ok");
						setDataProvince(data.rajaongkir.results);
						nProgress.done();
						setProcessState("address");
					} else {
						nProgress.done();
						console.log("city not ok");
					}
				})
				.catch((error) => console.log(error));

		} else {
			setProcessState("address");
			// openModal();
		}
	}

	function getCity() {
		fetch(`https://bayarno.vercel.app/api/city?provinsiId=${pickedReceiverProvince.province_id}`, {
			method: "GET",
			headers: {
				keys: "bayarno.id",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.rajaongkir.status.code === 200) {
					// setDataCity(data.data);
					// nProgress.done();
					console.log("ok");
					setDataCity(data.rajaongkir.results);
					nProgress.done();
					setProcessState("address");
				} else {
					nProgress.done();
					console.log("not ok");
				}
			})
			.catch((error) => console.log(error));
			console.log("data city length sama dengan 0");

			setProcessState("address");
			// openModal();
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

			<div className="w-screen">
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
									console.log("close nav");
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
													console.log("nav open");
													setIsNavOpen(true);
												}}
											>
												<Bars3Icon className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
								<div className="hidden md:ml-10 md:block md:space-x-8">
									{navigation.map((items) => (
										<Link
											key={items.name}
											href={items.href}
											className={`font-medium ${items.class}`}
											onClick={items.onClick}
										>
											{items.name}
										</Link>
									))}
								</div>
							</nav>
						</div>
						<main className="mx-auto mt-4">
							<div className="lg:flex-row w-12/12 w-full">
								{processState === "gallery" ? (
									<>
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
													<div className=" rounded-lg">
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
													<div className=" rounded-lg">
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
													<div className=" rounded-lg">
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
													<div className=" rounded-lg">
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
									</>
								) : processState === "products" ? (
									<>
										<DialogModal
											isOpen={isOpen}
											closeModal={closeModal}
											title={"Terjadi Kesalahan"}
											firstDescription={`Sepertinya anda belum memilih produk apapun. Silahkan pilih produk terlebih dahulu.`}
											secondDescription={`Harap menyetujui syarat dan ketentuan terlebih dahulu untuk melanjutkan proses pembelian.`}
										/>
										<div className="space-y-6 pb-32 md:pb-12">
											<div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-6 lg:w-12/12">
												<div className="flex-row w-12/12 lg:w-6/12 pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
													<div className="w-12/12">
														<div className="text-md text-primary-600	">
															# Pilih Produk
														</div>
														<div className="text-xs mb-4 text-gray-500">
															Tentukan produk yang tersedia yang ingin kamu beli
														</div>
														<div className="space-y-4">
															<div className="flex w-full">
																<div className="w-full">
																	<RadioGroup
																		className="space-x-4"
																		value={selectedProduct}
																		onChange={(event) => {
																			setSelectedProduct(event);
																			setPickedProduct(event);
																			console.log(event.name);
																		}}
																	>
																		<div className="space-y-4">
																			{dataProducts.product.map((product) => (
																				<RadioGroup.Option
																					key={product.name}
																					value={product}
																					className={({ active, checked }) =>
																						`${active ? "" : ""}
																					 ${
																							checked
																								? "bg-primary-600 text-white"
																								: "bg-white"
																						} relative flex cursor-pointer rounded-lg px-5 py-3.5 shadow-primary focus:outline-none`
																					}
																				>
																					{({ active, checked }) => (
																						<div className="flex w-full items-center justify-between">
																							<div className="flex items-center">
																								<div className="text-xs">
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
																							{checked && <CheckIcon />}
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
															Tentukan variant yang tersedia yang ingin kamu
															beli
														</div>
														{pickedProduct === "" ? (
															<div className="bg-red-400 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none">
																<div className="w-full">
																	<div className="text-xs font-medium text-white">
																		<>
																			<span className=" text-white">
																				Anda belum memilih produk
																			</span>
																		</>
																	</div>
																	<div className="inline-flex text-justify text-white/50 text-xs">
																		<>
																			Silakan pilih produk yang tersedia
																			terlebih dahulu untuk melanjutkan variant
																			produk
																		</>
																	</div>
																</div>
															</div>
														) : (
															<div className="space-y-4">
																{/* <RadioGroupcomponent
																	option="variant"
																	value={pickedVariantProduct}
																	onChange={(event) => {
																		setPickedVariantProduct(event);
																		setTotalProductCost(
																			event.description * pickedQuantityProduct
																		);
																		setIsPickedProductDone(true);
																	}}
																/> */}
																<div className="flex w-full">
																	<div className="w-full">
																		<RadioGroup
																			className="space-x-4"
																			value={selectedVariantProduct}
																			onChange={(event) => {
																				setSelectedVariantProduct(event);
																				setPickedVariantProduct(event);
																				setTotalProductCost(
																					event.price * pickedQuantityProduct
																				);
																				console.log(event.name);
																			}}
																		>
																			<div className="space-y-4">
																				{pickedProduct.variants.map(
																					(variant) => (
																						<RadioGroup.Option
																							key={variant.name}
																							value={variant}
																							className={({
																								active,
																								checked,
																							}) =>
																								`${active ? "" : ""}
																					 ${
																							checked
																								? "bg-primary-600 text-white"
																								: "bg-white"
																						} relative flex cursor-pointer rounded-lg px-5 py-3.5 shadow-primary focus:outline-none`
																							}
																						>
																							{({ active, checked }) => (
																								<div className="flex w-full items-center justify-between">
																									<div className="flex items-center">
																										<div className="text-xs">
																											<p
																												className={`font-medium  ${
																													checked
																														? "text-white"
																														: "text-gray-900"
																												}`}
																											>
																												{variant.name}
																											</p>
																											<span
																												className={`inline ${
																													checked
																														? "text-white"
																														: "text-gray-500"
																												} text-xs`}
																											>
																												<span className="text-justify">
																													{typeof variant.price ===
																													"number"
																														? `Rp. ${variant.price}.000`
																														: variant.price}
																												</span>
																											</span>
																										</div>
																									</div>
																									{checked && <CheckIcon />}
																								</div>
																							)}
																						</RadioGroup.Option>
																					)
																				)}
																			</div>
																		</RadioGroup>
																	</div>
																</div>
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
																	<div className="text-xs font-medium text-white">
																		<>
																			<span className="text-white">
																				Anda belum memilih variant
																			</span>
																		</>
																	</div>
																	<div className="inline-flex text-justify text-white/50 text-xs">
																		<>
																			Silakan pilih variant yang tersedia
																			terlebih dahulu untuk memborong produk
																		</>
																	</div>
																</div>
															</div>
														) : (
															<>
																<div className="w-full">
																	<div className="relative">
																		<div className="relative  py-5 text-xs w-full  overflow-hidden rounded-xl bg-white text-left shadow-primary ">
																			<div className="text-xs absolute inset-y-0 p-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center  bg-primary-600 w-fit">
																				Kuantitas
																			</div>
																			<div className="flex -m-5 pl-[105px] items-center h-10 text-md select-none">
																				{pickedQuantityProduct} pieces
																			</div>

																			<div className="absolute inset-y-0 right-12 flex items-center ">
																				<MinusIcon
																					className="bg-primary-700/10 rounded-xl p-2 h-8 w-8 text-primary cursor-pointer"
																					aria-hidden="true"
																					onClick={(event) => {
																						console.log("minus");
																						if (pickedQuantityProduct > 1) {
																							setPickedQuantityProduct(
																								pickedQuantityProduct - 1
																							);
																							setTotalProductCost(
																								totalProductCost -
																									pickedVariantProduct.price
																							);
																						}
																					}}
																				/>
																			</div>
																			<div className="absolute inset-y-0 right-0 flex items-center pr-2">
																				<PlusIcon
																					className="bg-primary-700/10 rounded-xl p-2 h-8 w-8 text-primary cursor-pointer"
																					aria-hidden="true"
																					onClick={(event) => {
																						console.log("plus");
																						if (pickedQuantityProduct < 100) {
																							setPickedQuantityProduct(
																								pickedQuantityProduct + 1
																							);
																							setTotalProductCost(
																								totalProductCost +
																									pickedVariantProduct.price
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

												<div className="flex-row w-12/12 lg:w-6/12 pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
													<div className="w-12/12 ">
														<div className="text-md text-primary-600	">
															# Keterangan
														</div>
														<div className="text-xs mb-4 text-gray-500">
															Ringkasan produk yang tersedia yang kamu beli
														</div>
														{pickedProduct === "" ? (
															<div className="bg-red-400 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none">
																<div className="w-full">
																	<div className="text-xs text-white">
																		<span className="text-white font-medium px-1 uppercase">
																			RINCIAN PENGISIAN PRODUK
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
																		{`Anda belum memilih produk dan variant apapun.`}
																	</div>
																</div>
															</div>
														) : (
															<>
																<div
																	id="invoice-pembelian-produk"
																	className="bg-primary-600 rounded-lg px-5 py-3.5 shadow-primary focus:outline-none"
																>
																	<div className="w-full">
																		<div className="text-xs text-white">
																			<div className="flex  justify-between uppercase text-white">
																				Rincian pengisian Produk{" "}
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
																							{pickedQuantityProduct} pieces x{" "}
																							Rp. {pickedVariantProduct.price}
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
																				)}
																			</div>
																			<div className="border-t-2 my-3 border-dashed"></div>
																		</div>
																		{pickedVariantProduct === "" ? (
																			<>
																				<div className="inline-flex text-justify text-white/50 text-xs">
																					{`Selangkah lagi, silakan pilih variant dari produk ${pickedProduct.name} untuk melengkapi invoice`}
																				</div>
																				<div className="border-t-2 my-3 border-dashed"></div>
																				<div className="flex text-xs justify-between text-white/50">
																					© 2022 by bayarno.id
																					<span>
																						{Intl.DateTimeFormat("en-GB", {
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
																		) : (
																			<>
																				<div className="inline-flex text-justify text-white/50 text-xs">
																					{`Pembelian produk ${pickedVariantProduct.name} sebanyak ${pickedQuantityProduct} pieces siap untuk diproses.`}
																				</div>
																				<div className="border-t-2 my-3 border-dashed"></div>
																				<div className="flex text-xs justify-between text-white/50">
																					© 2022 by bayarno.id
																					<span>
																						{Intl.DateTimeFormat("en-GB", {
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
																			<span className="font-bold">Notes</span> :
																			harap mengecek kembali data yang telah di
																			input kan sebelum melanjutkan ke tahap
																			berikutnya.
																		</div>
																		<div className="border-t-2 my-6 border-dashed"></div>
																		<div className="flex items-center mb-6">
																			<input
																				type="checkbox"
																				defaultChecked={isAgreeProduct}
																				onChange={(event) => {
																					setIsAgreeProduct(!isAgreeProduct);
																				}}
																				className="w-4 h-4 text-blue-600 cursor-pointer"
																			/>
																			<label className="ml-2 text-xs text-gray-500">
																				Saya menyetujui
																				<span className="text-primary">
																					{" "}
																					syarat dan ketentuan{" "}
																				</span>
																				yang berlaku.
																			</label>
																		</div>
																		<button
																			type="submit"
																			className="w-full bg-primary shadow-primary p-2 rounded-lg text-white text-sm"
																			onClick={(event) => {
																				if (isAgreeProduct) {
																					nProgress.start();
																					setIsPickedProductDone(true);
																					getProvince();
																					// getCity();
																				} else {
																					openModal();
																				}
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
										</div>
									</>
								) : processState === "address" ? (
									<>
										<div className="space-y-6 pb-32 md:pb-12">
											<div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-6 lg:w-12/12">
												<div className="flex-row w-12/12 lg:w-6/12 pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
													<div className="w-12/12">
														<div className="lg:w-4/8 flex-auto ">
															<div className="text-md text-primary-600	">
																{"# Data Diri Penerima"}
															</div>
															<div className="text-xs mb-4 text-gray-500">
																{
																	"Pilih alamat Provinsi dan Kota asal pengiriman anda"
																}
															</div>
															<div className="space-y-4">
																{/* <ListProducts label="Nama Lengkap" /> */}
																<div className="w-full">
																	<div className="relative">
																		<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																			<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white bg-primary flex items-center  w-[115px]">
																				Nama Lengkap
																			</div>
																			<input
																				className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																				placeholder="Nama Penerima"
																				value={pickedReceiverName}
																				onChange={(event) => {
																					setPickedReceiverName(
																						event.target.value
																					);
																				}}
																			/>
																		</div>
																	</div>
																</div>
																<div className="w-full">
																	<div className="relative">
																		<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																			<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white bg-primary flex items-center  w-[115px]">
																				Nomor WhatsApp
																			</div>
																			<input
																				className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																				placeholder="08xxxxxxxxxx"
																				value={pickedReceiverWhatsApp}
																				onChange={(event) => {
																					setPickedReceiverWhatsApp(
																						event.target.value
																					);
																				}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="border-t-2 my-6 border-dashed"></div>

														<div className="lg:w-4/8 flex-auto">
															<div className="text-md text-primary-600	">
																{"# Alamat Penerima"}
															</div>
															<div className="text-xs mb-4 text-gray-500">
																{
																	"Pilih alamat Provinsi dan Kota tujuan pengiriman anda"
																}
															</div>
															<div className="space-y-4">
																<div className="w-full">
																	<div className="relative">
																		<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																			<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white bg-primary flex items-center  w-[115px]">
																				Alamat Lengkap
																			</div>
																			<input
																				className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																				placeholder="Jalan, Kelurahan, Kecamatan, Kode Pos"
																				value={pickedReceiverAddress}
																				onChange={(event) => {
																					setPickedReceiverAddress(
																						event.target.value
																					);
																				}}
																			/>
																		</div>
																	</div>
																</div>

																<div className="w-full">
																	<Combobox
																		value={pickedReceiverProvince}
																		onChange={setPickedReceiverProvince}
																	>
																		<div className="relative">
																			<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																				<Combobox.Input
																					className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																					displayValue={(items) =>
																						items.province
																					}
																					placeholder="Nama Provinsi"
																					onChange={(event) => {
																						setQueryDataProvince(
																							event.target.value
																						);
																						console.log(pickedReceiverProvince);
																						getCity();
																					}}
																				/>
																				<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center pr-2 bg-primary-600  w-[115px]">
																					Nama Provinsi
																				</div>
																				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
																					<ChevronUpDownIcon
																						className="h-5 w-5 text-gray-400"
																						aria-hidden="true"
																						onClick={(event) => {
																							getCity();
																						}}
																					/>
																				</Combobox.Button>
																			</div>
																			<Transition
																				as={Fragment}
																				leave="transition ease-in duration-100"
																				leaveFrom="opacity-100"
																				leaveTo="opacity-0"
																				afterLeave={(event) =>
																					setQueryDataProvince("")
																				}
																			>
																				<Combobox.Options className="z-10 scroll-smooth absolute mt-3 max-h-[270px] w-full overflow-auto rounded-md bg-white text-xs shadow-primary ring-1 ring-black ring-opacity-5">
																					{filteredDataProvince.length === 0 &&
																					queryDataProvince !== "" ? (
																						<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																							Data tidak ditemukan
																						</div>
																					) : (
																						// <></>
																						filteredDataProvince.map(
																							(items) => (
																								<Combobox.Option
																									key={items.province_id}
																									value={items}
																									className={({ active }) =>
																										`relative cursor-pointer select-none py-2 m-3 pl-3 pr-4 ${
																											active
																												? "bg-primary-600 text-white rounded-md"
																												: "text-gray-900"
																										}`
																									}
																								>
																									{({ selected, active }) => (
																										<>
																											<span
																												className={`block truncate ${
																													selected
																														? "font-medium"
																														: "font-normal"
																												}`}
																											>
																												{items.province}
																											</span>
																											{selected ? (
																												<span
																													className={`absolute inset-y-0 right-0 flex items-center mr-2 ${
																														active
																															? "text-white"
																															: "text-primary-600"
																													}`}
																												>
																													<CheckIcon
																														className="h-5 w-5"
																														aria-hidden="true"
																													/>
																												</span>
																											) : null}
																										</>
																									)}
																								</Combobox.Option>
																							)
																						)
																					)}
																				</Combobox.Options>
																			</Transition>
																		</div>
																	</Combobox>
																</div>

																<div className="w-full">
																	<Combobox
																		value={pickedReceiverCity}
																		onChange={setPickedReceiverCity}
																	>
																		<div className="relative">
																			<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																				{dataCity.length === 0 ? (
																					<input
																						disabled
																						className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																						placeholder="Nama Kota / Kabupaten"
																					/>
																				) : (
																					<Combobox.Input
																						className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																						displayValue={(items) =>
																							items.city_name
																						}
																						placeholder="Nama Kota / Kabupaten"
																						onChange={(event) => {
																							setQueryDataCity(
																								event.target.value
																							);
																							console.log(pickedReceiverCity);
																						}}
																					/>
																				)}

																				<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center pr-2 bg-primary-600  w-[115px]">
																					Kota / Kab
																				</div>
																				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
																					<ChevronUpDownIcon
																						className="h-5 w-5 text-gray-400"
																						aria-hidden="true"
																					/>
																				</Combobox.Button>
																			</div>
																			<Transition
																				as={Fragment}
																				leave="transition ease-in duration-100"
																				leaveFrom="opacity-100"
																				leaveTo="opacity-0"
																				afterLeave={(event) =>
																					setQueryDataCity("")
																				}
																			>
																				<Combobox.Options className="z-10 scroll-smooth absolute mt-3 max-h-[270px] w-full overflow-auto rounded-md bg-white text-xs shadow-primary ring-1 ring-black ring-opacity-5">
																					{pickedReceiverProvince === "" ? (
																						<button
																							disabled
																							className="relative cursor-default select-none py-2 px-4 text-gray-700"
																						>
																							Anda Belum Memilih Provinsi
																						</button>
																					) : filteredDataCity.length === 0 &&
																					  queryDataCity !== "" ? (
																						<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																							Data tidak ditemukan
																						</div>
																					) : (
																						// <></>
																						filteredDataCity.map((items) => (
																							<Combobox.Option
																								key={items.city_id}
																								value={items}
																								className={({ active }) =>
																									`relative cursor-pointer select-none py-2 m-3 pl-3 pr-4 ${
																										active
																											? "bg-primary-600 text-white rounded-md"
																											: "text-gray-900"
																									}`
																								}
																							>
																								{({ selected, active }) => (
																									<>
																										<span
																											className={`block truncate ${
																												selected
																													? "font-medium"
																													: "font-normal"
																											}`}
																										>
																											{items.city_name}
																										</span>
																										{selected ? (
																											<span
																												className={`absolute inset-y-0 right-0 flex items-center mr-2 ${
																													active
																														? "text-white"
																														: "text-primary-600"
																												}`}
																											>
																												<CheckIcon
																													className="h-5 w-5"
																													aria-hidden="true"
																												/>
																											</span>
																										) : null}
																									</>
																								)}
																							</Combobox.Option>
																						))
																					)}
																				</Combobox.Options>
																			</Transition>
																		</div>
																	</Combobox>
																</div>
															</div>
														</div>
														<div className="border-t-2 my-6 border-dashed"></div>

														<div className="lg:w-4/8 flex-auto">
															<div className="text-md text-primary-600	">
																{"# Catatan [ Opsional ]"}
															</div>
															<div className="text-xs mb-4 text-gray-500">
																{
																	"Pilih alamat Provinsi dan Kota tujuan pengiriman anda"
																}
															</div>
															<div className="space-y-4">
																<div className="w-full">
																	<div className="relative">
																		<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
																			<div className="text-xs absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white bg-primary flex items-center  w-[115px]">
																				Catatan Penerima
																			</div>
																			<input
																				className="w-full border-none py-2 pl-[127px] pr-2 text-xs leading-5 text-gray-900 focus:ring-0 outline-none"
																				placeholder="Catatan Khusus Jika Ada"
																				onChange={(event) => {}}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="flex-row w-12/12 lg:w-6/12 pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
													<div className="w-12/12 ">
														<div className="text-md text-primary-600	">
															# Keterangan
														</div>
														<div className="text-xs mb-4 text-gray-500">
															Ringkasan produk yang tersedia yang kamu beli
														</div>
														<div className="border-t-2 my-6 border-dashed"></div>
														<div>{pickedReceiverName}</div>
														<div>{pickedReceiverWhatsApp}</div>
														<div>{pickedReceiverAddress}</div>
														<div>{pickedReceiverProvince.province}</div>
														<div>{pickedReceiverCity.city_name}</div>
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
											<div className="border-t-2 border-dashed"></div>
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
											<div className="border-t-2 border-dashed"></div>
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
									<></>
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
												processState === "gallery" || isPickedProductDone
													? `flex-row justify-center mr-2 py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center mr-2 py-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												if (processState !== "gallery") {
													// nProgress.start();
													// setProcessState("order");
													setProcessState("gallery");
												}
											}}
										>
											<div className="flex place-content-center">
												<PhotoIcon
													className={`${
														processState === "gallery" || isPickedProductDone
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "gallery" || isPickedProductDone
														? `text-xs mt-1 text-center text-white `
														: `text-xs mt-1 text-center text-primary`
												}`}
											>
												Galeri
											</div>
										</div>
										<div
											className={`${
												processState === "products" || isPickedProductDone
													? `flex-row justify-center mr-2 py-3 bg-primary rounded-xl w-3/12 cursor-pointer shadow-primary`
													: `flex-row justify-center mr-2 py-3 bg-primary-700 bg-opacity-10 rounded-xl w-3/12 cursor-pointer`
											}`}
											onClick={(event) => {
												if (processState !== "products") {
													nProgress.start();
													// setProcessState("order");
													setProcessState("products");
												}
											}}
										>
											<div className="flex place-content-center">
												<ShoppingCartIcon
													className={`${
														processState === "products" || isPickedProductDone
															? `h-5 w-5 text-white `
															: `h-5 w-5 text-primary`
													}`}
												/>
											</div>
											<div
												className={`${
													processState === "products" || isPickedProductDone
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
												if (isAgreeProduct) {
													nProgress.start();
													setIsPickedProductDone(true);
													getProvince();
													// getCity();
												} else {
													openModal();
												}
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
nProgress.start();
// Router.events(event);

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

export async function getStaticProps() {
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
