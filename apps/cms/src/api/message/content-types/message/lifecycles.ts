export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      console.log(`[Message Lifecycle] New message from ${result.name} <${result.email}>`);

      await strapi.plugins['email'].services.email.send({
        to: 'calebadjeoda@hotmail.com',
        from: 'noreply@calebadjeoda.com',
        replyTo: result.email,
        subject: result.subject
          ? `Portfolio Contact: ${result.subject}`
          : `Portfolio Contact from ${result.name}`,
        text: [
          `New message from your portfolio contact form`,
          ``,
          `Name: ${result.name}`,
          `Email: ${result.email}`,
          `Subject: ${result.subject || '(none)'}`,
          ``,
          `Message:`,
          `${result.message}`,
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00D9FF; border-bottom: 2px solid #00D9FF; padding-bottom: 10px;">
              New Portfolio Message
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${result.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;">
                  <a href="mailto:${result.email}" style="color: #00D9FF;">${result.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td>
                <td style="padding: 8px 0; color: #555;">${result.subject || '(none)'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
              <p style="margin: 0; color: #333; white-space: pre-wrap;">${result.message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              This message was sent from the portfolio contact form.
            </p>
          </div>
        `,
      });

      console.log(`[Message Lifecycle] Email forwarded to calebadjeoda@hotmail.com`);
    } catch (error) {
      console.error('[Message Lifecycle] Failed to forward email:', error);
      // Don't throw — the message is still saved in the DB even if email fails
    }
  },
};
