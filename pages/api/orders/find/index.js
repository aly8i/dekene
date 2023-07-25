import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    try {
      await Order.find({'customerID': req.body.customerID})
        .populate('products.product')
        .exec()
        .then(docs=>{
          return res.status(200).json(docs);
        })
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
