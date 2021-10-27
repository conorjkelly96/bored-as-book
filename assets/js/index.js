const choicesContainer = $("#choices-container");
const cardContainer = $("#card-container");
const baseURL = "https://www.boredapi.com";
let currentCategory;
// if making API call this sets to TRUE, else FALSE
let currentStatus;

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
    currentCategory = categorySelected;
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
    constructActivityCard(data);
  }
};

const handleUserChoices = async function (event) {
  const target = $(event.target);

  if (target.is("button")) {
    console.log("button click");
    // const userChoice = target.data("choice");
    const url = `${baseURL}/api/activity?type=${currentCategory}`;
    const data = await getApiCall(url);
    constructActivityCard(data);
  }
};

const constructActivityCard = function (activity) {
  const activityParent = $("#card-container");

  const activityCard = `      <div class="card ml-3 mr-3">
<div class="card-content">
  <p id="activity-name" class="activity-text">
    ${activity.activity}
  </p>
  <p id="activity-type" class="activity-text">${activity.type}</p>
  <p id="activity-cost" class="activity-text">Cost Index: ${
    activity.price * 10
  }/10</p>
</div>
<div class="card-footer">
  <button data-choice="no" id="no-btn" class="card-footer-item button is-danger">
    No
  </button>
  <button data-choice="yes" id="yes-btn" class="card-footer-item button is-success">
    Yes
  </button>
</div>
</div>`;

  activityParent.empty();
  activityParent.append(activityCard);
};

choicesContainer.on("click", handleSelectedChoice);
cardContainer.on("click", handleUserChoices);
$(document).ready(onReady);
