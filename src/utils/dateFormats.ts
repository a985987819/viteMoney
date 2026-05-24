import dayjs from 'dayjs';

export const DATE_FORMAT = {
  DATE_KEY: 'YYYY-MM-DD',
  MONTH_KEY: 'YYYY-MM',
  DATETIME_FULL: 'YYYY-MM-DD HH:mm:ss',
  DATETIME_SHORT: 'YYYY-MM-DD HH:mm',
  TIME_ONLY: 'HH:mm',
  DISPLAY_MONTH_DAY: 'M月D日',
  DISPLAY_FULL_DATE: 'YYYY年M月D日',
  DISPLAY_MONTH: 'M月',
  DISPLAY_YEAR_MONTH: 'YYYY年M月',
  DISPLAY_YEAR: 'YYYY年',
  DISPLAY_SHORT_DATE: 'MM-DD',
  RECEIPT_DATE: 'YYYYMMDD',
} as const;

export const formatDateKey = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DATE_KEY);

export const formatMonthKey = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.MONTH_KEY);

export const formatDisplayMonthDay = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DISPLAY_MONTH_DAY);

export const formatDisplayFullDate = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DISPLAY_FULL_DATE);

export const formatDisplayYearMonth = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DISPLAY_YEAR_MONTH);

export const formatDisplayMonth = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DISPLAY_MONTH);

export const formatDisplayYear = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DISPLAY_YEAR);

export const formatTimeOnly = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.TIME_ONLY);

export const formatDateTimeFull = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DATETIME_FULL);

export const formatDateTimeShort = (date: dayjs.Dayjs | string | number): string =>
  dayjs(date).format(DATE_FORMAT.DATETIME_SHORT);

export const nowISO = (): string => dayjs().toISOString();

export const isToday = (dateStr: string): boolean =>
  dateStr === dayjs().format(DATE_FORMAT.DATE_KEY);

export const isYesterday = (dateStr: string): boolean =>
  dateStr === dayjs().subtract(1, 'day').format(DATE_FORMAT.DATE_KEY);
