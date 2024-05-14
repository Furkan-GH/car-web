import { NextRequest } from 'next/server';
import { Resend } from 'resend';
// re_df8GrLmt_5x4exFXCgQmuV53d2cE5ffiS
const resend = new Resend('re_df8GrLmt_5x4exFXCgQmuV53d2cE5ffiS');
// re_LtJnSP65_CqfQs96aB1n4jek2JDNPUkNP
export async function POST(req:NextRequest) {
  try {
    const body = await req.json();
    const recipientEmail = body.recipientEmail;
    const subject = 'Your Car'; 
    const html = '<img src="components/images/araba.jpg" alt="Car Image">';
    const text = 'Merhaba, bu ilk mesajnzdr.'; 
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [recipientEmail],
      subject,
      html, 
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
