export default function RunMiddleware(req, res, func) {
	return new Promise((resolve, reject) => {
		func(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
