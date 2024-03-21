import { NextResponse } from "next/server";

export async function GET() {
  const message = {
    "Deneme Yapin - GET": "Hadi hadi iyisiniz",
    "Deneme verisi1 - GET": "Deneme verisi_11",
    "Deneme verisi2 - GET": "Deneme verisi_22",
    "Deneme verisi3 - GET": "Deneme verisi_33",
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

export async function POST() {
    const message = {
      "Deneme Yapin - POST": "Hadi hadi iyisiniz",
      "Deneme verisi1 - POST": "Deneme verisi_11",
      "Deneme verisi2 - POST": "Deneme verisi_22",
      "Deneme verisi3 - POST": "Deneme verisi_33",
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
