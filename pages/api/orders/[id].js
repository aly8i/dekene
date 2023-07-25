import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import AuthorizedOrder from "../../../middlewares/AuthorizedOrder"
export default AuthorizedOrder( async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  
  await dbConnect();

  if (method === "GET") {

    try {
      await Order.findById(id)
        .populate('products.product')
        .exec()
        .then(docs=>{
          res.status(200).json(docs);
        })
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json("The Order has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});