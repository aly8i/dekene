import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import Authorized from "../../../../middlewares/Authorized";
export default Authorized(async function handler(req, res) {
  const { method } = req;
  const token = req.headers.authorization; 
  await dbConnect();

  if (method === "GET") {
    try {
      await Order.find()
        .populate('products.product')
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        })
    } catch (err) {
      res.status(500).json(err);
    }
  }
})