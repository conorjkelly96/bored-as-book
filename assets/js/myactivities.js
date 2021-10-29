const userChoices = [
  "Play football",
  "Cook an Italian meal",
  "Go to the cinema",
];

// BELOW ARE THE FOLLOWING INPUTS TO THE API URL
const API_KEY = "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af";

const pageNumber = 1;

const pageSize = 10;

const autoCorrect = true;

const BASE_URL =
  "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/";

const q = "covid%2019";

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

// SEE WEEK 6 ACTIVITY 5 FOR AJAX API CALLS
// Conor 29/10: Why does this API require ajax json method to evoke a response?
// please see documentation: https://api.jquery.com/jquery.ajax/
const settings = {
  // CK: this is an asynchronous function
  async: true,
  // see CORS documentation https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  crossDomain: true,
  // URL for the API request
  url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=covid%2019&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true",
  method: "GET",
  // Header Objects: https://developer.mozilla.org/en-US/docs/Web/API/Headers
  headers: {
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af",
  },
};

// const apiCall = $.ajax(settings).done(function (response) {
//   const apiCall = response;
//   console.log(apiCall);
// });

// const getApiCall = async function (url) {
//   const data = $.ajax(settings).done(function (response) {
//     const apiCall = response;
//     console.log(apiCall);
//     return apiCall;
//   });
// };

const getChoicesFromLocalStorage = function () {
  const choices = [JSON.parse(localStorage.getItem("myActivities"))];
};

getChoicesFromLocalStorage();

//rendering choices from local storage
const constructUserChoices = function (data) {
  const choices = [JSON.parse(localStorage.getItem("myActivities"))];
  console.log(choices.length);
  //
  const renderUserChoices = function (choice) {
    const choicesParent = $("#user-choices-list");
    const userChoiceOption = `<li class="list-item button is-link">${choice}</li>`;
    choicesParent.append(userChoiceOption);
  };

  choices.forEach(renderUserChoices);
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
};

const onReady = function () {
  constructSearchResults(mockSearchResults);
  constructUserChoices(userChoices);
  // getApiCall();
};

$(document).ready(onReady);
