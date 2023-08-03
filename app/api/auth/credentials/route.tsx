import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  if (res?.username === "admin" && res?.password === "wspisgood")
    return NextResponse.json(res);
  else return NextResponse.json({ message: "error" }, { status: 400 });
}
