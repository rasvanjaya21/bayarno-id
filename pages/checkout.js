import Head from "next/head";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	BookmarkIcon,
	CalculatorIcon,
	HeartIcon,
	RocketLaunchIcon,
	ShoppingBagIcon,
	XMarkIcon,
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
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import InputAddress from "../components/input/input-address";
import Image from "next/image";

export default function Checkout() {
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

	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isScrolled, setIsScrolled] = React.useState(false);

	const [isNavOpen, setIsNavOpen] = React.useState(false);

	const [processState, setProcessState] = React.useState("products");

	const [pickedProduct, setPickedProduct] = React.useState("");

	const [pickedVariantProduct, setPickedVariantProduct] = React.useState("");

	// const [fadeUp, setFadeUp] = React.useState("block pt-0");

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	const TEST_SITE_KEY = "6LeE8M8iAAAAAMz7cfo_1e7kc00DreSa6Ly8Jg-u";

	function onChange(value) {
		// console.log("Captcha value:", value);
	}

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		if (processState) {
			nProgress.done();
		} else {
			console.log("loading");
			nProgress.done();
		}

		if (scrollPosition > 5) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
		// getCity();
	}, [scrollPosition, isScrolled, processState]);

	async function getCity() {
		nProgress.start();

		const response = await fetch("https://bayarno.vercel.app/api/city");
		if (response.ok) {
			// console.log("ok");
			nProgress.done();
		} else {
			nProgress.done();
			// console.log("not ok");
		}

		const data = await response.json();
		const randomNumber = Math.floor(Math.random() * 500) + 1;

		// alert(data.rajaongkir.results[randomNumber].city_name);

		// alert(data[0].results);
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
										<div className="space-y-4">
											<div className="flex-row w-12/12  pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
												<div className="w-12/12">
													<div className="text-md text-primary-600	">
														# Preview Produk
													</div>
													<div className="text-xs mb-4 text-gray-500">
														Daftar produk yang kami tawarkan
													</div>
												</div>
												<div className="flex flex-col sm:flex-row w-12/12 space-x-0 space-y-5 lg:space-y-0 items-center lg:space-x-3">
													<div className="flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg"
																src="/first-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																objectFit="auto"
															/>
														</div>
													</div>

													<div className="flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg"
																src="/second-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																objectFit="contain"
															/>
														</div>
													</div>

													<div className="flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg"
																src="/third-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																objectFit="contain"
															/>
														</div>
													</div>

													<div className="flex flex-col lg:w-4/12">
														<div className="bg-white rounded-lg">
															<Image
																className="rounded-lg"
																src="/fourth-product-preview.png"
																width={314}
																height={384}
																alt="Preview Product"
																layout="cover"
																objectFit="contain"
															/>
														</div>
													</div>
												</div>
												<div className="border-t-2 my-4 border-dashed">
													{/* {"# Tujuan Pengiriman"} */}
												</div>
											</div>
											<div className="flex">
												<div className="flex flex-col bg-red-200 w-4/12">
													hey
												</div>

												<div className="flex flex-col bg-red-200 w-4/12">
													hey
												</div>

												<div className="flex flex-col bg-red-200 w-4/12">
													hey
												</div>
											</div>
										</div>
									</>
								) : // <div
								// 	className={`flex h-fit lg:w-12/12 lg:mr-4 space-y-4 pb-24`}
								// >
								// 	<div className="flex-auto sm:w-4/12 lg:w-4/8 md:w-4/12">
								// 		<div className=" flex-row pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
								// 			<div className="text-md text-primary-600	">
								// 				{"# Preview Produk"}
								// 			</div>
								// 			<div className="text-xs mb-4 text-gray-500">
								// 				{"Daftar produk yang kami tawarkan"}
								// 			</div>
								// 			<div className="bg-white rounded-lg h-fit">
								// 				<Image
								// 					className="rounded-lg"
								// 					src="/first-product-preview.png"
								// 					width={314}
								// 					height={384}
								// 					alt="Preview Product"
								// 					layout="cover"
								// 					objectFit="contain"
								// 				/>
								// 			</div>

								// 			<div className="border-t-2 my-4 border-dashed">
								// 				{/* {"# Tujuan Pengiriman"} */}
								// 			</div>
								// 			<div className="text-md text-primary-600	">
								// 				{"# Pilih Produk"}
								// 			</div>
								// 			<div className="text-xs mb-4 text-gray-500">
								// 				{"Tentukan produk yang tersedia yang ingin kamu beli"}
								// 			</div>
								// 		</div>
								// 	</div>
								// 	<div className="space-y-4">
								// 		<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
								// 			<div className="text-md text-primary-600	">
								// 				{"# Pilih Produk"}
								// 			</div>
								// 			<div className="text-xs mb-4 text-gray-500">
								// 				{"Tentukan produk yang tersedia yang ingin kamu beli"}
								// 			</div>
								// 			<div className="space-y-4">
								// 				<RadioGroupcomponent
								// 					variant="products"
								// 					onChange={(event) => {
								// 						setPickedProduct(event);
								// 					}}
								// 				/>
								// 			</div>
								// 		</div>
								// 		<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
								// 			<div className="text-md text-primary-600	">
								// 				{"# Pilih Variasi"}
								// 			</div>
								// 			<div className="text-xs mb-4 text-gray-500">
								// 				{
								// 					"Tentukan variasi yang tersedia yang ingin kamu beli"
								// 				}
								// 			</div>
								// 			<div className="space-y-4">
								// 				<RadioGroupcomponent
								// 					variant={pickedProduct}
								// 					onChange={(event) => {
								// 						// alert(event)
								// 						setPickedVariantProduct(event);
								// 					}}
								// 				/>
								// 			</div>
								// 		</div>
								// 		<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
								// 			<div className="text-md text-primary-600	">
								// 				{"# Keterangan"}
								// 			</div>
								// 			<div className="text-xs mb-4 text-gray-500">
								// 				{pickedVariantProduct && pickedProduct !== "" ? (
								// 					<>
								// 						{`Selamat anda telah memilih produk ${pickedProduct}} dan variasi ${pickedVariantProduct} yang tersedia, silakan menekan tombol "Lanjutkan" untuk menuju ke halaman berikutnya atau melalui tombol navigasi dibawah ini`}
								// 					</>
								// 				) : (
								// 					<>
								// 						{`Silakan pilih produk dan variasi yang tersedia`}
								// 					</>
								// 				)}
								// 			</div>
								// 			<div className="space-y-4">
								// 				<div className="lg:w-4/8 flex-auto ">
								// 					<button
								// 						type="submit"
								// 						className="w-full bg-primary-600 p-2 rounded-lg text-white"
								// 						onClick={(event) => {
								// 							event.preventDefault();
								// 							setProcessState("address");
								// 						}}
								// 					>
								// 						Lanjutkan Proses
								// 					</button>
								// 				</div>
								// 			</div>
								// 		</div>
								// 	</div>
								// </div>
								processState === "address" ? (
									<>
										<div className="lg:w-4/8 flex-auto pt-4 p-6 bg-blue-50 bg-opacity-90 rounded-xl">
											<div className="text-md text-primary-600	">
												{"# Alamat dan Data Pengiriman"}
											</div>
											<div className="text-xs mb-4 text-gray-500">
												Hasil pengecekan ongkos kirim dari{" "}
												<span className="font-bold text-primary-600	">
													Gresik
												</span>{" "}
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
													# Intruksi : Bacalah keterangan pada masing - masing
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

												if (processState === "products") {
													nProgress.done();
												} else {
													nProgress.start();
												}
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
												if (processState === "address") {
													nProgress.done();
												} else {
													nProgress.start();
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
												if (processState === "postage") {
													nProgress.done();
												} else {
													nProgress.start();
												}
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
												if (processState === "order") {
													nProgress.done();
												} else {
													// alert("Order");
													nProgress.start();
												}
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
