function decline(num: number, words: Array<string>) {
  const remainderOf100 = Math.abs(num) % 100;
  const remainderOf10 = remainderOf100 % 10;
  if (remainderOf100 > 10 && remainderOf100 < 20) return words[2];
  if (remainderOf10 > 1 && remainderOf10 < 5) return words[1];
  if (remainderOf10 === 1) return words[0];
  return words[2];
}

function padWithZero(number: number): string {
  return number < 10 ? `0${number}` : number.toString();
}

export function dateAsHumanReadable(date: string) {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timezone = dateObj.getTimezoneOffset();
  const timezoneSign = timezone > 0 ? '+' : '-';
  const timezoneHours = Math.floor(Math.abs(timezone) / 60);
  const daysAgo = Math.floor((new Date().getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

  const daysAgoStr = (
    daysAgo > 0 ?
      (daysAgo > 1 ? `${daysAgo} ${decline(daysAgo, ['день', 'дня', 'дней'])} назад` : 'Вчера')
      :
      'Сегодня'
  );

  return `${daysAgoStr}, ${padWithZero(hours)}:${padWithZero(minutes)} i-GMT${timezoneSign}${timezoneHours}`;
}
