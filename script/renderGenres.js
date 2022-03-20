const getGenresId = (genreItem) => {
  const genresName = genreItem.getAttribute("data-name");
  const paramsObject = {
    genres: genresName,
  };

  renderCategory(paramsObject);
};

const genresItem = (item) => {
  return `<li><a id="genre-item" href="#category" data-name=${item.name} onclick="getGenresId(this)">${item.name}</a></li>`;
};

const rendergenresList = async () => {
  try {
    let contentgenresList = "";
    const data = await getGenresList();

    data.forEach((genre) => {
      const genreEle = genresItem(genre);
      contentgenresList += genreEle;
    });

    getEle(".genres-menu").innerHTML = contentgenresList;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
