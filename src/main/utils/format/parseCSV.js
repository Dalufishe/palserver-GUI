module.exports = (csvData) => {
  const lines = csvData.trim().split("\n");
  const headers = lines
    .shift()
    .split(",")
    .map((header) => header.trim());
  const result = lines.map((line) => {
    const values = line.split(",").map((value) => value.trim());
    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  });
  return result;
};
