// BELOW ARE THE FOLLOWING INPUTS TO THE API URL

const getChoicesFromLocalStorage = function () {
  const choices = JSON.parse(localStorage.getItem("myActivities"));
};

const constructUserChoices = function (data) {
  // get the my activity object and get all the values in their array and flatten the array to make it one
  const datafromLS = [JSON.parse(localStorage.getItem("myActivities"))];

  const choicesParent = $("#user-choices-list");
  choicesParent.on("click", handleActivitySelection);
  // for each activity, create a list item and append to the list item parent
  const renderUserChoices = function (choice) {
    const text = choice;
    const userChoiceOption = `<li data-activity=${text} class='list-item button is-link'>${text}</li>`;

    choicesParent.append(userChoiceOption);
  };

  datafromLS.forEach(renderUserChoices);
};

const onReady = function () {
  constructUserChoices(userChoices);
  getChoicesFromLocalStorage();
};

$(document).ready(onReady);
