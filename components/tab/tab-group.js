import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function TabGroup() {
	let [categories] = useState({
		JNE: [
			{
				id: 1,
				title: "OKE : Ongkos Kirim Ekonomis",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 8.000",
			},
			{
				id: 2,
				title: "REG : Layanan Reguler",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 11.000",
			},
		],
		"POS": [
			{
				id: 1,
				title: "Pos Reguler : Regular Service",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 14.000",
			},
		],
		TIKI: [
			{
				id: 1,
				title: "ECO : Economy Service",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 10.000",
			},
			{
				id: 2,
				title: "REG : Layanan Reguler",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 8.000",
			},
			{
				id: 3,
				title: "ONS : Over Night Service",
				route: "Gresik - Surabaya",
				weight: "1.000 Gram",
				etd: "1 - 2 Hari",
				cost: "Rp. 17.000",
			},
		],
	});

	return (
		<div className="w-full">
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-white p-[4px]">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
									selected ? "bg-primary-600 outline-none" : "text-gray-600"
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2">
					{Object.values(categories).map((posts, idx) => (
						<Tab.Panel
							key={idx}
							className={classNames("rounded-xl bg-white p-3 py-1 shadow-lg")}
						>
							<ul>
								{posts.map((post) => (
									<li
										key={post.id}
										className="relative rounded-md p-3 pointer-events-none"
									>
										<h3 className="text-sm font-medium leading-5">
											{post.title}
										</h3>

										<ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
											<li>{post.route}</li>
											<li>&middot;</li>
											<li>{post.weight}</li>
											<li>&middot;</li>
											<li>{post.etd}</li>
										</ul>

										<a
											href="#"
											className={classNames("absolute inset-0 rounded-md")}
										/>
									</li>
								))}
							</ul>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
