import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, whatsapp, business } = body

    // 1. Log the lead for the server (or send to a database/CRM)
    console.log("New Lead Received:", { name, whatsapp, business, date: new Date().toISOString() })

    // 2. You would typically integrate with WhatsApp API, Email (Resend), or a Google Sheet here
    // For now, we simulate a successful save to let the UI show the success state

    return NextResponse.json({ success: true, message: "Lead saved successfully" })
  } catch (error) {
    console.error("Lead API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 })
  }
}
