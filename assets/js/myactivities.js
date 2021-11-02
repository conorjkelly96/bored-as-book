// Using object Mapping to display categories on activity card
const categoryMapper = {
  social: "Social",
  recreational: "Recreational",
  music: "Music",
  education: "Education",
  relaxation: "Relaxation",
};
const modalContainer = $("#modal-container");
const allCategoriesContainer = $("#all-categories");
const clearLocalStorageBtn = $("#clear-ls");

const constructCategoryTitle = function (category) {
  return $(`<div class="card-category">
    <h2 class="title has-text-white">${categoryMapper[category]}</h2>
  </div>`);
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

const removeModal = function () {
  $("#modal-div").remove();
};

const clearLocalStorage = function () {
  localStorage.removeItem("myActivities");
  removeModal();
  renderAllCards();
};

const renderConfirmationModal = function () {
  const confirmationModal = `<div id="modal-div" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure??</p>
      </header>
      <section class="modal-card-body">
      <p class="subtitle">Doing this will remove all the fun activities you've saved, are you sure you want to continue?</p>
      </section>
      <footer class="modal-card-foot">
        
        <button class="button is-success" id="confirm-delete">Confirm</button>
        <button class="button is-danger" id="cancel-delete">Cancel</button>
        
      </footer>
    </div>
  </div>`;

  modalContainer.append(confirmationModal);

  const modalCancelBtn = $("#cancel-delete");
  const modalConfirmBtn = $("#confirm-delete");

  modalCancelBtn.on("click", removeModal);
  modalConfirmBtn.on("click", clearLocalStorage);
};

const constructUserChoices = function (userChoices) {
  // get user choices from local storage
  const selectedUserChoices = Object.keys(userChoices);

  // for each activity, create a list item and append to the list item parent
  const renderCategory = function (category) {
    const choices = userChoices[category];

    const parentContainer = $("<div>");

    const categoryTitle = constructCategoryTitle(category);

    const choicesContainer = $(
      `<div class="cards-container" id="card-container"></div>`
    );

    const renderChoice = function (choice) {
      const choiceCard = `<div class="card activity-card">
        <div class="card-content">
          <div class="media">
            ${getPriceElement(choice.price)}
            <div class="media-content">
              <p class="title is-4">${choice.activity}</p>
              <p class="subtitle is-6">${categoryMapper[category]}</p>
            </div>
          </div>
          <div class="content">
            <div class="is-size-7">Added on: ${moment(choice.timeStamp).format(
              "ddd Do MMM, YYYY"
            )}</div>
          </div>
          <footer class="card-footer pt-4">
            <button class="card-footer-item button is-info m-1">
              View
            </button>
            <button class="card-footer-item button is-danger m-1 delete-btn" data-key="${
              choice.key
            }" data-category ="${category}">
              Delete
            </button>
          </footer>
        </div>
      </div>`;

      choicesContainer.append(choiceCard);
    };

    choices.forEach(renderChoice);

    parentContainer.append(categoryTitle);
    parentContainer.append(choicesContainer);
    allCategoriesContainer.append(parentContainer);
    $(".delete-btn").on("click", deleteActivity);
  };

  selectedUserChoices.forEach(renderCategory);
};

const renderNoActivitiesModal = function () {
  const modal = `<div class="container" id="app">
    <div id="modal-div" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="title has-text-centered has-text-white">
          You do not have any activities! &#128556; Go back to <a href="./index.html">the homepage</a>to become less boring!
        </p>
      </div>
    </div>
  </div>`;

  $("#clear-ls").remove();

  modalContainer.append(modal);
};

const deleteActivity = function (event) {
  const activityData = JSON.parse(localStorage.getItem("myActivities")) || {};

  const category = $(event.target).data("category");
  const categoryArray = activityData[category];
  const key = $(event.target).data("key");

  const newCategoryArray = categoryArray.filter((item) => {
    return item.key !== `${key}`;
  });

  if (newCategoryArray.length === 0) {
    // remove the key from object
    delete activityData[category];
  } else {
    activityData[category] = newCategoryArray;
  }

  localStorage.setItem("myActivities", JSON.stringify(activityData));

  renderAllCards();
};

const renderAllCards = function () {
  allCategoriesContainer.empty();
  const userChoices = JSON.parse(localStorage.getItem("myActivities")) ?? {};
  if (Object.keys(userChoices).length === 0) {
    renderNoActivitiesModal();
  } else {
    constructUserChoices(userChoices);
  }
};

const onReady = function () {
  renderAllCards();
  clearLocalStorageBtn.on("click", renderConfirmationModal);
};

$(document).ready(onReady);
