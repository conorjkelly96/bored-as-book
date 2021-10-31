const choicesContainer = $("#choices-container");
const cardContainer = $("#card-container");
// Bored-API base url
const boredBaseURL = "https://www.boredapi.com";
// Dad-Joke-API base url
const dadJokeBaseUrl =
  "https://dad-jokes.p.rapidapi.com/random/joke?=&nsfw=false";

// dadJokeAPI header settings
const settings = {
  headers: {
    "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
    "x-rapidapi-key": "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af",
  },
};

// fetching joke from Dad Joke api
const fetchDataFromApi = async function (url, settings = {}) {
  try {
    console.log(url);
    const response = await fetch(url, settings);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// to store api data
let choiceData;

const resetChoicesCSS = function (buttons) {
  const removeSuccessClass = function (buttonOption) {
    const button = $(buttonOption);
    if (button.hasClass("is-success")) {
      button.removeClass("is-success");
    }
  };
  buttons.forEach(removeSuccessClass);
};

// function to make the API call to bored API
const getApiCall = async function (url) {
  const data = await fetch(url);
  return data.json();
};

const renderActivityCard = async function (categorySelected) {
  const url =
    categorySelected === "random"
      ? `${boredBaseURL}/api/activity`
      : `${boredBaseURL}/api/activity?type=${categorySelected}`;
  choiceData = await getApiCall(url);
  constructActivityCard(choiceData);
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

  if (target.data("choice") === "yes") {
    // get data from local storage
    const myActivities = JSON.parse(localStorage.getItem("myActivities")) ?? {};

    // get the category
    const category = target.data("category");

    // get the category list
    const activities = myActivities[category] ?? [];

    // calculating current time
    const timeStamp = moment();
    choiceData.timeStamp = timeStamp;

    // push the choice data in the list
    activities.push(choiceData);

    // set the list back in object
    myActivities[category] = activities;

    // store choice data in local storage
    localStorage.setItem("myActivities", JSON.stringify(myActivities));
  }

  if (target.is("button")) {
    // render the selected activity card
    const categorySelected = target.data("category");
    renderActivityCard(categorySelected);
  }
};

const getPriceElement = function (price) {
  if (price > 0) {
    return `<div class="media-left">
      <div class="icon pay-icon">
        <i class="fas fa-dollar-sign"></i>
      </div>
    </div>`;
  }
  return "";
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// constructingJokeCard for every time a joke loads
const constructJokeCard = function (joke) {
  const jokeContainer = $("#joke-container");

  const jokeCard = `<div class="card mt-6">
    <header class="card-header">
      <p class="card-header-title">
        The time is bored o'clock: 11:09 PM - 1 Jan 2016
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <p>What did one wall say to the other wall?</p>
        <p>I'll meet you at the corner!</p>
      </div>
    </div>
    <footer class="card-footer">
      <button
        id="new-joke-btn"
        class="card-footer-item button is-success"
      >
        New Joke
      </button>
    </footer>
  </div>`;

  jokeContainer.empty();
  jokeContainer.append(jokeCard);
};

// Add Dollar Sign to activity.price.
const constructActivityCard = function (activity) {
  const activityParent = $("#card-container");
  const activityChoice = activity[activity];
  console.log(activityChoice);

  const activityCard = `<div class="card activity-card">
  <div class="card-content">
    <div class="media">
       ${getPriceElement(activity.price)}
      <div class="media-content">
        <p class="title is-4">${activity.activity}</p>
        <p class="subtitle is-6">${capitalizeFirstLetter(activity.type)}</p>
      </div>
    </div>
    <div class="content">
      <div class="is-size-7">Added on: ${moment(activity.timeStamp).format(
        "ddd Do MMM, YYYY"
      )}</div>
    </div>
    <footer class="card-footer pt-4">
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
    </footer>
  </div>
</div>`;
  activityParent.empty();
  activityParent.append(activityCard);
};

choicesContainer.on("click", handleSelectedChoice);
cardContainer.on("click", handleUserChoices);
