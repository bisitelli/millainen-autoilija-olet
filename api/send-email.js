const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const formData = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  const mailOptions = {
    from: formData.email,
    to: 'julius.sciarra@if.fi',  // Korvaa omalla sähköpostiosoitteella
    subject: 'Tarjouspyyntö',
    text: `
      Nimi: ${formData.name}
      Puhelin: ${formData.phone}
      
      Vastaukset kyselyyn:
      ${Object.entries(formData.answers).map(([question, answer]) => `${question}: ${answer}`).join('\n')}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Sähköposti lähetetty ' + info.response);
  } catch (error) {
    res.status(500).send(error.toString());
  }
}
