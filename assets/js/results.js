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
    console.log(url);
    const response = await fetch(url, settings);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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

const handleActivitySelection = async () => {
  const url = `${BASE_URL}/api/Search/WebSearchAPI?q=Manchester&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
  const searchResults = await fetchDataFromApi(url, settings);
  console.log(searchResults);
  const suggestedActivity = searchResults || [];
  // construct activity card here with the response
  constructSearchActivity(suggestedActivity.value);
};

const onReady = function () {
  handleActivitySelection();
};

$(document).ready(onReady);
