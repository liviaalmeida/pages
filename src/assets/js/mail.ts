import { Email as client } from '@/assets/js/smtp'

export default function sendMail(email: Email): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      client.send({
        SecureToken: import.meta.env.VITE_MJ_SECURE_TOKEN,
        From: import.meta.env.VITE_MJ_FROM,
        To: 'leave.ah@gmail.com',
        Subject: email.subject || 'NO SUBJECT',
        Body: `FROM: ${email.name || 'NO NAME'}\n|\nCONTACT: ${email.email || 'NO MAIL'}\n|\nMESSAGE: ${email.message}`,
      }).then(
        (message: string) => {
          if (!/^OK$/.test(message)) reject(message)
          resolve()
        },
      ).catch(
        (error) => {
          reject(error)
        },
      )
    } catch (error) {
      reject(error)
    }
  })
}
