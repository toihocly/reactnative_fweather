import day1 from '../assets/images/day.jpg';
import day2 from '../assets/images/day2.jpg';
import day3 from '../assets/images/day3.jpg';
import night1 from '../assets/images/night.jpg';
import night2 from '../assets/images/night2.jpg';
import night3 from '../assets/images/night3.jpg';

const convertInttoTime = integer => {
  const data = new Date(integer);
  const ampm = data.getHours() > 12 ? 'pm' : 'am';
  const hours = data.getHours() % 12;
  const minutes = '0' + data.getMinutes();
  const milliseconds = '0' + data.getMilliseconds();
  const obj = {
    hours,
    minutes,
    milliseconds,
    ampm,
  };
  return obj;
};

const colorPrimary = '#BBDEFB';
const colorSecond = '#B0BEC5';

const imageDays = [day1, day2, day3];
const imageNights = [night1, night2, night3];

const randomBackground = date => {
  const random = Math.floor(Math.random() * imageDays.length);
  if (new Date(date).getHours() > 15) return imageNights[random];
  return imageDays[random];
};

const convertInttoHours = string => {
  const data = new Date(string);
  const ampm = data.getHours() > 12 ? 'PM' : 'AM';
  const hours = data.getHours() % 12;
  return `${hours} ${ampm}`;
};

const convertInttoDate = string => {
  const data = new Date(string);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const years = data.getFullYear();
  return `${day}/${month}/${years}`;
};

export {
  colorPrimary,
  colorSecond,
  convertInttoTime,
  convertInttoHours,
  convertInttoDate,
  randomBackground,
};
