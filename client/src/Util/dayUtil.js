import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const formatDate = date => dayjs(date).format('YYYY-MM-DD');

export const formatDateKo = date => dayjs(date).format('M월 D일');

export const formatMonthAndDay = date => dayjs(date).format('M.D');

export const formatDateAndWeekdayKo = date =>
  dayjs(date).locale('ko').format('M월 D일, ddd요일');

// 요일
export const dayOfTheWeek = date => dayjs(date).format('ddd');
export const dayOfTheWeekKo = date => dayjs(date).locale('ko').format('ddd');

export const formatTomorrow = date => dayjs(date).add(1, 'd').toDate();
