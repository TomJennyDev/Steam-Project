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

const renderCategory = async () => {
  try {
    // get element category item
    const categoryList = getEle(".category-list");

    const queryParams = getParamsUrl();

    const paramsObject = {
      page: queryParams?.page ? queryParams.page : 1,
      limit: queryParams?.limit ? queryParams.limit : 16,
      genres: queryParams?.genres,
      steamspy_tags: queryParams?.steamspy_tags,
      q: queryParams?.q,
    };

    if (queryParams?.genres || queryParams?.steamspy_tags) {
      const stringTags = `${
        queryParams?.steamspy_tags ? "Tags: " + queryParams?.steamspy_tags : ""
      }`;
      const stringGernes = `${
        queryParams?.genres ? "Genres: " + queryParams?.genres : ""
      }`;
      getEle(".title").innerHTML = `<h1>${stringGernes}${
        stringGernes & stringTags ? " - " : ""
      }${stringTags}</h1>`;
    } else {
      getEle(".title").innerHTML = ` <h1>Game category</h1>`;
    }

    if (paramsObject.page > 1) {
      if (!getEle(".container-loading")) {
        categoryList.insertAdjacentHTML("beforeend", itemLoading());
      }
    } else {
      categoryList.innerHTML = itemLoading();
    }
    const data = await getAllGames(paramsObject);
    console.log(data);
    const loadingELement = getEle(".container-loading");
    if (loadingELement) {
      loadingELement.parentNode.removeChild(loadingELement);
    }

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

$(".category").on("scroll", function () {
  let div = $(this).get(0);
  if (div.scrollTop + div.clientHeight + 20 >= div.scrollHeight) {
    const queryParams = getParamsUrl();
    setParamsToUrl({ name: "page", value: +queryParams?.page + 1 });
    renderCategory();
  }
});
