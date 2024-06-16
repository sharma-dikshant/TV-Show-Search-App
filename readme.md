# TV Show Search Functionality

This JavaScript code creates a TV show search functionality using the TV Maze API.

## Code Breakdown

### Variables and Selectors

```javascript
const form = document.querySelector("#search");
const showContainer = document.querySelector(".show-container");
```
# getRandomShow()

```javascript
function getRandomShow() {
  const shows = ["Show 1", "Show 2", "Show 3"]; // Predefined array of show names
  const randomIndex = Math.floor(Math.random() * shows.length);
  return shows[randomIndex];
}
```

### Function Purpose
The `getRandomShow()` function is designed to return a random TV show name from a predefined array of show names.



## Array of Show Names:

```javascript
const shows = ["Show 1", "Show 2", "Show 3"];
```

`shows` is a constant array that holds a list of predefined TV show names. In this example, the array contains three show names: "Show 1", "Show 2", and "Show 3".

## Generate Random Index:

```javascript
const randomIndex = Math.floor(Math.random() * shows.length);
```

`Math.random()` generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
Multiplying `Math.random()` by `shows.length` (which is 3 in this case) scales the random number to be between 0 (inclusive) and the length of the array (exclusive).
`Math.floor()` is used to round down to the nearest whole number. This ensures that the randomIndex is a valid index within the array. The possible values for randomIndex are 0, 1, or 2.

### Example Execution
If you call `getRandomShow()` multiple times, it might return different results each time due to the random index generated. For instance:

__First call:__ `getRandomShow()` might return "Show 2".  
__Second call:__ `getRandomShow()` might return "Show 1".  
__Third call:__ `getRandomShow()` might return "Show 3".  

The randomness ensures that you get a different show name on each call, simulating the idea of randomly selecting a TV show.

# loadMoreItem()

```javascript
async function loadMoreItem() {
  const distanceToBottom =
    document.documentElement.offsetHeight -
    (window.scrollY + window.innerHeight);
  if (distanceToBottom < 200) {
    const randomShow = getRandomShow();
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows?q=${randomShow}`
      );
      const showData = response.data;
      const showElement = document.createElement("div");
      showElement.textContent = showData.name;
      showContainer.appendChild(showElement);
    } catch (error) {
      console.error("Error fetching show:", error);
    }
  }
}
```

### Function Purpose
The `loadMoreItem` function is designed to load and display more TV show data when the user scrolls near the bottom of the page. It fetches a random TV show from the TV Maze API and appends the show's name to the showContainer.

Detailed Explanation
Function Declaration:

`async function loadMoreItem()`
This declares an asynchronous function named loadMoreItem. The async keyword indicates that the function contains asynchronous operations, allowing the use of await within it.

Calculate Distance to Bottom:

```javascript
const distanceToBottom =
  document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
```

`document.documentElement.offsetHeight` gives the total height of the document.
`window.scrollY` provides the number of pixels the document is currently scrolled vertically.
`window.innerHeight` gives the height of the viewport.
Subtracting `window.scrollY` + `window.innerHeight` from `document.documentElement.offsetHeight` calculates the distance from the bottom of the viewport to the bottom of the document.

# Check Distance Condition:

```javascript
if (distanceToBottom < 200)
This checks if the distance to the bottom of the document is less than 200 pixels. If true, it proceeds to load more items.
```

# Get Random Show Name:

```javascript
const randomShow = getRandomShow();
```

Calls the getRandomShow function to get a random TV show name from a predefined list.

# Fetch Show Data:

```javascript
const response = await axios.get(
  `https://api.tvmaze.com/singlesearch/shows?q=${randomShow}`
);
const showData = response.data;
```

Uses `axios.get` to make an HTTP GET request to the TV Maze API with the random show name.
await pauses the execution of the function until the promise returned by `axios.get` is resolved.
The response from the API is stored in the response variable.
`response.data` contains the data of the fetched show, which is stored in showData.

# Create and Append Show Element:

```javascript
const showElement = document.createElement("div");
showElement.textContent = showData.name;
showContainer.appendChild(showElement);
```

Creates a new div element to hold the show's name.
Sets the text content of the div to the show's name (`showData.name`).
Appends the div to the `showContainer` element, adding the show's name to the displayed list.

Summary
The `loadMoreItem` function triggers when the user scrolls near the bottom of the page. It calculates the distance to the bottom and, if within 200 pixels, fetches a random TV show from the TV Maze API. The show's name is then displayed by creating and appending a new div element to the showContainer. The function handles errors by logging them to the console. This asynchronous approach ensures that the UI remains responsive while data is being fetched.

# Throttling:

```javascript
window.addEventListener("scroll", loadMoreItem);

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const searchQuery = formData.get("query");
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/singlesearch/shows?q=${searchQuery}`
    );
    showContainer.textContent = ""; // Clear previous search results
    showImages(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
});

function showImages(data) {
  const showElement = document.createElement("div");
  showElement.textContent = data.name; // Display show name
  showContainer.appendChild(showElement);
  // Add more properties like image, summary, rating, etc. to the showElement as needed
}
```

## Notes

- This code utilizes a throttle mechanism to prevent excessive API calls when scrolling rapidly.
- It assumes that the TV Maze API returns an array of objects with specific properties.
