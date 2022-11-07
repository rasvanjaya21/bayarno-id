import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const product = [
	{
		name: "Seedperapat",
		description: "Tersedia 3 variant atau paket",
	}
];

const variant = [
	{
		name: "1 Box Seedperapat",
		description: 245,
	},
	{
		name: "2 Box Seedperapat",
		description: 450,
	},
	{
		name: "4 Box Seedperapat",
		description: 850,
	},
];

const needInput = [
	{
		name: "Anda Belum Memilih Produk",
		description: "Silahkan pilih produk terlebih dahulu untuk melihat variant yang tersedia dan melanjutkan ke proses berikutnya",
	},
];

const nullOption = [
	{
		name: "Produk Belum Teresedia",
	}
]

export default function RadioGroupComponent({ option, onChange }) {
	const pickedOption =
		option === "product"
			? product
			: option === "variant"
			? variant
			: option === ""
			? needInput
			: nullOption;

	const [selected, setSelected] = useState();

	console.log(pickedOption);

	return (
		<div className="flex w-full">
			<div className="w-full">
				<RadioGroup
					className="space-x-4"
					value={selected}
					onChange={(event) => {
						console.log(event.name);
						setSelected(event);
						onChange(event);
					}}
				>
					<div className="space-y-4">
						{pickedOption.map((pickedOption) => (
							<RadioGroup.Option
								key={pickedOption.name}
								value={pickedOption}
								className={({ active, checked }) =>
									`${active ? "" : ""}
                  ${checked ? "bg-primary-600 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-3.5 shadow-primary focus:outline-none`
								}
							>
								{({ active, checked }) => (
									<>
										<div className="flex w-full items-center justify-between">
											<div className="flex items-center">
												<div className="text-sm">
													<RadioGroup.Label
														as="p"
														className={`font-medium  ${
															checked ? "text-white" : "text-gray-900"
														}`}
													>
														{pickedOption.name}
													</RadioGroup.Label>
													<RadioGroup.Description
														as="span"
														className={`inline ${
															checked ? "text-white" : "text-gray-500"
														} text-xs`}
													>
														<span className="text-justify">
															{typeof pickedOption.description === "number" ? (
																`Rp. ${pickedOption.description}.000`
															) : (
																pickedOption.description
															)}
														</span>
													</RadioGroup.Description>
												</div>
											</div>
											{checked && (
												<div className="shrink-0 text-white">
													<CheckIcon className="h-6 w-6" />
												</div>
											)}
										</div>
									</>
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}

function CheckIcon(props) {
	return (
		<svg viewBox="0 0 24 24" fill="none" {...props}>
			<circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
			<path
				d="M7 13l3 3 7-7"
				stroke="#fff"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
