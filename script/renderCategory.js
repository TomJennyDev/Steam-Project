const categoryItem = (item) => {
  return `
<li class="item game-item">
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
        ${item.categories
          .map((item) => {
            if (item === "online multi-player") {
              return '<i class="fa-solid fa-globe"></i>';
            }
            if (item === "multi-player") {
              return '<i class="fa-solid fa-user-group"></i>';
            } else if (item === "single-player") {
              return '<i class="fa-solid fa-user"></i>';
            }
          })
          .join("")}
    </span>
    
  
     
  </div>
  <div class="item-footer">
    <p class="item-name">${item.name}</p>
    <p class="item-price">
      <s class="item-discount">${
        item.price ? (item.price + 2).toFixed(1) + "$" : ""
      }</s>${item.price ? item.price.toFixed(1) + "$" : "Free To Play"}
    </p>
  </div>
</a>
</li>
`;
};

const itemLoading = () => {
  return `<div class="container-loading"><div class="loading-category"><div></div><div></div><div></div><div></div></div></div>`;
};

const renderCategory = async (params) => {
  try {
    // get element category item
    const categoryList = getEle(".category-list");

    const paramsObject = {
      page: params?.page ? params.page : 1,
      limit: params?.limit ? params.limit : 16,
      genres: params?.genres,
      steamspy_tags: params?.steamspy_tags,
      q: params?.q,
    };

    console.log("paramsObject", paramsObject);

    localStorage.setItem("queryParams", JSON.stringify(paramsObject));

    if (params?.genres) {
      getEle(".title h1 ").textContent += " - " + params?.genres;
    }

    if (paramsObject.page > 1) {
      if (!getEle(".container-loading")) {
        categoryList.insertAdjacentHTML("beforeend", itemLoading());
      }
    } else {
      categoryList.innerHTML = itemLoading();
    }
    const data = await getAllGames(paramsObject);

    const loadingELement = getEle(".container-loading");
    loadingELement.parentNode.removeChild(loadingELement);

    let contentCategory = "";
    data?.forEach((item) => {
      const liEle = categoryItem(item);
      contentCategory += liEle;
    });

    if (paramsObject.page > 1) {
      categoryList.insertAdjacentHTML("beforeend", contentCategory);
    } else {
      categoryList.innerHTML = contentCategory;
    }
  } catch (error) {
    console.log(error);
  }
};

$(".container .scroll-show").on("scroll", function () {
  let div = $(this).get(0);
  if (div.scrollTop + div.clientHeight + 20 >= div.scrollHeight) {
    let objParams = JSON.parse(localStorage.getItem("queryParams"));
    console.log(objParams);
    objParams = { ...objParams, page: objParams.page + 1 };
    console.log(objParams);

    renderCategory(objParams);
  }
});
