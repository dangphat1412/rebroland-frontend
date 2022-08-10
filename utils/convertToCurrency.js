const convertToCurrency = (money) => {
  let formatted = new Intl.NumberFormat().format(money);
  return formatted;
};

export default convertToCurrency;
