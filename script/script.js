let arrParams = [
  { name: "page", value: 1 },
  { name: "limit", value: 8 },
];

async function main() {
  await renderCarousel();

  arrParams.forEach((queryParams) => {
    setParamsToUrl(queryParams);
  });
  await rendergenresList();
  await rendertagsList();
  await renderCategory();

  getEle(".loading").classList.add("visible");
}

main();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const scrollCategory = new SweetScroll({
      trigger: ".scroll-category[data-scroll]",
      duration: 1000,
      easing: "easeOutQuint",
      offset: -100,
    });
    const scrollerToTop = new SweetScroll({
      /* some options */
      trigger: ".scroll-top[data-scroll]",
      duration: 3000,
      easing: "easeOutQuint",
      offset: 0,
    });
  },
  false
);

// toggle sidebar
getEle(".shrink-sidebar").addEventListener("click", () => {
  const col = getEle(".container .col:first-child");

  col.classList.contains("shrink-col")
    ? col.classList.remove("shrink-col")
    : col.classList.add("shrink-col");

  const arrowRight = getEle(".shrink-sidebar .fa-solid");
  arrowRight.classList.contains("fa-angle-right")
    ? (getEle(
        ".shrink-sidebar"
      ).innerHTML = `<i class="fa-solid fa-angle-left"></i>`)
    : (getEle(
        ".shrink-sidebar"
      ).innerHTML = `<i class="fa-solid fa-angle-right"></i>`);
});

console.log(getListEle(".genres-menu"));

//toggle navbar

const toggleFilter = () => {
  getEle(".hamburger-lines .line1").classList.toggle("active-line1");
  getEle(".hamburger-lines .line2").classList.toggle("active-line2");
  getEle(".hamburger-lines .line3").classList.toggle("active-line3");

  getEle(".container .col:first-child").classList.toggle("visible-sidebar");
};

getEle(".hamburger-lines").addEventListener("click", toggleFilter);
