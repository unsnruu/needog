const getTableName = (baseUrl) => {
  return baseUrl.slice(1) + "s";
};

module.exports = { getTableName };
