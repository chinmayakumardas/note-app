import {connectDB} from "@/lib/db";
import Todo from "@/models/Todo";

export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return Response.json(todos);
}

export async function POST(req) {
  await connectDB();
  const { text } = await req.json();
  const newTodo = await Todo.create({ text, completed: false });
  return Response.json(newTodo);
}

export async function PUT(req) {
  await connectDB();
  const { id, completed } = await req.json();
  const updated = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Todo.findByIdAndDelete(id);
  return Response.json({ success: true });
}
