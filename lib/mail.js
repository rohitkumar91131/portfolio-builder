import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
    // Check for App Password credentials
    if (!process.env.EMAIL_FROM || !process.env.EMAIL_PASS) {
        console.warn("⚠️ SMTP Credentials (EMAIL_FROM/EMAIL_PASS) missing in .env");
        logFallback(to, subject, text, html);
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS, // App Password
        },
    });

    const mailOptions = {
        from: "Admin System <" + process.env.EMAIL_FROM + ">",
        to: to,
        subject: subject,
        text: text,
        html: html || text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Nodemailer Error:", error);

        // Detailed error logging for common issues
        if (error.code === 'EAUTH') {
            console.error("🚨 AUTH ERROR: Invalid App Password or Email.");
            console.error("👉 Fix: Ensure EMAIL_PASS in .env is a 16-char Gmail App Password (not your login password).");
        }

        logFallback(to, subject, text, html);
    }
};

function logFallback(to, subject, text, html) {
    console.log("==========================================");
    console.log("⚠️ EMAIL FAILED (Nodemailer Fallback) ⚠️");
    console.log("Mock Email to: " + to);
    console.log("Subject: " + subject);
    console.log("Text: " + text);
    if (html) console.log("HTML: <Template Included>");
    console.log("==========================================");
}
