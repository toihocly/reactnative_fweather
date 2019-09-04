// use api openweathermap.org
const APPID = '169438dbad9391f32658be118cc49e5a';
const fetchAPI = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const callAPIbyCity = async cityName => {
  return fetchAPI(
    `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APPID}`,
  );
};

const callAPIbyLocation = async location => {
  return fetchAPI(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${APPID}`,
  );
};

export {callAPIbyCity, callAPIbyLocation};
