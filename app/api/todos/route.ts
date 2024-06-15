import { type NextRequest } from "next/server";
import { db } from "@/src/db";

export const GET = async (req: NextRequest) => {
  const criteria: Record<string, string> = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    criteria[key] = value;
  });

  const todos = await db.todo.findMany({ where: criteria });

  return Response.json({ todos });
};

export const POST = async (req: NextRequest) => {
  const { title, description } = await req.json();

  const todo = await db.todo.create({
    data: { title, description },
  });

  return Response.json({ todo });
};
