const getCurrentTime = () => {
  const date = new Date();
  const dateStr = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return dateStr;
};

module.exports = { getCurrentTime };
