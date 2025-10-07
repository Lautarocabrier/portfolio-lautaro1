export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(s: string) {
    return String(s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    type SmtpError = {
    message?: string;
    code?: string | number;
    command?: string;
    responseCode?: number;
    response?: string;
    };

    export async function POST(req: Request) {
    try {
        const { name, email, subject, message, honeypot } = await req.json();

        // anti-bot
        if (honeypot) return Response.json({ ok: true });
        if (!name || !email || !subject || !message)
        return Response.json({ ok: false, error: "Faltan datos" }, { status: 400 });

        // 🔐 ENV obligatorias
        const user = (process.env.GMAIL_USER || "").trim();
        const pass = (process.env.GMAIL_APP_PASSWORD || "").trim(); // app password (2FA)
        const to   = (process.env.MAIL_TO || user).trim();

        if (!user || !pass) {
        return Response.json(
            { ok: false, error: "CONFIG_ERROR", detail: "Falta GMAIL_USER o GMAIL_APP_PASSWORD en Vercel (Production)." },
            { status: 500 }
        );
        }

        // Cargar nodemailer dinámicamente (evita bundling raro)
        const nodemailer = await import("nodemailer");

        // 🚀 Transport con settings robustos para serverless (Vercel)
        // Gmail via STARTTLS (587). En Edge NO funciona; ya forzamos Node.js arriba.
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,               // STARTTLS
        auth: { user, pass },
        pool: true,                  // reusar conexión (serverless)
        maxConnections: 1,
        maxMessages: 30,
        connectionTimeout: 15_000,   // 15s
        greetingTimeout: 10_000,     // 10s
        socketTimeout: 20_000,       // 20s
        tls: {
            // En algunos DC de Vercel Gmail es más estricto con SNI
            servername: "smtp.gmail.com",
            // rejectUnauthorized: false, // ✋ Evitar desactivar en producción salvo que Gmail de problemas de CA
        },
        });

        // ⚠️ verify() hace 1 roundtrip extra; en prod puede fallar por timeouts.
        // Si querés mantenerlo para diagnósticos, descomenta:
        // await transporter.verify();

        const info = await transporter.sendMail({
        from: `"Portfolio" <${user}>`, // Gmail fuerza el from real a tu cuenta
        to,
        subject: `[Contacto] ${String(subject).slice(0, 140)}`,
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

        return Response.json({ ok: true, id: info.messageId }, { status: 200 });
    } catch (e: any) {
        const err: SmtpError = {
        message: e?.message,
        code: e?.code,
        command: e?.command,
        responseCode: e?.responseCode,
        response: e?.response,
        };

        // 🎯 Traducción rápida de errores comunes en PROD (Vercel + Gmail)
        let hint = "";
        if (String(err.response || "").includes("5.7.8 Username and Password not accepted")) {
        hint = "Usuario/contraseña inválidos o falta App Password (cuenta con 2FA).";
        } else if (String(err.response || "").includes("534-5.7.9")) {
        hint = "Necesitás App Password (no se aceptan contraseñas normales).";
        } else if (String(err.response || "").includes("Application-specific password required")) {
        hint = "Activá 2FA y generá App Password para SMTP.";
        } else if (err.code === "EAUTH") {
        hint = "Falló la autenticación SMTP: revisá GMAIL_USER y GMAIL_APP_PASSWORD en Vercel (Production).";
        } else if (err.code === "ETIMEDOUT" || err.code === "ECONNECTION") {
        hint = "Timeout/Conexión SMTP desde Vercel. Reintentá o probá otro proveedor SMTP (Resend/SendGrid).";
        }

        return Response.json(
        { ok: false, error: "SMTP_ERROR", detail: err.message, hint, ...err },
        { status: 500 }
        );
    }
    }
