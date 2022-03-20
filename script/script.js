async function main() {
  await renderCarousel();
  await rendergenresList();
  await renderCategory();

  getEle(".loading").classList.add("visible");
}

main();
