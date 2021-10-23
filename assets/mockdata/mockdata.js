// Data Retrieved from BORED API

// index html

const url = "https://www.boredapi.com/api/activity?type={{type}}";

const response = {
  activity: "Learn how to iceskate or rollerskate",
  type: "recreational",
  participants: 1,
  price: 0.1,
  link: "",
  key: "5947957",
  accessibility: 0.25,
};

//  construct cards from response data
// three data sets from the JSON object to construct cards
response.activity;
response.type;
response.price;
// key can be used as a data attribute - store in Local Storage to re-render the cards
response.key;

// myActivites

// pass the object values as parameter to the ticket
