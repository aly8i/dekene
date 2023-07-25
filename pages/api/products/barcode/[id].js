import dbConnect from "../../../../util/mongo";
import Product from "../../../../models/Product";

export default async function handler (req, res){
  const {
    method,
    query: { id }
  } = req;

  await dbConnect();
  const idx = id.toString();
  if (method === "GET") {
    try {
        const product = await Product.findOne({'barcode': idx});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
  }
};
