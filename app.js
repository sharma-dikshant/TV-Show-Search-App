const form = document.querySelector("#search form");
const showContainer = document.querySelector(".show-container");

// populating the show container with ramdom shows

//!======= creating a array with random show names==============

// Populating the show container with random shows
function getRandomShow() {
  const randomShow = [
    "the",
    "girls",
    "cid",
    "tenali ram",
    "humsafar",
    "factory made",
    "gold rush",
    "omg",
    "man vs wild",
    "india",
    "treasure hunt",
    "mr. bean",
    "moto patlu",
    "forge in fire",
    "shark tank",
  ];
  let randomIndex = Math.floor(Math.random() * randomShow.length);
  return randomShow[randomIndex];
}

async function loadMoreItem() {
  const scrollDistanceToBottom =
    document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

  if (scrollDistanceToBottom < 200) {
    const tempShow = getRandomShow();
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${tempShow}`
      );
      console.log(response.data);

      for (const iterator of response.data) {
        const showEle = document.createElement("div");
        showEle.innerHTML = `
          <div class="card">
            <div class="img"><img src="${
              iterator.show.image
                ? iterator.show.image.medium
                : "placeholder.jpg"
            }" alt="Show Image"></div>
            <span>${iterator.show.name}</span>
            <p class="info">${
              iterator.show.summary
                ? iterator.show.summary.slice(0, 200)
                : "Summary not available"
            }</p>
            <div class="rating">
              <p><strong>Rating: ${
                iterator.show.rating && iterator.show.rating.average
                  ? iterator.show.rating.average + "/10"
                  : "not available"
              }</strong></p>
            </div>
            <button><a href="${
              iterator.show.officialSite ? iterator.show.officialSite : "#"
            }" target="_blank">more</a></button>
          </div>
        `;
        showContainer.append(showEle);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

//! adding event listener to window for scroll event

if (document.querySelector(`.search input[name="query"]`).value.trim() === "") {
  //! adding event listener to window for scroll event

  let isThrottled = false;
  window.addEventListener("scroll", () => {
    if (!isThrottled) {
      loadMoreItem();
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 200);
    }
  });
}

let isThrottled = false;
window.addEventListener("scroll", () => {
  if (!isThrottled) {
    loadMoreItem();
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 200);
  }
});

// providing initial load
loadMoreItem();

//!========================================================================

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const images = showContainer.getElementsByTagName("div");
  if (images) {
    if (images.length > 0) {
      while (images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
      }
    }
  }
  const loadingImg = document.createElement("div");
  loadingImg.innerHTML = `
  <div class="banter-loader">
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
</div>
  `;
  showContainer.appendChild(loadingImg);

  const submitbtn = this.document.querySelector(
    `.search button[value="submit"]`
  );
  const formdata = new FormData(form, submitbtn);
  const query = formdata.get("query");
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    showContainer.removeChild(loadingImg);
    console.log(response.data);
    console.log();
    showImages(response.data);
  } catch (e) {
    console.log(e);
  }
});

function showImages(data) {
  showContainer.innerHTML = "";
  for (const iterator of data) {
    const showEle = document.createElement("div");
    showEle.innerHTML = `
    <div class="card">
      <div class="img"><img src="${iterator.show.image.medium}" alt=""></div>
      <span>${iterator.show.name}</span>
      <p class="info">${
        iterator.show.summary
          ? iterator.show.summary.slice(0, 200)
          : "Summary not available"
      }</p>
      <div class="rating">
      <p> <strong>Rating: ${
        iterator.show.rating.average
          ? iterator.show.rating.average + "/10"
          : "not available"
      }</strong></p>
      </div>
      <button><a href="${iterator.show.officialSite}">more</a></button>
    </div>
    `;
    showContainer.append(showEle);
  }
}
