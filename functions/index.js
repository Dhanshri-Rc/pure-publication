const { initializeApp } = require("firebase-admin/app");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

initializeApp();

// Configure these as Cloud Functions secrets before deploying:
//   firebase functions:secrets:set SMTP_USER
//   firebase functions:secrets:set SMTP_PASS
//   firebase functions:secrets:set ADMIN_EMAIL
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const ADMIN_EMAIL = defineSecret("ADMIN_EMAIL");

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER.value(),
      pass: SMTP_PASS.value(),
    },
  });
}

/**
 * Sends an email to the admin whenever a new contact message is created.
 */
exports.notifyOnContactMessage = onDocumentCreated(
  { document: "contact_messages/{messageId}", secrets: [SMTP_USER, SMTP_PASS, ADMIN_EMAIL] },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = getTransporter();

    try {
      await transporter.sendMail({
        from: `"Pure Publication Website" <${SMTP_USER.value()}>`,
        to: ADMIN_EMAIL.value(),
        replyTo: data.email,
        subject: `New Contact Message: ${data.subject || "General Inquiry"}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });
      logger.info("Contact notification email sent", { messageId: event.params.messageId });
    } catch (err) {
      logger.error("Failed to send contact notification email", err);
    }
  }
);

/**
 * Sends an email to the admin (and a confirmation to the author) whenever
 * a new paper submission is created.
 */
exports.notifyOnPaperSubmission = onDocumentCreated(
  { document: "submissions/{submissionId}", secrets: [SMTP_USER, SMTP_PASS, ADMIN_EMAIL] },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = getTransporter();

    try {
      await transporter.sendMail({
        from: `"Pure Publication Website" <${SMTP_USER.value()}>`,
        to: ADMIN_EMAIL.value(),
        replyTo: data.email,
        subject: `New Paper Submission: ${data.paperTitle}`,
        html: `
          <h2>New Paper Submission</h2>
          <p><strong>Submission ID:</strong> ${data.submissionId}</p>
          <p><strong>Author:</strong> ${data.authorName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Affiliation:</strong> ${data.affiliation}</p>
          <p><strong>Paper Title:</strong> ${data.paperTitle}</p>
          <p><strong>Category:</strong> ${data.journal}</p>
          <p><strong>File:</strong> <a href="${data.uploadedFile?.url}">${data.uploadedFile?.name}</a></p>
        `,
      });

      await transporter.sendMail({
        from: `"Pure Publication" <${SMTP_USER.value()}>`,
        to: data.email,
        subject: "We received your manuscript submission",
        html: `
          <h2>Thank you for your submission, ${data.authorName}!</h2>
          <p>Your paper "<strong>${data.paperTitle}</strong>" has been received.</p>
          <p>Your submission ID is: <strong>${data.submissionId}</strong></p>
          <p>Please keep this ID for tracking your submission status.</p>
        `,
      });

      logger.info("Submission notification emails sent", {
        submissionId: event.params.submissionId,
      });
    } catch (err) {
      logger.error("Failed to send submission notification emails", err);
    }
  }
);
