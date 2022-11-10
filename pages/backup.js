export default function Backup() {
	return (
		<>
			{/* 
				
			<div className="text-xs pt-6 text-gray-500">
				Notes : simpan invoice sebagai bukti
				pengisian produk, jika dibutuhkan.{" "}
				<span
					className="text-primary cursor-pointer hover:underline"
					onClick={(event) => {
						event.preventDefault();
						html2canvas(
							document.querySelector(
								"#invoice-pembelian-produk"
							)
						).then((canvas) => {
							saveAsImage(
								canvas.toDataURL(),
								"invoice-pembelian-produk.png"
							);
						});
					}}
				>
					Download Invoice Pengisian Produk
				</span>
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
				<label className="ml-2 text-xs font-medium text-gray-500">
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
				className="w-full bg-primary shadow-primary p-2 rounded-lg text-white"
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
			*/}
		</>
	);
}
