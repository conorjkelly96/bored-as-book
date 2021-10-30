fetch(
  "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=Manchester%20United&pageNumber=1&pageSize=10&autoCorrect=true",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key": "bc1d02851emsh853dc79af4fea2cp1e4839jsned8c0b9e23af",
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
