const convertToListMessages = (data) => {
  if (typeof data === "object") {
    return Object.keys(data).map((key) => {
      return data[key];
    });
  }
  if (typeof data === "string") {
    return [data];
  }
  return null;
};

export default convertToListMessages;
