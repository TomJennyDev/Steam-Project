const BASE_URL = "https://cs-steam-api.herokuapp.com/";
const getEle = (element) => document.querySelector(element);
const getListEle = (elements) => document.querySelectorAll(elements);
const getParamsUrl = () => {
  return new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
};
const replaceUrlDocument = (queryParams) => {
  let origin = window.location.origin;
  window.location.replace(`${origin}/${queryParams}`);
};

const setParamsToUrl = (objQueryParams) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(objQueryParams?.name, objQueryParams?.value);
  history.replaceState(null, null, `?${queryParams.toString()}`);
};



const getDataFromAPI = async (pathUrl, queryParams = "") => {
  try {
    console.log({ pathUrl, queryParams });
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

const getAllGames = async ({ page, limit, genres, steamspy_tags, q }) => {
  try {
    const pathUrl = "games";
    genres = genres ? "&genres=" + genres : "";
    steamspy_tags = steamspy_tags ? "&steamspy_tags=" + steamspy_tags : "";
    q = q ? "&q=" + q : "";
    const queryParams = `?page=${page}&limit=${limit}${genres}${steamspy_tags}${q}`;

    const result = await getDataFromAPI(pathUrl, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getGenresList = async (objParams) => {
  try {
    const pathUrl = "genres";
    const page = objParams?.page ? objParams.page : 1;
    const limit = objParams?.limit ? objParams.limit : 16;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getTagslist = async (objParams) => {
  try {
    const pathUrl = "steamspy-tags";
    const page = objParams?.page ? objParams.page : 1;
    const limit = objParams?.limit ? objParams.limit : 16;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getDataFromAPI(pathUrl, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getSingleGameDetail = async (appid) => {
  try {
    const pathUrl = `single-game/${appid}`;
    const result = await getDataFromAPI(pathUrl);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getFeaturedGames = async () => {
  try {
    const pathUrl = "features";

    const result = await getDataFromAPI(pathUrl);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
