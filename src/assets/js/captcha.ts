import jsCaptcha from 'js-captcha'

export default function initCaptcha(el: string, callback: Captcha): jsCaptcha {
  return new jsCaptcha({
    el,
    callback,
    canvasClass: 'captcha-canvas',
    canvasStyle: {
      fillStyle: 'rgb(0, 0, 0)',
      font: '14px Open Sans',
      textAlign: 'left',
      textBaseline: 'top',
      height: 14,
      width: 45,
    },
    requiredValue: '=',
  })
}
