

export const getDayFormat = (tempDateDay: any) => {
  let res = "0";
  if (tempDateDay > 0 && tempDateDay < 10) {
    res = res + tempDateDay;
    return res;
  } else {
    return tempDateDay;
  }
}


export const getMonthFormat = (tempDateMonth: any) => {
  let res = "0";
  if (tempDateMonth >= 0 && tempDateMonth < 9 ) {
    let temp = tempDateMonth + 1;
    res = res + temp;
    return res;
  } else {
    return tempDateMonth + 1;
  }
}

export const getStringFechaInicial = () => {
  const fechaInit = new Date()

  //2023-04-24"
  const auxFormatFechaInit = `${fechaInit.getFullYear()}-${getMonthFormat(fechaInit.getMonth())}-${getDayFormat(fechaInit.getDate())}`
  return auxFormatFechaInit
}



/*
export const normalizedDate = (date: string | Date) => {
  const record = new Date(date);
  const year = record.getFullYear();
  const month = record.getMonth() + 1;
  const day = record.getDate();
  const hour = record.getHours();
  const minute = record.getMinutes();
  const dateNow =
    day.toString().padStart(2, "0") +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    year +
    " ";

  return dateNow;
};
export const normalizedDateFormatDB = (date: string | Date) => {
  const record = new Date(date);
  const year = record.getFullYear();
  const month = record.getMonth() + 1;
  const day = record.getDate();
  const hour = record.getHours();
  const minute = record.getMinutes();
  const dateNow =
  year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");

  return dateNow;
};
export const normalizedDateAndTime = (date: string | Date,time:string) => {
  const record = new Date(date);
  let arr =time.split(':');
  const year = record.getFullYear();
  const month = record.getMonth() + 1;
  const day = record.getDate();
  const hour = arr[0];
  const minute = arr[1];
  const dateNow =
  month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    "/" +
    year +
    " "+
    hour+
    ":"+
    minute;

  return dateNow;
};

*/