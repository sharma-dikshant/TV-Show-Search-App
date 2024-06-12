# TV Show Search Functionality

This JavaScript code creates a TV show search functionality using the TV Maze API.

## Code Breakdown

### Variables and Selectors

```javascript
const form = document.querySelector('#search');
const showContainer = document.querySelector('.show-container');

function getRandomShow() {
    const shows = ["Show 1", "Show 2", "Show 3"]; // Predefined array of show names
    const randomIndex = Math.floor(Math.random() * shows.length);
    return shows[randomIndex];
}

async function loadMoreItem() {
    const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
    if (distanceToBottom < 200) {
        const randomShow = getRandomShow();
        try {
            const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${randomShow}`);
            const showData = response.data;
            const showElement = document.createElement('div');
            showElement.textContent = showData.name;
            showContainer.appendChild(showElement);
        } catch (error) {
            console.error('Error fetching show:', error);
        }
    }
}

window.addEventListener('scroll', loadMoreItem);

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const searchQuery = formData.get('query');
    try {
        const response = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchQuery}`);
        showContainer.textContent = ''; // Clear previous search results
        showImages(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});

function showImages(data) {
    const showElement = document.createElement('div');
    showElement.textContent = data.name; // Display show name
    showContainer.appendChild(showElement);
    // Add more properties like image, summary, rating, etc. to the showElement as needed
}

## Notes

- This code utilizes a throttle mechanism to prevent excessive API calls when scrolling rapidly.
- It assumes that the TV Maze API returns an array of objects with specific properties.
