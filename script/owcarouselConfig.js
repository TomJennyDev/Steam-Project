function configCarousel() {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    items: 1,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    animateIn: "flipInX",
    animateOut: "slideOutDown",
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
        nav: true,
        loop: false,
      },
    },
  });
}
