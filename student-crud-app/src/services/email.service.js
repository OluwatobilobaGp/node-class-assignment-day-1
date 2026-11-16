const sendWelcomeEmail = async (student) => {
  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: process.env.EMAIL_FROM_NAME,
            email: process.env.EMAIL_FROM,
          },

          to: [
            {
              email: student.email,
              name: student.fullName,
            },
          ],

          subject: "Welcome to Student CRUD App",

          htmlContent: `
            <h2>Welcome, ${student.fullName}!</h2>
            <p>Your student registration was successful.</p>
            <p><strong>Matric Number:</strong> ${student.matricNumber}</p>
            <p><strong>Department:</strong> ${student.department}</p>
            <p><strong>Level:</strong> ${student.level}</p>
            <p>We are glad to have you with us.</p>
          `,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Email sending failed");
    }

    console.log("Welcome email sent:", result.messageId);

    return result;

  } catch (error) {
    console.error("Email service error:", error.message);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
};
