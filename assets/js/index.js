const choicesContainer = $("#choices-container");
const baseURL = "https://www.boredapi.com";

const toggleNavBar = function () {
  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  $(".navbar-burger").toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
};

const onReady = function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(toggleNavBar);
};

const resetChoicesCSS = function (buttons) {
  const removeSuccessClass = function (buttonOption) {
    const button = $(buttonOption);
    if (button.hasClass("is-success")) {
      button.removeClass("is-success");
    }
  };
  buttons.forEach(removeSuccessClass);
};

// function to make the API call
const getApiCall = async function (url) {
  const data = await fetch(url);
  return data.json();
};

const handleSelectedChoice = async function (event) {
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);

  // get selected target if target is a button, then get the data-category of button
  if (target.is("button")) {
    const categorySelected = target.data("category");
    // go through buttons to find 'is-success' class and remove
    const choicesButtons = currentTarget.find("button");
    // add spread operator to the choices button array to loop over the buttons
    resetChoicesCSS([...choicesButtons]);
    target.addClass("is-success");
    const url =
      categorySelected === "random"
        ? `${baseURL}/api/activity`
        : `${baseURL}/api/activity?type=${categorySelected}`;
    const data = await getApiCall(url);
    console.log(data);
  }
};

choicesContainer.on("click", handleSelectedChoice);
$(document).ready(onReady);
