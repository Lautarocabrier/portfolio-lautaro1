export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(s: string) {
    return String(s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    export async function POST(req: Request) {
    try {
        const { name, email, subject, message, honeypot } = await req.json();

        if (honeypot) return Response.json({ ok: true });
        if (!name || !email || !subject || !message)
        return Response.json({ ok:false, error:"Faltan datos" }, { status:400 });

        const nodemailer = await import("nodemailer");

        const user = (process.env.GMAIL_USER || "").trim();
        const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
        const to   = (process.env.MAIL_TO || user).trim();

        // 👉 STARTTLS (587) en lugar de 465
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,          // STARTTLS
        auth: { user, pass },
        });

        // Verifica conexión/credenciales y nos da error claro si algo falla
        await transporter.verify();

        const info = await transporter.sendMail({
        from: `"Portfolio" <${user}>`,   // Gmail: FROM = tu cuenta
        to,
        subject: `[Contacto] ${String(subject).slice(0,140)}`,
        html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Arial">
            <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="white-space:pre-wrap;line-height:1.5">${escapeHtml(message)}</div>
            </div>
        `,
        replyTo: `${name} <${email}>`,
        });

        return Response.json({ ok:true, id: info.messageId });
    } catch (e: any) {
        // Devuelve info de error para verlo en Network → Response
        return Response.json(
        {
            ok:false,
            error: e?.message || "SMTP error",
            code: e?.code,
            command: e?.command,
            responseCode: e?.responseCode,
            response: e?.response
        },
        { status:500 }
        );
    }
    }
