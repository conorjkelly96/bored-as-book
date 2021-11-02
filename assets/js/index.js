const choicesContainer = $("#choices-container");
const cardContainer = $("#card-container");
const jokeContainer = $("#joke-container");
const modalContainer = $("#modal-container");
const notificationContainer = $("#notification-container");

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
// to store api data
let choiceData;

// fetching joke from Dad Joke api
const fetchDataFromApi = async function (url, settings = {}) {
  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {}
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

const renderActivityCard = async function (categorySelected) {
  const url =
    categorySelected === "random"
      ? `${boredBaseURL}/api/activity`
      : `${boredBaseURL}/api/activity?type=${categorySelected}`;
  choiceData = await fetchDataFromApi(url);
  constructActivityCard(choiceData);
};

const handleSelectedChoice = async function (event) {
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);

  if (target.is("button") || target.is("i")) {
    console.log("hi");
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
    // Render Alert depending on user choice - CK - not currently working

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
        <i class="fas fa-dollar-sign pay-icon"></i>
      </div>
    </div>`;
  }
  return "";
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderClock = function () {
  function update() {
    $("#clock").html(moment().format("DD MMMM YYYY H:mm:ss"));
  }
  setInterval(update, 1000);
};

// rendering joke cards on load
const renderNewJoke = async function () {
  const url = dadJokeBaseUrl;
  const newJoke = await fetchDataFromApi(url, settings);

  // constructingJokeCard for every time a joke loads
  const constructJokeCard = function (joke) {
    const jokeCard = `<div class="card mt-6">
    <header class="card-header has-text-centre">
    <p class="card-header-title"> Bored O'Clock:<span class="card-header-title" id="clock">
    </span>
    </p>
    
    </header>
    <div class="card-content">
    <div class="content">
    <p>${joke.body[0].setup}</p>
    <p>${joke.body[0].punchline}</p>
    </div>
    </div>
    </div>`;

    jokeContainer.empty();
    jokeContainer.append(jokeCard);
  };
  // construct activity card here with the response
  constructJokeCard(newJoke);
};

// Add Dollar Sign to activity.price.
const constructActivityCard = function (activity) {
  const activityCard = `<div class="card activity-card">
  <div class="card-content">
  <div class="media">
       ${getPriceElement(activity.price)}
      <div class="media-content">
        <p class="title is-4">${activity.activity}</p>
        <p class="subtitle is-6">${capitalizeFirstLetter(activity.type)}</p>
      </div>
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

  cardContainer.empty();
  cardContainer.append(activityCard);
};

// Rendering alert depending on user choice
const renderAlert = function (event) {
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);

  const yesAlert = `<div class="notification is-primary m-3">
  Hey! Look who's not boring now!
  </div>`;

  const noAlert = `<div class="notification is-danger m-3">
  You're seriously boring...
  </div>`;

  if (target.data("choice") === "yes") {
    //if the user selects YES to an activity, then display the yesAlert
    notificationContainer.empty();
    notificationContainer.append(yesAlert);
  } else {
    //if the user selects NO to an activity, then display the noAlert
    notificationContainer.empty();
    notificationContainer.append(noAlert);
  }
};

choicesContainer.on("click", handleSelectedChoice);
cardContainer.on("click", handleUserChoices);
cardContainer.on("click", renderAlert);

// function to render the modal which renders on window load
const renderModal = function () {
  const loadModal = `<div id="modal-div" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Welcome to Bored-As-Book!</p>
      </header>
      <section class="modal-card-body">
      <p class="subtitle">Bored and fancy a random dad joke? &#128104; Looking to get inspiration for your next activity? &#128758; Want a place to browse the web on a bunch of random suggestions, all in one place? &#129337;</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Start the fun!</button>
      </footer>
    </div>
  </div>`;
  modalContainer.append(loadModal);
};

// function to close the modal which renders on window load
const closeModal = function (event) {
  const target = $(event.target);
  const modalDiv = $("#modal-div");

  // the "is-active" class ensures a modal is displayed - needs to be removed to close the modal
  if (target.is("button")) {
    modalDiv.removeClass("is-active");
  }
};

modalContainer.on("click", closeModal);

const onLoad = function () {
  renderModal();

  renderClock();

  renderNewJoke();
};

$(window).on("load", onLoad);
modalContainer.on("click", closeModal);
