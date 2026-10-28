import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const recipient = process.env.CONTACT_EMAIL?.trim();
  if (!recipient || !emailPattern.test(recipient)) {
    return NextResponse.json({ error: "Le formulaire n’est pas encore configuré." }, { status: 503 });
  }

  try {
    const { name, email, message, website } = await request.json();
    if (website || typeof name !== "string" || typeof message !== "string" || !emailPattern.test(email || "") || name.trim().length < 2 || message.trim().length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Vérifiez les informations du formulaire." }, { status: 400 });
    }

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), _subject: "Nouveau message — portfolio", _replyto: email.trim(), _template: "table" }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error("provider");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Le service d’envoi est indisponible. Réessayez plus tard." }, { status: 502 });
  }
}
