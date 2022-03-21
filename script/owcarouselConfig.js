function configCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    center: 1,
    items: 1,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
        nav: true,
      },
    },
  });
}
