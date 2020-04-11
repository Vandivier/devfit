import { NextApiRequest, NextApiResponse } from "next";

const users: any[] = [];

export default  (req: NextApiRequest, res: NextApiResponse) => {
  // Get data from your database
  res.status(200).json(users);
};
