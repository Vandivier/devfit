import { SessionHandler, session } from "../../middleware/session";

const handler: SessionHandler = async (req, res, { setUserId }) => {
    setUserId(null);
    res.status(200).json({isLoggedOut: true});
};

export default session(handler, "GET");
