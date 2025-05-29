import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${process.env.PORTFOLIO_ID}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
