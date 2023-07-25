import dbConnect from "../../../util/mongo";
import Chat from "../../../models/Chat";
import User from "../../../models/User";

export default async function handler (req, res){
  const {
    method
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
        await Chat.find()
        .populate('userID')
        .exec()
        .then(docs=>{
            res.status(200).json(docs);
        });
    } catch (err) {
        res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    res.status(200).json("waiting");
  }
  if (method === "DELETE") {
    res.status(200).json("waiting");
  }
};
