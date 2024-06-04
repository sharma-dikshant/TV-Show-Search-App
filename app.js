const form = document.querySelector("#search form");
const showContainer = document.querySelector(".show-container");
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const images = showContainer.getElementsByTagName("img");
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
  for (const iterator of data) {
    const imageEle = this.document.createElement("img");
    imageEle.src = iterator.show.image.medium;
    showContainer.append(imageEle);
  }
}
