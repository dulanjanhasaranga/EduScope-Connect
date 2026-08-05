package com.educonnect.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        
        // ALWAYS print to console so the developer can click it when testing with MailDev!
        System.out.println("=================================================");
        System.out.println("PASSWORD RESET REQUESTED FOR: " + toEmail);
        System.out.println("RESET LINK (CLICK HERE): " + resetLink);
        System.out.println("=================================================");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(toEmail);
            helper.setSubject("Reset your password - Eduscope Connect");
            
            String htmlMsg = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;'>"
                    + "<div style='text-align: center; margin-bottom: 30px;'>"
                    + "  <h1 style='color: #2563eb; margin: 0;'>Eduscope Connect</h1>"
                    + "</div>"
                    + "<div style='background-color: #f8fafc; padding: 20px; border-radius: 8px;'>"
                    + "  <h2 style='color: #1e293b; margin-top: 0;'>Password Reset Request</h2>"
                    + "  <p style='color: #475569; line-height: 1.6;'>Hello,</p>"
                    + "  <p style='color: #475569; line-height: 1.6;'>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>"
                    + "  <div style='text-align: center; margin: 30px 0;'>"
                    + "    <a href='" + resetLink + "' style='background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>Reset Password</a>"
                    + "  </div>"
                    + "  <p style='color: #64748b; font-size: 14px; text-align: center; margin-bottom: 0;'>Or copy and paste this link into your browser:</p>"
                    + "  <p style='color: #2563eb; font-size: 12px; text-align: center; word-break: break-all;'>" + resetLink + "</p>"
                    + "</div>"
                    + "<div style='text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;'>"
                    + "  <p>&copy; 2026 Eduscope Connect. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            mailSender.send(message);
            System.out.println("HTML Password reset email successfully sent to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }
}
