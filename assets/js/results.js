// Web Search API requirements
const API_KEY = "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af";
const BASE_URL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com";
const query = "Manchester";

const settings = {
  headers: {
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
};

// CK: the response has been tested with the const query variable
const fetchDataFromApi = async function (url, settings = {}) {
  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const constructSearchActivity = function (results) {
  const searchParent = $("#search-container");
  const constructSearchResults = function (result) {
    const searchResult = `<div class="tile is-child box">
    <p class="title has-text-centered">${result.title}</p>
    <hr />
    <p>${result.description}</p>
    <hr />
    <div class="has-text-centered my-2">
    <a class="button is-success is-light" target="_blank" href=${result.url}>More Details</a>
    </div>
    </div>`;
    searchParent.append(searchResult);
  };
  searchParent.empty();
  results.forEach(constructSearchResults);
};

const readParametersFromUrl = function () {
  const params = new URLSearchParams(document.location.search.substring(1));
  const activity = params.get("activity");

  return activity;
};

const handleActivitySelection = async (activity) => {
  const url = `${BASE_URL}/api/Search/WebSearchAPI?q=${encodeURIComponent(
    activity
  )}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
  const searchResults = await fetchDataFromApi(url, settings);
  const suggestedActivity = searchResults || [];
  // construct activity card here with the response
  constructSearchActivity(suggestedActivity.value);
};

const onReady = function () {
  const activity = readParametersFromUrl();
  $("#search-result").text(activity);
  handleActivitySelection(activity);
};

$(document).ready(onReady);
