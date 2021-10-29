console.log("linked");

const userChoices = [
  "Play football",
  "Cook an Italian meal",
  "Go to the cinema",
];

const mockSearchResults = {
  id: "5496466817154867838",
  title: "Learn C and C++ Programming - Cprogramming.com",
  url: "https://www.cprogramming.com",
  description:
    "The best site for C and C++ programming. Popular, beginner-friendly C and C++ programming tutorials to help you master C and C++!",
  body: "The best site for C and C++ programming. Popular, beginner-friendly C and C++ programming tutorials to help you master C and C++!",
  snippet:
    "The best site for C and C++ <b>programming</b>. Popular, beginner-friendly C and C++ <b>programming</b> tutorials to help you master C and C++!.",
  keywords: "",
  language: "en",
  isSafe: true,
  datePublished: "0001-01-01T00:00:00",
};

//rendering choices from local storage
const constructUserChoices = function (choices) {
  const choicesParent = $("#user-choices-list");
  const userChoiceOption = `<li class="list-item button is-link">${userChoices[0]}</li>`;
  console.log(choicesParent);
  choicesParent.append(userChoiceOption);
};

const constructSearchResults = function (results) {
  const searchParent = $("#search-container");

  const searchResults = `<div class="tile is-child box">
  <p class="title">${results.title}</p>
  <p>
  ${results.description}
  </p>
  <a>${results.url}</a>
</div>`;
  //searchParent.empty();
  searchParent.append(searchResults);
  console.log(searchParent);
};

const onReady = function () {
  constructSearchResults(mockSearchResults);
  constructUserChoices(userChoices);
};

$(document).ready(onReady);
