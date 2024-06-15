import { type NextRequest } from "next/server";
import { db } from "@/src/db";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { update } = await req.json();

  const updatedTodo = await db.todo.update({
    where: { id: params.id },
    data: update,
  });

  return Response.json({ todo: updatedTodo });
};
