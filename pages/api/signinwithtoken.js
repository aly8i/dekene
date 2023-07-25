import Verify from "../../middlewares/Verify";
const handler = Verify(async(req, res) => {
  if (req.method === "POST") {
    return res.status(200).json(req.decoded);
  }
});
export default handler;