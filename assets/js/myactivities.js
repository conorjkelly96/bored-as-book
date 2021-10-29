const userchoices = [
  "Play footbal",
  "Cook an Itallian meal",
  "Go to the cinema",
];

//rendering choices from local storage
const constructUserChoices = function () {
  const choicesParent = $("#user-choices-list");

  const userChoiceOption = `<li class="list-item button is-link">${userChoices[0]}</li>`;
};

const constructSearchResults = function () {
  const searchParent = $("#search-container");

  const searchResults = `<div class="tile is-child box">
  <p class="title">Search Result</p>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
    facilis aliquid similique sint, reiciendis cumque inventore rerum
    unde eligendi iste est a optio. Velit magnam voluptatem eius quis
    sit molestias?
  </p>
</div>`;
};
