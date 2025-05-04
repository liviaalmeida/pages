import { Email as client } from '@/assets/js/smtp'

import sendMail from './mail'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/assets/js/smtp', () => ({
  Email: {
    ajaxPost: vi.fn(),
    createCORSRequest: vi.fn(),
    send: vi.fn(async () => {}),
  },
}))

const env = {
  VITE_MJ_FROM: 'app',
  VITE_MJ_SECURE_TOKEN: '1',
}
vi.stubEnv('VITE_MJ_FROM', env.VITE_MJ_FROM)
vi.stubEnv('VITE_MJ_SECURE_TOKEN', env.VITE_MJ_SECURE_TOKEN)

const body = {
  email: 'jake@j.com',
  message: 'This is a message',
  name: 'Fill',
  subject: 'Message',
}

const sendParam = (email) => ({
  SecureToken: env.VITE_MJ_SECURE_TOKEN,
  From: env.VITE_MJ_FROM,
  To: 'leave.ah@gmail.com',
  Subject: email.subject || 'NO SUBJECT',
  Body: `FROM: ${email.name || 'NO NAME'}\n|\nCONTACT: ${email.email || 'NO MAIL'}\n|\nMESSAGE: ${email.message}`,
})

describe('sendMail', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(async () => {
    await flushPromises()
  })

  it('exports a function', () => {
    expect(sendMail).to.be.an.instanceof(Function)
  })

  it('calls email send on function call', async () => {
    const sendSpy = vi
      .spyOn(client, 'send')
      .mockResolvedValueOnce('OK')

    await sendMail(body)
    expect(sendSpy).toHaveBeenCalled()
  })

  it('sets no subject if there is no subject defined in the body', async () => {
    const sendSpy = vi
      .spyOn(client, 'send')
      .mockResolvedValueOnce('OK')

    const altBody = { ...body, subject: undefined }
    await sendMail(altBody)
  
    expect(sendSpy).toHaveBeenCalledWith(sendParam(altBody))
  })

  it('sets no name if there is no name defined in the body', async () => {
    const sendSpy = vi
      .spyOn(client, 'send')
      .mockResolvedValueOnce('OK')

    const altBody = { ...body, name: undefined }
    await sendMail(altBody)
  
    expect(sendSpy).toHaveBeenCalledWith(sendParam(altBody))
  })

  it('sets no email if there is no email defined in the body', async () => {
    const sendSpy = vi
      .spyOn(client, 'send')
      .mockResolvedValueOnce('OK')

    const altBody = { ...body, email: undefined }
    await sendMail(altBody)
  
    expect(sendSpy).toHaveBeenCalledWith(sendParam(altBody))
  })

  it('rejects promise if send does not return OK', async () => {
    const resolves = 'OTHER'

    const sendSpy = vi
      .spyOn(client, 'send')
      .mockResolvedValueOnce(resolves)

    sendMail(body).catch((error) => {
      expect(error).to.equal(resolves)
    })
  })

  it('rejects promise if send rejects', async () => {
    const rejects = 'ERROR'

    const sendSpy = vi
      .spyOn(client, 'send')
      .mockRejectedValueOnce(rejects)

    sendMail(body).catch((error) => {
      expect(error).to.equal(rejects)
    })
  })

  it('rejects promise if send throws an error', async () => {
    const throws = 'ERROR'

    const sendSpy = vi
      .spyOn(client, 'send')
      .mockImplementationOnce(() => { throw(throws) })

    sendMail(body).catch((error) => {
      expect(error).to.equal(throws)
    })
  })
})
