// BELOW ARE THE FOLLOWING INPUTS TO THE API URL

const categoryMapper = {
  social: "Social",
  recreational: "Recreational",
  music: "Music",
  education: "Education",
  relaxation: "Relaxation",
};

// All categories container
const allCategoriesContainer = $("#all-categories");

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
            <div class="is-size-7">Added on: Tue 5th Nov, 2021</div>
          </div>
          <footer class="card-footer pt-4">
            <button class="card-footer-item button is-info m-1">
              View
            </button>
            <button class="card-footer-item button is-danger m-1">
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
  };

  selectedUserChoices.forEach(renderCategory);
};

const onReady = function () {
  const userChoices = JSON.parse(localStorage.getItem("myActivities")) ?? {};
  constructUserChoices(userChoices);
};

$(document).ready(onReady);
