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

const query = "covid%2019";

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
  async: true,
  crossDomain: true,
  method: "GET",
  headers: myHeaders,
};

// CK: the response has been tested with the const query variable
const getApiCall = async function (activity) {
  try {
    const url = `${BASE_URL}/api/Search/WebSearchAPI?q=${activity}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
    const data = await fetch(url, settings);
    console.log(data);
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};

const getChoicesFromLocalStorage = function () {
  const choices = [JSON.parse(localStorage.getItem("myActivities"))];
};

//rendering choices from local storage
const constructUserChoices = function (data) {
  // get the my activity object and get all the values in their array and flatten the array to make it one
  const datafromLS = [
    ...Object.values(JSON.parse(localStorage.getItem("myActivities"))),
  ].flat();

  const choicesParent = $("#user-choices-list");
  choicesParent.on("click", handleActivitySelection);
  // for each activity, create a list item and append to the list item parent
  const renderUserChoices = function (choice) {
    const text = choice.activity.toLowerCase();
    console.log(choice.activity);
    const userChoiceOption =
      '<li data-activity="' +
      text +
      "\" class='list-item button is-link' >" +
      choice.activity +
      "</li>";
    choicesParent.append(userChoiceOption);
  };

  datafromLS.forEach(renderUserChoices);
};

// cfunction to listen to even listener from the selected activity
const handleActivitySelection = async (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const activity = target.data("activity");

    const suggestedActivity = (await getApiCall(activity)) || [];
    console.log(suggestedActivity);
    // construct activity card here with the response
    constructSearchActivity(suggestedActivity);
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
    //searchParent.empty();
    searchParent.append(searchResult);
  };
  results.forEach(constructSearchResults);
};

const onReady = function () {
  // constructSearchResults(mockSearchResults);
  constructUserChoices(userChoices);
  getChoicesFromLocalStorage();
};

$(document).ready(onReady);
