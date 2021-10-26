## Solution Overview

### Bored As Book!

An app which allows users to randomly generate a list of activities given a random list of criteria, price, participants. The users will be presented with options and will be able to swipe left (delete) or swipe right (add to basket). API sourced from https://www.boredapi.com/documentation.

Once the user has done navigating their list of activities, they can review their activity bucket-list on the "my boredom list". They will be presented with cards displaying their choices. The uSearch tool bar will allow users to make simple web queries from inside the app to search for activities in their local area. API sourced from https://rapidapi.com/blog/web-search-api-with-python-php-ruby-javascript-examples/.

### HTML Page Structure

- Landing Page: very brief explanation of what to do on the page and select a random activity.
- My Activities Page: user can navigate to a list of activities in the application where they can view their choices. User will be able to interact with a search engine to gather information about their choices.
- About Us Page: Links to developer linkedIn/GitHub pages.

### CSS Framework

- https://bulma.io/

### JavaScript Framework

- jQuery

## Bored API

### Sample Data from API

The Bored API does not require a key, nor authentication and allows the dev team to "plug in and play".

Sample response (Postman) when https://www.boredapi.com/api/activity URL is called. A completely random activity is generated.

```javascript
{
  "activity": "Go for a walk",
  "type": "relaxation",
  "participants": 1,
  "price": 0,
  "link": "",
  "key": "4286250",
  "accessibility": 0.1
}
```

When an "activity type" is selected (example: recreational):

```javascript
{
    "activity": "Go to a local thrift shop",
    "type": "recreational",
    "participants": 1,
    "price": 0.1,
    "link": "",
    "key": "8503795",
    "accessibility": 0.2
}
```

## WebSearch API

### Sample Data from API

Given a set of user defined parameters (user and application defined)

| User Defined   | Application Defined                              |
| -------------- | ------------------------------------------------ |
| - Search Input | - Request URL, pageNumber, pageSize, autoCorrect |

Sample Respone when a user searches for "programming":

```javascript
:{
12 items
    "id":"5496466817154867838"
    "title":"Learn C and C++ Programming - Cprogramming.com"
    "url":"https://www.cprogramming.com"
    "description":"The best site for C and C++ programming. Popular, beginner-friendly C and C++ programming tutorials to help you master C and C++!"
    "body":"The best site for C and C++ programming. Popular, beginner-friendly C and C++ programming tutorials to help you master C and C++!"
    "snippet":"The best site for C and C++ <b>programming</b>. Popular, beginner-friendly C and C++ <b>programming</b> tutorials to help you master C and C++!."
    "keywords":""
    "language":"en"
    "isSafe":true
    "datePublished":"0001-01-01T00:00:00"
    "provider":{...}3 items
    "image":{...}12 items
}

```
