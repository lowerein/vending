import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  if (res?.username === "admin" && res?.password === "admin")
    return NextResponse.json(res);
  else NextResponse.json({ message: "error" }, { status: 400 });
}
