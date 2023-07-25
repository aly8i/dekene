import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import Authorized from "../../../middlewares/Authorized";

export default Authorized(async function handler (req, res){
  const {
    method,
    query: { id }
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("The user has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
