import * as koLocale from 'date-fns/locale/ko';
import { distanceInWords, format } from 'date-fns';

export const fromNow = (date: string) => {
  const now: any = new Date();
  const givenDate: any = new Date(date);
  const diff: any = now - givenDate;
  if (diff < 1000 * 60) {
    return '방금 전';
  }
  if (diff < 1000 * 60 * 60 * 24 * 7) { // 7일
    const distanceString = distanceInWords(now, givenDate, { locale: koLocale, addSuffix: true });
    return distanceString;
  }
  return format(givenDate, 'YY-M-D');
};

export const banded = ['관리자', 'admin', '운영자', '운영진'];