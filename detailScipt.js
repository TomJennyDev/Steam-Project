const getSingleGame = async (appID) => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/single-game/${appID}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDetailGame = async () => {
  const data = await getSingleGame(20);
  console.log(data);
  const name = document.querySelector("#detail h1");
  name.textContent = data.name;

  const price = document.querySelector("#detail h3");
  if (data.price === 0) price.textContent = `Free to play`;
  else price.textContent = `$ ${data.price}`;

  const headerImg = document.querySelector("#detail .game-img img");
  headerImg.setAttribute("src", `${data["header_image"]}`);
  headerImg.setAttribute("alt", `game-image`);

  const contentDetail = document.querySelector(".content-detail");
  contentDetail.innerHTML = `<p></p>
  <div class="data">
      <p>ALL REVIEWS:</p>
      <p id="review">                  
      </p>
      <p>RELEASE DATE:</p>
      <p id="release-date"></p>
      <p>DEVELOPER:</p>
      <p id="dev"></p>
      <p>PLATFORM:</p>
      <p id="platform"></p>
  </div>`;
  contentDetail.style = ` background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );`;
  const description = document.querySelector(".content-detail p");
  description.textContent = data.description;

  const review = document.querySelector("#review");
  const rating =
    Math.round(
      (data["positive_ratings"] /
        (data["positive_ratings"] + data["negative_ratings"])) *
        100 *
        100
    ) / 100;
  if (rating >= 50) review.textContent = `positive ( ${rating}% )`;
  else review.textContent = `negative ( ${rating}% )`;

  const releaseDate = document.querySelector("#release-date");
  releaseDate.textContent = data["release_date"];

  const developer = document.querySelector("#dev");
  developer.textContent = data.developer.join(", ");

  const platform = document.querySelector("#platform");
  platform.textContent = data.platforms.join(", ");

  const categoryTag = document.querySelector(".category-tags");
  categoryTag.innerHTML = `<p>Popular user-defined tags for this product:</p>`;
  data.categories.forEach((tag) => {
    btn = document.createElement("button");
    btn.className = "category-tag";
    btn.textContent = tag;
    categoryTag.appendChild(btn);
  });

  const background = document.querySelector("#detail");
  background.style = `background: url(${data.background})
  no-repeat center center/cover;`;
  console.log(data.background);
};

getDetailGame();