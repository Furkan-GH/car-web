import { NextResponse } from "next/server";

export async function GET() {
  const message = {
    "Deneme Yapin": "Hadi hadi iyisiniz",
    "Deneme verisi1": "Deneme verisi_11",
    "Deneme verisi2": "Deneme verisi_22",
    "Deneme verisi3": "Deneme verisi_33",
  };
    try {
      const messageBody = JSON.stringify(message);

      return new NextResponse(messageBody, {
        status: 200
      });
    } catch (error) {
      console.error(error); 
      return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
}
