import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  if (method === "GET") {
    try {
        User.find({'role': "delivery"})
          .exec()
          .then(docs=>{
              res.status(200).json(docs);
          })
      } catch (err) {
        res.status(500).json(err);
      }
  }
};

export default handler;
