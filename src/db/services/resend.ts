import { Resend } from 'resend'

const sendEmail = async (): Promise<void> => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const result = await resend.emails.send({
      from: 'querelmatthieu@gmail.com',
      to: 'querelmatthieu@gmail.com',
      subject: 'Téléchargement du fichier',
      html: '<p>Téléchargement du fichier <strong>first email</strong>!</p>'
    })

    console.log('Email sent:', result)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export default sendEmail
