const display = document.querySelector("#details");

const fetchApi = async (paramUrl, paramOptions = {}) => {
  const response = await fetch(paramUrl, paramOptions);
  const responseData = await response.json();
  return responseData;
};

// const renderPic = () => {
//   fetchApi("https://cs-steam-api.herokuapp.com/games")
//     .then((result) => {
//       // let imgSrc = result.data[0].header_image;
//       // let img = document.createElement("img");
//       // img.src = imgSrc;
//       // img.style.width = "270px";
//       // img.style.height = "150px";
//       // detailPic.appendChild(img);

//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// renderPic();

const renderGame = (el) => {
  const newDiv = document.createElement("div");

  newDiv.innerHTML = `<div class="game_wrapper">
    <div class="cover" onClick="appDetail(${el["_id"]})">
    <img
    src="${el["header_image"]}" data-id="${el["_id"]}"
    />
    <div class="game_info">
    <p>${el["name"]}</p>
    <p>${el["price"]}</p>
    </div>
    </div>
    </div>`;
  display.appendChild(newDiv);
};

const renderDisplay = () => {
  fetchApi("https://cs-steam-api.herokuapp.com/games")
    .then((result) => {
      display.innerHTML = "";
      result.data.map((game) => renderGame(game));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

renderDisplay();
