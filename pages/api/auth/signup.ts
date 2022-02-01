// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "./auth";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return

  const { email, password } = req.body as { email: string; password: string };

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 3
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection("users");

  // verify email should unique
  const data = await collection.findOne({email:email})
  if (data) {
    res.status(422).json({message: "email already exists"})
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password);
  const result = await collection.insertOne({ email:email, password: hashedPassword });

  res.status(201).json({ message: "User created!" });
  client.close()
}
