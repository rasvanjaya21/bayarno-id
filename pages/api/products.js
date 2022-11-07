export default function handler(req, res) {
    if (req.method === "GET" && req.headers["keys"] === `${process.env.BAYARNO_API_KEY}`) {
            // Process a POST request
            res.status(200).json( { product : [
                {
                    name: "Seedperapat new",
                    description: "Tersedia 3 variant atau paket new",
                    variants: [
                        {
                            name: "1 Box Seedperapat",
                            price: 245,
                        },
                        {
                            name: "2 Box Seedperapat",
                            price: 450,
                        },
                        {
                            name: "4 Box Seedperapat",
                            price: 850,
                        },
                    ]
                }
            ] } );
    } else {
        // Handle any other HTTP method
        res.status(401).json({ message: "Method not allowed" });
    }
}
