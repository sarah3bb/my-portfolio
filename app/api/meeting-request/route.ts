import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, date, time, notes } = await req.json()

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sarahabbas270@gmail.com",
      subject: `Meeting request from ${name}`,
      replyTo: email,
      text: `New meeting request

Name: ${name}
Email: ${email}
Preferred date: ${date}
Preferred time: ${time}

Notes:
${notes || "None"}`,
    })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Failed to send meeting request" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}