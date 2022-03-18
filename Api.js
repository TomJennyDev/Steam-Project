const BASE_URL = "https://cs-steam-api.herokuapp.com/";

const getDataFromAPI = async () => {
  try {
    const url = `${BASE_URL}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data[""];
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
