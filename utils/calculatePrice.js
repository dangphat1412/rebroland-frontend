const calculatePrice = (post) => {
  let price, pricePerSquare;

  if (post.unitPrice.id === 1) {
    if (post.price >= 1000000000) {
      price = (post.price / 1000000000).toFixed(1) + " tỷ";
    } else {
      price = (post.price / 1000000).toFixed(1) + " triệu";
    }

    if (post.price / post.area / 1000000000 >= 1000000000) {
      pricePerSquare =
        (Math.round((post.price / post.area / 1000000000) * 10) / 10).toFixed(
          1
        ) + " tỷ/m²";
    } else {
      pricePerSquare =
        (Math.round((post.price / post.area / 1000000) * 10) / 10).toFixed(1) +
        " triệu/m²";
    }
  } else if (post.unitPrice.id === 2) {
    if (post.price * post.area >= 1000000000) {
      price = ((post.price * post.area) / 1000000000).toFixed(1) + " tỷ";
    } else {
      price = ((post.price * post.area) / 1000000).toFixed(1) + " triệu";
    }

    if (post.price >= 1000000000) {
      pricePerSquare =
        (Math.round((post.price / 1000000000) * 10) / 10).toFixed(1) + " tỷ/m²";
    } else {
      pricePerSquare =
        (Math.round((post.price / 1000000) * 10) / 10).toFixed(1) + " triệu/m²";
    }
  } else {
    price = "Thoả thuận";
    pricePerSquare = "Thoả thuận";
  }
  return { price, pricePerSquare };
};

export default calculatePrice;
