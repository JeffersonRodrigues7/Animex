export const formatedData = (date: string): string => {
  var finalDate = "";
  var dateNow = new Date();
  var lastUpdated = new Date(date);
  var duration = dateNow.valueOf() - lastUpdated.valueOf();

  const days = Math.floor(duration / (24 * 60 * 60 * 1000));
  const daysms = duration % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = duration % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = duration % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);

  if (days > 0) {
    finalDate = days + " dias atrás";
  } else if (hours > 0) {
    finalDate = hours + " horas atrás";
  } else if (minutes > 0) {
    finalDate = minutes + " minutos atrás";
  } else {
    finalDate = sec + " segundos atrás";
  }

  return finalDate;
};
