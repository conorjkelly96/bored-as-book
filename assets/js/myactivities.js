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

const BASE_URL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com";

const query = "mancheser united";

let i;

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

let myHeaders = new Headers();

myHeaders.append("x-rapidapi-host", `${BASE_URL}`);
myHeaders.append("x-rapidapi-key", `${API_KEY}`);

const settings = {
  // async: true,
  // crossDomain: true,
  // method: "GET",
  // headers: myHeaders,
  headers: {
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af",
  },
};

// // SEE WEEK 6 ACTIVITY 5 FOR AJAX API CALLS
// Conor 29/10: Why does this API require ajax json method to evoke a response?
// Please read the API: https://rapidapi.com/contextualwebsearch/api/web-search/ under code snippits > javascript jQuery
// please see documentation: https://api.jquery.com/jquery.ajax/
// const settings = {
//   // CK: this is an asynchronous function
//   async: true,
//   // see CORS documentation https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//   crossDomain: true,
//   // URL for the API request
//   url: `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=${query}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`,
//   method: "GET",
//   // Header Objects: https://developer.mozilla.org/en-US/docs/Web/API/Headers
//   headers: {
//     "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
//     "x-rapidapi-key": "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af",
//   },
// };

// CK: the response has been tested with the const query variable
const getApiCall = async function (activity) {
  console.log(myHeaders);
  try {
    const url = `${BASE_URL}/api/Search/WebSearchAPI?q=${activity}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
    const data = await fetch(url, settings);
    console.log(data);
    return data.json();
  } catch (error) {
    console.log(error);
  }
};

// const getApiCall = async function (activity) {
//   try {
//     const url = `${BASE_URL}/api/Search/WebSearchAPI?q=${activity}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
//     const data = await fetch(url, settings);
//     console.log(data);
//     return await data.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const getChoicesFromLocalStorage = function () {
  const choices = [JSON.parse(localStorage.getItem("myActivities"))];
};

//rendering choices from local storage
// const constructUserChoices = function (data) {
//   const datafromLS = [...JSON.parse(localStorage.getItem("myActivities"))];

//   // for each activity, create a list item and append to the list item parent
//   const renderUserChoices = function (choice) {
//     const choicesParent = $("#user-choices-list");
//     const userChoiceOption = `<li class="list-item button is-link">${choice}</li>`;
//     choicesParent.append(userChoiceOption);
//   };
//   console.log(datafromLS);

//   datafromLS.forEach(renderUserChoices);
// };

const constructUserChoices = function (data) {
  // get the my activity object and get all the values in their array and flatten the array to make it one
  const datafromLS = [...JSON.parse(localStorage.getItem("myActivities"))];

  const choicesParent = $("#user-choices-list");
  choicesParent.on("click", handleActivitySelection);
  // for each activity, create a list item and append to the list item parent
  const renderUserChoices = function (choice) {
    const text = choice;
    console.log(choice.activity);
    const userChoiceOption =
      '<li data-activity="' +
      text +
      "\" class='list-item button is-link' >" +
      text;
    ("</li>");
    choicesParent.append(userChoiceOption);
  };

  datafromLS.forEach(renderUserChoices);
};

// const constructSearchResults = function (results) {
//   const searchParent = $("#search-container");

//   const searchResults = `<div class="tile is-child box">
//   <p class="title">${results.title}</p>
//   <p>
//   ${results.description}
//   </p>
//   <a>${results.url}</a>
//   </div>`;
//   //searchParent.empty();
//   searchParent.append(searchResults);
// };

const handleActivitySelection = async (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const activity = target.data("activity");

    const suggestedActivity = (await getApiCall(activity)) || [];
    console.log(suggestedActivity);
    // construct activity card here with the response
    constructSearchActivity(suggestedActivity.value);
  }
};

const constructSearchActivity = function (results) {
  const searchParent = $("#search-container");
  const constructSearchResults = function (result) {
    const searchResult = `<div class="tile is-child box">
  <p class="title">${result.title}</p>
  <p>
  ${result.description}
  </p>
  <a>${result.url}</a>
  </div>`;
    searchParent.append(searchResult);
  };
  searchParent.empty();
  results.forEach(constructSearchResults);
};
const onReady = function () {
  // constructSearchResults(mockSearchResults);
  constructUserChoices(userChoices);
  getChoicesFromLocalStorage();
  // console.log(getApiCall());
};

$(document).ready(onReady);
