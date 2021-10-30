const API_KEY = "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af";

const pageNumber = 1;

const pageSize = 10;

const autoCorrect = true;

const BASE_URL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com";

const query = "mancheser united";

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

const settings = {
  headers: {
    "x-rapidapi-host": `"${BASE_URL}"`,
    "x-rapidapi-key": `"${API_KEY}""`,
  },
};

// CK: the response has been tested with the const query variable
const fetchDataFromApi = async function (url, settings = {}) {
  try {
    console.log(url);
    const response = await fetch(url, settings);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
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

const handleActivitySelection = async (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const activity = target.data("activity");
    const url = `${BASE_URL}/api/Search/WebSearchAPI?q=${activity}&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true`;
    const searchResults = await fetchDataFromApi(url, settings);
    console.log(searchResults);
    const suggestedActivity = searchResults || [];
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
