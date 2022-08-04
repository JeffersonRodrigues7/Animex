export const formatedData = (date: string): string => {
  var final_date: string = "";
  var date_now: Date = new Date();
  var last_updated: Date = new Date(date);
  var duration: number = date_now.valueOf() - last_updated.valueOf();

  const days: number = Math.floor(duration / (24 * 60 * 60 * 1000));
  const daysms: number = duration % (24 * 60 * 60 * 1000);
  const hours: number = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms: number = duration % (60 * 60 * 1000);
  const minutes: number = Math.floor(hoursms / (60 * 1000));
  const minutesms: number = duration % (60 * 1000);
  const sec: number = Math.floor(minutesms / 1000);

  if (days > 0) {
    final_date = days + " dias atrás";
  } else if (hours > 0) {
    final_date = hours + " horas atrás";
  } else if (minutes > 0) {
    final_date = minutes + " minutos atrás";
  } else {
    final_date = sec + " segundos atrás";
  }

  return final_date;
};
