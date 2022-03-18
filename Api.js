const BASE_URL = "https://cs-steam-api.herokuapp.com/";

const getDataFromAPI = async (pathUrl, queryParams) => {
  try {
    const url = `${BASE_URL}${pathUrl}${queryParams}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllGames = ({ page, limit, genres, steamspy_tags, q }) => {
  const pathUrl = "games";
  page = page ? page : 1;
  limit = limit ? limit : 10;
  const queryParams = `?page=${page}&limit=${limit}&genres=${genres}&steamspy_tags=${steamspy_tags}&q=${q}`;
  return getDataFromAPI(pathUrl, queryParams);
};

const getGenresList = ({ page, limit }) => {
  const pathUrl = "genres";
  page = page ? page : 1;
  limit = limit ? limit : 10;
  const queryParams = `?page=${page}&limit=${limit}`;
  return getDataFromAPI(pathUrl, queryParams);
};

const getTagslist = (queryParams) => {
  const pathUrl = "steamspy-tags";
  page = page ? page : 1;
  limit = limit ? limit : 10;
  const queryParams = `?page=${page}&limit=${limit}`;
  return getDataFromAPI(pathUrl, queryParams);
};

const getSingleGameDetail = (appid) => {
  const pathUrl = `single-game/:${appid}`;
  return getDataFromAPI(pathUrl, queryParams);
};

const getFeaturedGames = () => {
  const pathUrl = "features";
  return getDataFromAPI(pathUrl, queryParams);
};
