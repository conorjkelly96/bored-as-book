const navBurger = $(".navbar-burger");

const toggleNavBar = function () {
  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  navBurger.toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
};

navBurger.on("click", toggleNavBar);
