import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  await fetch("http://temiapp.cpolar.io/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data.command }),
  });

  console.log(data);

  return NextResponse.json({ status: "OK" });
}

export async function GET(request: Request) {
  const response = await fetch("http://temiapp.cpolar.io/api/status", {
    cache: "no-store",
  });
  const json = await response.json();
  const { data } = json;
  const split = data.split(",");
  const location = split[0].replace("location: ", "");
  const status = split[1].replace("status: ", "");

  return NextResponse.json({ location, status });
}
