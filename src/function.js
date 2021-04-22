const getWoeid = async (lat, long) => {
  var woeid;
  await fetch(
    `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
  ).then(async (res) => {
    const data = await res.json();
    woeid = data[0].woeid;
  });
  return woeid;
};

const fah = (cel) => cel * (9 / 5) + 32;

export { getWoeid, fah };
