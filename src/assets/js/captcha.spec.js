import initCaptcha from './captcha'

HTMLCanvasElement.prototype.getContext = () => ({
  clearRect: vi.fn(),
  fillText: vi.fn(),
})

const callback = vi.fn()
const selector = 'challenge-input'

describe('initCaptcha', () => {
  let input
  let challenge

  beforeEach(() => {
    vi.restoreAllMocks()
    input = document.createElement('input')
    input.classList.add(selector)
    document.body.appendChild(input)
    challenge = initCaptcha(`.${selector}`, callback)
  })

  afterEach(() => {
    document.body.replaceChildren([])
  })

  it('exports a function', () => {
    expect(initCaptcha).to.be.an.instanceof(Function)
  })

  it('creates a challenge object when called', () => {
    expect(challenge.reset).to.be.an.instanceof(Function)
    expect(challenge.validate).to.be.an.instanceof(Function)
  })

  it('appends the canvas when called', () => {
    const canvas = document.body.querySelector('canvas.captcha-canvas')
    expect(canvas).to.exist
  })

  it('calls the callback on validate', () => {
    challenge.validate()
    expect(callback).toHaveBeenCalled()
  })
})
