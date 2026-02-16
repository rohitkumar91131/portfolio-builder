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
        // Explicit timeouts to prevent hanging
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000,    // 5 seconds
        socketTimeout: 10000,     // 10 seconds
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

export const sendDeleteAccountOTP = async ({ to, otp }) => {
    const subject = "⚠️ Delete Account Verification Code";
    const text = `Your verification code to delete your account is: ${otp}. It expires in 3 minutes.`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background: #ef4444; padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 40px 30px; text-align: center; color: #3f3f46; }
            .verification-code { font-size: 36px; font-weight: 700; letter-spacing: 4px; color: #18181b; background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 30px auto; width: fit-content; border: 2px dashed #d4d4d8; }
            .warning { background-color: #fef2f2; border-left: 4px solid #ef4444; color: #b91c1c; padding: 15px; text-align: left; margin: 20px 0; border-radius: 4px; font-size: 14px; }
            .footer { background: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #e4e4e7; }
            .expiry { color: #ef4444; font-weight: 600; font-size: 14px; margin-top: 10px; display: block; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Account Deletion Request</h1>
            </div>
            <div class="content">
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    We received a request to permanently delete your account. Use the code below to confirm this action.
                </p>
                
                <div class="verification-code">${otp}</div>
                
                <span class="expiry">Expires in 3 minutes</span>

                <div class="warning">
                    <strong>⚠️ Warning:</strong> This action cannot be undone. All your data, including projects, education, and experience, will be permanently removed.
                </div>

                <p style="font-size: 14px; color: #71717a; margin-top: 30px;">
                    If you did not request this, please ignore this email and change your password immediately.
                </p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Portfolio Builder. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

    return sendEmail({ to, subject, text, html });
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
