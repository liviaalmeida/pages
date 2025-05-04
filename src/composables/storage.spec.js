import JSCookie from 'js-cookie';
import { keys, useStorage } from './storage';

describe('Storage Composable', () => {
  const locale = 'en';

  beforeEach(() => {
    localStorage.clear();
    JSCookie.remove(keys.abuse);
    JSCookie.remove(keys.locale);
  });

  it('exports a function', () => {
    expect(useStorage).to.exist;
    expect(useStorage).to.be.an.instanceof(Function);
  });

  it('exports the getters and setters', () => {
    const storage = useStorage();
    expect(storage.getAbuse).to.be.an.instanceof(Function);
    expect(storage.setAbuse).to.be.an.instanceof(Function);
    expect(storage.getLocale).to.be.an.instanceof(Function);
    expect(storage.setLocale).to.be.an.instanceof(Function);
  });

  it('sets the abuse storage when set abuse is called', () => {
    const { setAbuse } = useStorage();
    setAbuse();
    const cookie = JSCookie.get(keys.abuse);
    const local = localStorage.getItem(keys.abuse);
    expect(cookie).to.equal('1');
    expect(local).to.be.null;
  });

  it('gets the abuse false when no abuse is set', () => {
    const { getAbuse } = useStorage();
    const abuse = getAbuse();
    expect(abuse).to.be.false;
  });

  it('gets the abuse true when abuse is set', () => {
    const { getAbuse, setAbuse } = useStorage();
    setAbuse();
    const abuse = getAbuse();
    expect(abuse).to.be.true;
  });

  it('sets the locale storage when set locale is called', () => {
    const { setLocale } = useStorage();
    setLocale(locale);
    const cookie = JSCookie.get(keys.locale);
    const local = localStorage.getItem(keys.locale);
    expect(cookie).to.equal(locale);
    expect(local).to.equal(locale);
  });

  it('gets the locale null when no locale is set', () => {
    const { getLocale } = useStorage();
    const localeStored = getLocale();
    expect(localeStored).to.be.null;
  });

  it('gets the locale when locale is set', () => {
    const { getLocale, setLocale } = useStorage();
    setLocale(locale);
    const localeStored = getLocale();
    expect(localeStored).to.equal(locale);
  });
});
