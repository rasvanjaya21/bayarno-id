import cors from "../../utils/cors";
import RunMiddleware from "../../utils/run-middleware";

export default async function PostageHandler(req, res) {
	await RunMiddleware(req, res, cors);

	if (req.method === "POST") {
		const response = await fetch("https://api.rajaongkir.com/starter/cost", {
			method: "POST",
			headers: {
				key: process.env.RAJAONGKIR_API_KEY,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: req.body,
		});

		const result = await response.json();
		res.status(200).json(result);
	}
}
