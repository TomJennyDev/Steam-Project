const getGenresId = (genreItem) => {
  const positioncategory = getEle(".category").offsetTop;

  getEle(".container .col:last-child").scrollTo({
    top: positioncategory,
    left: 0,
    behavior: "smooth",
  });

  const genresName = genreItem.getAttribute("data-name");

  const paramsObject = {
    genres: genresName,
  };

  const isMatch = getParamsUrl()?.genres === genresName;

  const isDetailPage = window.location.pathname.includes("detail");

  if (isDetailPage) {
    let stringParams = `?genres=${paramsObject.genres}`;
    replaceUrlDocument(stringParams);
  } else if (isMatch) {
    setParamsToUrl({ name: "genres", value: "" });
    setParamsToUrl({ name: "page", value: 1 });
    renderCategory();
  } else {
    const queryParams = {
      name: "genres",
      value: paramsObject.genres,
    };
    setParamsToUrl(queryParams);
    setParamsToUrl({ name: "page", value: 1 });
    getEle(".category").scrollTop = 0;
    renderCategory();
  }
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  if (width < 415) {
    toggleFilter();
  }
};

const rendergenresList = async () => {
  try {
    let contentgenresList = "";
    const data = await getGenresList();

    data.forEach((genre) => {
      const genresItem = `<li class="genre-item" data-name=${genre.name}  onclick="getGenresId(this)">
      <a class="scroll-category" href="#category" >${genre.name}</a>
     </li>`;

      contentgenresList += genresItem;
    });

    getEle(".genres-menu").innerHTML = contentgenresList;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//active item genres
