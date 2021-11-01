## The following document contains potential styles that could be used throughout the project:

### Notification Modals

To be used when a user has added an activity to their Activity List.

```html
<div class="notification is-primary">
  <button class="delete"></button>
  <p>
    <span class="activity-notification">Go to a local thrift shop</span>
    has been added to your
    <span href="#">activity list</span>
  </p>
</div>
```

Button container for if the user is able to select multiple categories.

````html
<div class="choices-container" id="choices-container">
  <div class="buttons-container">
    <button class="category-btn button is-large is-fullwidth is-link">
      Social
    </button>
    <button class="category-btn button is-large is-fullwidth is-link">
      Educational
    </button>
    <button
      class="category-btn button is-large is-fullwidth is-link is-success"
    >
      Recreational
    </button>
    <button class="category-btn button is-large is-fullwidth is-link">
      Relaxation
    </button>
    <button
      class="category-btn button is-large is-fullwidth is-link is-success"
    >
      Music
    </button>
  </div>
</div>

```javascript const saveData = function (event) { if
($(event.target).is("button")) { const timeOfEvent = $(event.target).attr("id");
const userInput = $(event.target).prev().val(); const dataFromLocalStorage =
JSON.parse( localStorage.getItem("activitiesByHour") );
dataFromLocalStorage[timeOfEvent] = userInput; localStorage.setItem(
"activitiesByHour", JSON.stringify(dataFromLocalStorage) ); } };
````
