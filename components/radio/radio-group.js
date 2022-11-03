import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const products = [
	{
		name: "Surya 12",
		description: "Rp. 22.500",
	},
	{
		name: "Juara",
		description: "Rp. 14.000",
	}
];

const couriers = [
	{
		name: "JNE",
		description:
			"2 layanan tersedia : pengecekan  OKE (Ongkos Kirim Ekonomis) dan REG (Layanan Regular)",
	},
	{
		name: "POS Indonesia",
		description: "1 layanan tersedia : pengecekan  POS Regular (Regular Service)",
	},
	{
		name: "TIKI",
		description:
			"3 layanan tersedia : pengecekan  ECO (Economy Service), REG dan ONS (Over Night Service)",
	},
];

export default function RadioGroupComponent( { variant }) {

	const pickedVariant = variant === "products" ? products : couriers;
	const [selected, setSelected] = useState(pickedVariant[0]);
	
	return (
		<div className="flex w-full">
			<div className="w-full">
				<RadioGroup
				className="space-x-4"
					value={selected}
					onChange={(event) => {
						setSelected(event);
						console.log(event.name + " " + event.description);
					}}
				>
					{/* <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label> */}
					<div className="space-y-4">
						{pickedVariant.map((pickedVariant) => (
							<RadioGroup.Option
								key={pickedVariant.name}
								value={pickedVariant}
								className={({ active, checked }) =>
									`${
										active
											? ""
											: ""
									}
                  ${
										checked
											? "bg-indigo-600 text-white"
											: "bg-white"
									}
                    relative flex cursor-pointer rounded-lg px-5 py-3.5 shadow-md focus:outline-none`
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
														{pickedVariant.name}
													</RadioGroup.Label>
													<RadioGroup.Description
														as="span"
														className={`inline ${
															checked ? "text-white" : "text-gray-500"
														} text-xs`}
													>
														<span>
															{pickedVariant.description}
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
