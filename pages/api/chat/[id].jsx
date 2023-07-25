import dbConnect from "../../../util/mongo";
import Chat from "../../../models/Chat";

export default async function handler (req, res){
  const {
    method,
    query: { id }
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
        const chat = await Chat.findOne({'userID': id});
        if (chat){
            res.status(200).json(chat);
        }    
        else{
            const chat = await Chat.create({userID:id});
            res.status(201).json(chat);
        }
    } catch (err) {
        res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const chat1 = await Chat.findOne({'userID': id});
      let messages = chat1.messages;
      messages.push(req.body);
      try {
        const chat = await Chat.findByIdAndUpdate(chat1._id, {userID:chat1.userID,messages}, {
          new: true,
        });
        res.status(200).json(chat);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    const chat1 = await Chat.findOne({'userID': id});
    try {
      await Chat.findByIdAndDelete(chat1._id);
      res.status(200).json("The chat has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
