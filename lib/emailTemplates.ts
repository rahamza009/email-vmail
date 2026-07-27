function wrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f0;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background-color:#ffffff;border-radius:8px;overflow:hidden;border-top:4px solid #2D3A28;">
          <tr>
            <td style="padding:48px 52px 40px;">
              <p style="margin:0 0 36px;font-family:Georgia,serif;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#2D3A28;">VMail · ValueMail</p>
              ${content}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px solid rgba(45,58,40,0.12);">
                <tr>
                  <td style="padding-top:28px;">
                    <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.5;color:rgba(45,58,40,0.5);">— Ameer Hamza<br>Founder, EmailVmail</p>
                    <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:rgba(45,58,40,0.35);">You received this because you subscribed to VMail. To unsubscribe, reply with "unsubscribe" in the subject.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const bodyStyle = "margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#2D3A28;";
const headingStyle = "margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;line-height:1.5;color:#2D3A28;";

export function welcomeEmail(): { html: string; text: string } {
  const html = wrapper(`
    <h1 style="${headingStyle}">Welcome to VMail.</h1>
    <p style="${bodyStyle}">Hi there,</p>
    <p style="${bodyStyle}">A big thank you for joining VMail (ValueMail).</p>
    <p style="${bodyStyle}">I'll send you another email soon to break the ice and share why I started VMail.</p>
    <p style="${bodyStyle}">Until then... take care.</p>
  `);

  const text = `VMail · ValueMail

Welcome to VMail.

Hi there,

A big thank you for joining VMail (ValueMail).

I'll send you another email soon to break the ice and share why I started VMail.

Until then... take care.

— Ameer Hamza
Founder, EmailVmail

You received this because you subscribed to VMail. To unsubscribe, reply with "unsubscribe" in the subject.`;

  return { html, text };
}

export function followUpEmail(): { html: string; text: string } {
  const html = wrapper(`
    <h1 style="${headingStyle}">Why I started VMail.</h1>
    <p style="${bodyStyle}">Hi,</p>
    <p style="${bodyStyle}">I hope you've been doing good. Let's have some convo.</p>
    <p style="${bodyStyle}">I started this VMail out of my passion for the firearms &amp; tactical gear industry. I was just not impressed by what most store owners are doing with their ecommerce emails.</p>
    <p style="${bodyStyle}">Over the years, I've subscribed to countless emails from gun &amp; tactical stores. Only a handful genuinely impressed me.</p>
    <p style="${bodyStyle}">Some emails never trigger.</p>
    <p style="${bodyStyle}">The rest?</p>
    <p style="${bodyStyle}">Meh.</p>
    <p style="${bodyStyle}">But that's a conversation for Friday mornings.</p>
    <p style="${bodyStyle}">Here's what I discovered.</p>
    <p style="${bodyStyle}">Most store owners don't realize how much revenue is hidden inside their email list. They don't have the right methodology to uncover it. Others simply play it too safe to convert.</p>
    <p style="${bodyStyle}">The result?</p>
    <p style="${bodyStyle}">Lower ROI. Higher customer acquisition costs.</p>
    <p style="${bodyStyle}">I don't believe the problem is email.</p>
    <p style="${bodyStyle}">I believe the problem is that most brands don't know what email is truly capable of.</p>
    <p style="${bodyStyle}">That's what VMail is about.</p>
    <p style="${bodyStyle}">Every Friday, we'll explore better ideas, challenge conventional thinking, and work toward one goal:</p>
    <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#2D3A28;font-style:italic;">Move your audience from subscribed to sold, again and again.</p>
    <p style="${bodyStyle}">See you Friday morning.</p>
  `);

  const text = `VMail · ValueMail

Why I started VMail.

Hi,

I hope you've been doing good. Let's have some convo.

I started this VMail out of my passion for the firearms & tactical gear industry. I was just not impressed by what most store owners are doing with their ecommerce emails.

Over the years, I've subscribed to countless emails from gun & tactical stores. Only a handful genuinely impressed me.

Some emails never trigger.

The rest?

Meh.

But that's a conversation for Friday mornings.

Here's what I discovered.

Most store owners don't realize how much revenue is hidden inside their email list. They don't have the right methodology to uncover it. Others simply play it too safe to convert.

The result?

Lower ROI. Higher customer acquisition costs.

I don't believe the problem is email.

I believe the problem is that most brands don't know what email is truly capable of.

That's what VMail is about.

Every Friday, we'll explore better ideas, challenge conventional thinking, and work toward one goal:

Move your audience from subscribed to sold, again and again.

See you Friday morning.

— Ameer Hamza
Founder, EmailVmail

You received this because you subscribed to VMail. To unsubscribe, reply with "unsubscribe" in the subject.`;

  return { html, text };
}
