import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await fetch("http://8.218.73.169:81/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: "GOTO_k3" }),
  });

  return NextResponse.json({ location, status });
}
