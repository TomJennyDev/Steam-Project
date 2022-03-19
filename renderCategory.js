const getEle = (element) => document.querySelector(element);
const categoryItem = (item) => {
  return `
<li class="item">
<a href="detail.html?id=${item.appid}" data-id=${item._id}>
  <div class="item-header">
    <span class="item-cart">
      <i class="fa-solid fa-cart-plus"></i>
    </span>
    <img
      src=${item.header_image}
      alt=""
    />
    <span class="item-icon">
      ${item.platforms
        .map((Operations) => {
          if (Operations === "windows") {
            return '<i class="fa-brands fa-windows"></i>';
          }
          if (Operations === "mac") {
            return '<i class="fa-brands fa-apple"></i>';
          }
          if (Operations === "linux") {
            return '<i class="fa-brands fa-ubuntu"></i>';
          }
        })
        .join("")}
   
    </span>
  </div>
  <div class="item-footer">
    <p class="item-name">${item.name}</p>
    <p class="item-price">
      <s class="item-discount">${(item.price + 2).toFixed(
        1
      )}</s>${item.price.toFixed(1)}
    </p>
  </div>
</a>
</li>
`;
};

const renderCategory = async () => {
  try {
    // get element category item
    const categoryList = getEle(".category-list");

    const paramsObject = {
      page: 1,
      limit: 10,
      genres: "",
      steamspy_tags: "",
      q: "",
    };

    const data = await getAllGames(paramsObject);
    let contentCategory = "";
    data.data.forEach((item) => {
      console.log(item);
      const liEle = categoryItem(item);
      contentCategory += liEle;
    });
    categoryList.innerHTML = contentCategory;
  } catch (error) {
    console.log(error);
  }
};

renderCategory();
