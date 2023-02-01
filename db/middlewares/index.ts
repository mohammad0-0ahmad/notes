import { MiddlewareType } from "@m0-0a/next/api";
import dbConnect from "db";
import { getSession } from "next-auth/react";

export const dbMiddleware: MiddlewareType = async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.log(error);
  }
};

export const requireAuth: MiddlewareType = async (req, res, next) => {
  try {
    const session = await getSession({ req });
    //@ts-ignore
    req.uid = session.sub as string;
    next();
  } catch (error) {
    res.status(401).end();
  }
};
