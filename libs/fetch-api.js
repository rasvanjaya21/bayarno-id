const baseUrl = process.env.NEXT_PUBLIC_APIURL;

export default async function fetchAPI (endPoint) {
	const req = await fetch(baseUrl + endPoint);
	const res = await req.json();
	const data = res.data;

	return data;
};