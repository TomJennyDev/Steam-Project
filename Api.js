const BASE_URL = "https://cs-steam-api.herokuapp.com/";

const getDataFromAPI = async (pathUrl, queryParams) => {
  try {
    console.log({ pathUrl, queryParams });
    const url = `${BASE_URL}${pathUrl}${queryParams}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllGames = async ({ page, limit, genres, steamspy_tags, q }) => {
  try {
    const pathUrl = "games";
    genres = genres ? "&genres=" + genres : "";
    steamspy_tags = steamspy_tags ? "&steamspy_tags=" + steamspy_tags : "";
    q = q ? "&q=" + q : "";
    const queryParams = `?page=${page}&limit=${limit}${genres}${steamspy_tags}${q}`;

    const result = await getDataFromAPI(pathUrl, queryParams);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getGenresList = async ({ page, limit }) => {
  try {
    const pathUrl = "genres";
    page = page ? page : 1;
    limit = limit ? limit : 10;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getTagslist = async ({ page, limit }) => {
  try {
    const pathUrl = "steamspy-tags";
    page = page ? page : 1;
    limit = limit ? limit : 10;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getSingleGameDetail = async (appid) => {
  try {
    const pathUrl = `single-game/:${appid}`;
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getFeaturedGames = async () => {
  try {
    const pathUrl = "features";
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result;
  } catch (error) {
    console.log(error);
  }
};
