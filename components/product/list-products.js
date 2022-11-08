import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
	{ id: 1, name: "Gresik" },
	{ id: 2, name: "Surabaya" },
	{ id: 3, name: "Sidoarjo" },
	{ id: 4, name: "Lamongan" },
	{ id: 5, name: "Tuban" },
	{ id: 6, name: "Bojonegoro" },
	{ id: 7, name: "Jombang" },
	{ id: 8, name: "Mojokerto" },
	{ id: 9, name: "Malang" },
	{ id: 10, name: "Blitar" },
	{ id: 11, name: "Kediri" },
	{ id: 12, name: "Banyuwangi" },
	{ id: 13, name: "Bondowoso" },
	{ id: 14, name: "Jember" },
	{ id: 15, name: "Lumajang" },
	{ id: 16, name: "Pamekasan" },
	{ id: 17, name: "Pasuruan" },
	{ id: 18, name: "Probolinggo" },
	{ id: 19, name: "Sampang" },
	{ id: 20, name: "Sidoarjo" },
	{ id: 21, name: "Situbondo" },
	{ id: 22, name: "Sumenep" },
	{ id: 23, name: "Trenggalek" },
];

export default function ListProducts( { label, data } ) {

	// console.log( data );
	const [selected, setSelected] = useState(people[0]);
	const [query, setQuery] = useState("");

	const filteredPeople =
		query === ""
			? people
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	const pickedLabel = label;

	// console.log( filteredPeople );
	
	return (
		<div className="w-full">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative">
					<div className="relative w-full cursor-default overflow-hidden rounded-xl bg-white text-left shadow-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full border-none py-2 pl-[97px] pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
							displayValue={(person) => person.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="text-sm absolute inset-y-0 pl-3 m-[3px] rounded-tl-lg rounded-bl-lg text-white flex items-center pr-2 bg-primary-600 w-[87px]">
							{pickedLabel} 
							<div className="ml-auto">
								:
							</div>
						</Combobox.Button>
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
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="z-10 scroll-smooth absolute mt-3 max-h-[270px] w-full overflow-auto rounded-md bg-white text-base shadow-primary ring-1 ring-black ring-opacity-5  sm:text-sm">
							{filteredPeople.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Data tidak ditemukan.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 m-3 pl-3 pr-4 ${
												active
													? "bg-primary-600 text-white rounded-md"
													: "text-gray-900"
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 right-0 flex items-center mr-2 ${
															active ? "text-white" : "text-primary-600"
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
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
	);
}
