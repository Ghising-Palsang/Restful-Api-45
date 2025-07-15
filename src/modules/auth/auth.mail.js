const { AppConfig, SmtpConfig } = require("../../config/config");
const EmailService = require("../../services/email.service");

class AuthEmailService extends EmailService {
  async notifyAccountRegister(user) {
    try {
    const activationLink = `${AppConfig.feUrl}activate?token=${user.activationToken}`;
    const message = `
      <div style="background: #f4f6fb; color: #222; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(44,62,80,0.08);">
          <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <h2 style="color: #2563eb; margin-bottom: 12px; font-size: 28px; font-weight: 700; letter-spacing: -1px;">Welcome to Broadway!</h2>
              <p style="margin: 0 0 18px 0; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
                Thank you for registering with Broadway. We're excited to have you join our community!
              </p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
                Please activate your account to get started. Click the button below to confirm your email address:
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${activationLink}" style="background: #2563eb; color: #fff; padding: 14px 36px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block; box-shadow: 0 2px 6px rgba(37,99,235,0.12);">
                  Activate Account
                </a>
              </div>
              <p style="font-size: 13px; color: #888; margin-bottom: 18px;">
                <strong>Note:</strong> This activation link is valid for only 3 hours.
              </p>
              <p style="font-size: 14px; color: #888;">
                If you did not sign up for this account, you can safely ignore this email.
              </p>
              <p style="margin-top: 32px; font-size: 15px; color: #2563eb;">
                Best regards,<br>
                The Broadway Team
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;
    await this.sendEmail({
      to: user.email,
      sub: "Activate your account!",
      message
    });

    } catch (exception) {
      throw exception;
    }
  }

  async notifyNewActivationLink(user){
    try{
      return await this.sendEmail({
        to: user.email,
        from: SmtpConfig.from,
        sub: "Resent New Activation Link",
        message: `
          <div style="background: #f4f6fb; color: #222; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(44,62,80,0.08);">
            <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <h2 style="color: #2563eb; margin-bottom: 12px; font-size: 28px; font-weight: 700; letter-spacing: -1px;">New Activation Link</h2>
              <p style="margin: 0 0 18px 0; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
              It looks like your previous activation link has expired. No worries! Here is a new link to activate your Broadway account.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
              Please click the button below to confirm your email address and activate your account:
              </p>
              <div style="text-align: center; margin: 32px 0;">
              <a href="${AppConfig.feUrl}activate?token=${user.activationToken}" style="background: #2563eb; color: #fff; padding: 14px 36px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block; box-shadow: 0 2px 6px rgba(37,99,235,0.12);">
                Activate Account
              </a>
              </div>
              <p style="font-size: 13px; color: #888; margin-bottom: 18px;">
              <strong>Note:</strong> This activation link is valid for only 3 hours.
              </p>
              <p style="font-size: 14px; color: #888;">
              If you did not request this email or already activated your account, you can safely ignore this message.
              </p>
              <p style="margin-top: 32px; font-size: 15px; color: #2563eb;">
              Best regards,<br>
              The Broadway Team
              </p>
            </td>
            </tr>
          </table>
          </div>
        `
      });
    }catch (exception) {
      throw exception;
    }
  }

  async notifyActivationWelcomeLink(user){
    try{
      return await this.sendEmail({
        to: user.email,
        from: SmtpConfig.from,
        sub: "Welcome to Broadway!",
        message: `
          <div style="background: #f4f6fb; color: #222; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(44,62,80,0.08);">
            <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <h2 style="color: #2563eb; margin-bottom: 12px; font-size: 28px; font-weight: 700; letter-spacing: -1px;">Your Account is Activated!</h2>
              <p style="margin: 0 0 18px 0; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
              Congratulations! Your Broadway account has been successfully activated.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444;">
              You can now log in and start exploring all the features Broadway has to offer.
              </p>
              <div style="text-align: center; margin: 32px 0;">
              <a href="${AppConfig.feUrl}login" style="background: #2563eb; color: #fff; padding: 14px 36px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block; box-shadow: 0 2px 6px rgba(37,99,235,0.12);">
                Go to Login
              </a>
              </div>
              <p style="font-size: 14px; color: #888;">
              If you have any questions or need assistance, feel free to reply to this email.
              </p>
              <p style="margin-top: 32px; font-size: 15px; color: #2563eb;">
              Welcome aboard!<br>
              The Broadway Team
              </p>
            </td>
            </tr>
          </table>
          </div>
        `
      })
    }catch (exception) {
      throw exception;
    }
  }
}

const authEmailSvc = new AuthEmailService();
module.exports = authEmailSvc;
