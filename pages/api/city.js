import cors from "../../utils/cors";
import RunMiddleware from "../../utils/run-middleware";

export default async function CityHandler(req, res) {
	let endPoint;
	const query = req.query;
	const result = { rajaongkir: {} };

	await RunMiddleware(req, res, cors);

	if (req.method === "GET") {
		if (
			query.hasOwnProperty("kotaId") === true &&
			query.hasOwnProperty("provinsiId") === true
		) {
			endPoint = `https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}&id=${req.query.kotaId}&province=${req.query.provinsiId}`;
		} else if (query.hasOwnProperty("kotaId") === true) {
			endPoint = `https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}&id=${req.query.kotaId}`;
		} else if (query.hasOwnProperty("provinsiId") === true) {
			endPoint = `https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}&province=${req.query.provinsiId}`;
		} else {
			endPoint = `https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}`;
		}

		const response = await fetch(endPoint, { method: "GET" });
		const data = await response.json();

		result.rajaongkir.status = data.rajaongkir.status;
		result.rajaongkir.results = data.rajaongkir.results;
		res.status(200).json(result);
	}
}
