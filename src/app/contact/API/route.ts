import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

    export async function POST(req: Request) {
    try {
        const { name, email, subject, message, honeypot } = await req.json();

        // anti-bot simple
        if (honeypot) return NextResponse.json({ ok: true });

        if (!name || !email || !message) {
        return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
        }

        const to = (process.env.RESEND_TO || "").split(",").map(s => s.trim()).filter(Boolean);
        if (!to.length) return NextResponse.json({ ok: false, error: "Sin destinatario" }, { status: 500 });

        await resend.emails.send({
        from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
        to,
        replyTo: email, // así podés responder al remitente
        subject: subject || `Mensaje desde el portfolio - ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
            <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:8px 2px;">
            <h2 style="margin:0 0 12px 0;">Nuevo mensaje desde el portfolio</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Asunto:</strong> ${escapeHtml(subject || "")}</p>
            <p style="white-space:pre-wrap;margin-top:12px">${escapeHtml(message)}</p>
            </div>
        `,
        });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: "No se pudo enviar" }, { status: 500 });
    }
    }

    // chiquita ayuda para evitar HTML injection
    function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
console.log("Has key?", !!process.env.RESEND_API_KEY);
