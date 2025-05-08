import JSCookie from 'js-cookie';

export const keys = {
  abuse: 'CTMT',
  locale: 'LANG',
};

export function useStorage() {
  const $cookies = JSCookie;

  function get(key: string) {
    return $cookies.get(key) || localStorage.getItem(key);
  }

  function set(key: string, value: string, expires?: Date) {
    $cookies.set(key, value, {
      expires,
      sameSite: 'strict',
    });

    if (!expires) {
      localStorage.setItem(key, value);
    }
  }

  function getAbuse() {
    return !!get(keys.abuse);
  }

  function setAbuse() {
    const expires = new Date();
    expires.setTime(expires.getTime() + 1080000000);
    set(keys.abuse, '1', expires);
  }

  function getLocale() {
    return get(keys.locale);
  }

  function setLocale(locale: string) {
    set(keys.locale, locale);
  }

  return {
    getAbuse,
    setAbuse,
    getLocale,
    setLocale,
  };
}
