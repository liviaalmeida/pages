type Area = {
  text: string;
  title: string;
}

type Captcha = (
  response: CaptchaResponse,
  captcha: Element,
  tries: number,
) => void

type CaptchaResponse = 'abuse' | 'error' | 'success'

type COLOR = 'gray' | 'green' | 'red' | 'white' | 'yellow'

type Contact = {
  href: string;
  image: string;
  text: string;
}

type Email = {
  email?: string;
  message: string;
  name?: string;
  subject?: string;
}

type Experience = {
  events: TimeEvent[];
  title: string;
}

type Link = {
  class: string;
  text: string;
}

type ModalReason = 'error' | 'success' | 'info';

type Skill = {
  intro?: string;
  level?: string;
  listing: string[];
  name: string;
  stars?: number;
}

type TimeEvent = {
  description: string;
  duration?: string;
  intro?: string;
  link?: string;
  title: string;
}

interface Storehouse {
  getAbuse: () => boolean;
  setAbuse: () => void;
  getLocale: () => string | null;
  setLocale: (locale: string) => void;
}
