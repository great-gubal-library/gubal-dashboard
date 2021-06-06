import { TFunction } from 'i18next';
import moment from 'moment';

export const minutesToDurationString = (t: TFunction) => (duration: number) => {
  const minutes = Math.floor(duration % 60);
  const minutesString = minutes === 1 ? t('duration.minute') : t('duration.minutes', { amount: minutes });

  const hours = Math.floor((duration / 60) % 24);
  const hoursString = hours === 0 ? null : hours === 1 ? t('duration.hour') : t('duration.hours', { amount: hours });

  const days = Math.floor(duration / 60 / 24);
  const daysString = days === 0 ? null : days === 1 ? t('duration.day') : t('duration.days', { amount: days });

  const strings = [daysString, hoursString, minutesString].filter(v => v !== null) as string[];
  return strings.slice(1).reduce((acc, s) => `${acc} ${s}`, strings[0])
};

export const dateTimeString = (date: Date): string =>
  moment(date).format('DD.M.YYYY [klo] H:mm')

export const dateString = (date: Date): string =>
  moment(date).format('DD.M.YYYY')

interface NameObject {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}

export const nameStringOrEmail = ({ firstName, lastName, email }: NameObject) => {
  return firstName && lastName ? `${firstName} ${lastName}`
    : firstName ? firstName
      : lastName ? lastName
        : email;
}

export const nameStringOrEmpty = ({ firstName, lastName }: NameObject) => {
  return firstName && lastName ? `${firstName} ${lastName}`
    : firstName ? firstName
      : lastName ? lastName
        : '';
}

export const multipleNameStringOrEmail = (users: Array<NameObject>) => {
  return users.map(user => 
    user.firstName && user.lastName ? `${user.firstName} ${user.lastName}`
    : user.firstName ? user.firstName
      : user.lastName ? user.lastName
        : user.email
  );
}