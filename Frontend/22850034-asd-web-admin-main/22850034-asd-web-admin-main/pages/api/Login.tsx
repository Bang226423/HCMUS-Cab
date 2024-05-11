// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from "next/types";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Validate user credentials (you may use a database for this)
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  // Perform authentication logic here...

  // If authentication is successful, generate a JWT token
  const token = jwt.sign({ username }, "your-secret-key", {
    expiresIn: "1h", // Set the token expiration time
  });

  res.status(200).json({ token });
}
