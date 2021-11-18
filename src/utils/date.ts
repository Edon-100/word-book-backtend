import * as dayjs from 'dayjs';

export const formatDate = (dateNum: string | number) => {
  return dayjs(dateNum).format('YYYY-MM-DD HH:mm:ss');
};
