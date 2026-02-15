export const getOtpEmailTemplate = (otp) => {
  // Using the logo provided by the user or a placeholder if preferred. 
  // I will use the one they shared to match their request exactly.
  const LOGO_URL = "https://res.cloudinary.com/dkaxd3wha/image/upload/v1768068554/logo_ftfr6n.png";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .otp-box { 
            letter-spacing: 5px; 
            font-family: monospace; 
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            
            <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 600px; width: 100%;">
              
              <tr>
                <td align="center" style="padding: 30px 40px; background-color: #000000;">
                  <img src="${LOGO_URL}" alt="Portfolio Logo" width="120" style="display: block; color: #ffffff;">
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px;">
                  <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Admin Access Request</h1>
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #555555;">
                    Hi Admin,
                  </p>
                  <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.5; color: #555555;">
                    You requested a secure login to your portfolio dashboard. Use the OTP below to verify your identity.
                  </p>
                  
                  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#f4f4f5" style="border-radius: 6px; border: 1px border-dashed #dddddd;">
                        <span class="otp-box" style="display: inline-block; padding: 20px 30px; font-size: 32px; font-weight: bold; color: #000000;">
                          ${otp}
                        </span>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 30px 0 0; font-size: 14px; color: #888888;">
                    This code will expire in 3 minutes. If you didn't request this, please ignore this email.
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 20px 40px; background-color: #f9f9f9; text-align: center; font-size: 12px; color: #888888;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} Rohit Kumar. All rights reserved.</p>
                  <p style="margin: 5px 0 0;">Secure Admin System</p>
                </td>
              </tr>
              
            </table>
            </td>
        </tr>
      </table>
      
    </body>
    </html>
  `;
};
