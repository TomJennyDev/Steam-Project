const searchEle = getEle("#search");
const keywordEle = getEle("#keyword");
const keywordItemEle = getEle(".keyword-item");
// search keyword
searchEle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const string = e.target.value;
    keywordItemEle.innerText = string;

    const isDetailPage = window.location.pathname.includes("detail");
    if (isDetailPage) {
      let stringParams = `?q=${string}`;
      replaceUrlDocument(stringParams);
    } else {
      setParamsToUrl({ name: "q", value: string });
      setParamsToUrl({ name: "page", value: 1 });

      if (string) {
        keywordEle.style.visibility = "visible";
      }
      e.target.value = "";
      const positioncategory = getEle(".category").offsetTop;

      getEle(".container .col:last-child").scrollTo({
        top: positioncategory,
        left: 0,
        behavior: "smooth",
      });

      renderCategory();
    }
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    if (width < 415) {
      toggleFilter();
    }
  }
});

keywordEle.addEventListener("click", () => {
  keywordEle.style.visibility = "hidden";
  setParamsToUrl({ name: "q", value: "" });
  renderCategory();
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  if (width < 415) {
    toggleFilter();
  }
});

//search by genres
