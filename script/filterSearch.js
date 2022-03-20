const searchEle = getEle("#search");
const keywordEle = getEle("#keyword");
const keywordItemEle = getEle(".keyword-item");
// search keyword
searchEle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const string = e.target.value;
    const paramsObject = {
      q: string,
    };
    keywordItemEle.innerText = string;
    if (string) {
      keywordEle.style.visibility = "visible";
    }

    renderCategory(paramsObject);
  }
});

keywordEle.addEventListener("click", () => {
  keywordEle.style.visibility = "hidden";
  renderCategory();
});

//search by genres
