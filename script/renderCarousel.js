const carouselItem = (item) => {
  return ` <div class="item">
  <img src=${item.header_image} alt=${item.name} global="" offensive="">
  <div class="item-icon">
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
</div>
<div class="item-cart">
          <button class="btn-shake btn-text btn-fadeInDown"><i class="fa-brands fa-shopify"></i></button>
</div>
<div class="item-card">
<i class="fa-brands fa-cc-paypal"></i>
<i class="fa-brands fa-cc-visa"></i>
<i class="fa-brands fa-amazon-pay"></i>
</div>

<div>
</div>
</div>
</div>`;
};

const renderCarousel = async () => {
  const carousel = getEle(".carousel");

  const data = await getFeaturedGames();
  console.log(data);
  let itemCarousel = "";
  data.forEach((item) => {
    itemCarousel += carouselItem(item);
  });
  carousel.innerHTML = itemCarousel;
  configCarousel();
};
