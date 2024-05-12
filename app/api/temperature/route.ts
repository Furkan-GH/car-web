import { NextRequest, NextResponse } from "next/server";


let temperature: number | null = null; // Başlangıçta null olarak başlatılır


export async function POST(req: NextRequest) {
  const temperatureData = await req.json();
  const newTemperature: number = temperatureData.temperature;
  
  if (isNaN(newTemperature)) {
    return new Response('{"message": "Geçersiz sicaklik değeri!"}', {
      status: 400, 
    });
  }

  temperature = newTemperature;

  try {
    const response = {
      temperature : temperature,
      timeStamp: new Date(),
    };
    console.log(response.temperature)
    return new NextResponse(JSON.stringify({ entity: response.temperature, success: true }), {
        status: 200,
    });
  } catch (error) {
    console.error('Error processing temperature:', error);
    
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
  }
}
/*
{
  "temperature":22
}
*/

export async function GET() {
  try {
    if (temperature !== null) {
      const response = {
        temperature: temperature,
        timeStamp: new Date(),
      };
      console.log(response.temperature);
      return new NextResponse(JSON.stringify({ entity: response.temperature, success: true }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Sicaklik bilgisi henüz gelmedi" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error('Error processing temperature:', error);

    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
  }
}