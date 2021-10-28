const choicesContainer = $("#choices-container");
const cardContainer = $("#card-container");
const navBurger = $(".navbar-burger");
const baseURL = "https://www.boredapi.com";
// if making API call this sets to TRUE, else FALSE
let currentStatus;

// to store api data
let choiceData;
// local storage key name
const choiceDataKey = "choiceData";

const toggleNavBar = function () {
  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  navBurger.toggleClass("is-active");
  $(".navbar-menu").toggleClass("is-active");
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

const renderActivityCard = async function (categorySelected) {
  const url =
    categorySelected === "random"
      ? `${baseURL}/api/activity`
      : `${baseURL}/api/activity?type=${categorySelected}`;
  const data = await getApiCall(url);
  constructActivityCard(data);
};

const handleSelectedChoice = async function (event) {
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);

  if (target.is("button")) {
    // reset the selected button
    resetChoicesCSS([...currentTarget.find("button")]);

    // set the selected button to green
    target.addClass("is-success");

    // render the selected activity card
    const categorySelected = target.data("category");
    renderActivityCard(categorySelected);
  }
};

const handleUserChoices = async function (event) {
  const target = $(event.target);

  if (target.is("button")) {
    // render the selected activity card
    const categorySelected = target.data("category");
    renderActivityCard(categorySelected);
  }
};

// Add Dollar Sign to activity.price
const constructActivityCard = function (activity) {
  const activityParent = $("#card-container");

  const activityCard = `<div class="card ml-3 mr-3">
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
      <button data-choice="no" id="no-btn" class="card-footer-item button is-danger" data-category=${
        activity.type
      }>
        No
      </button>
      <button data-choice="yes" id="yes-btn" class="card-footer-item button is-success" data-category=${
        activity.type
      }>
        Yes
      </button>
    </div>
  </div>`;

  activityParent.empty();
  activityParent.append(activityCard);
};

const onReady = function () {
  navBurger.on("click", toggleNavBar);
  choicesContainer.on("click", handleSelectedChoice);
  cardContainer.on("click", handleUserChoices);
};

$(document).ready(onReady);
