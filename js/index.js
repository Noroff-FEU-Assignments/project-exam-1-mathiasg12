const url = "https://exam1api.gamehubstore.live/wp-json/wp/v2/posts?per_page=4";
const nextArrow = document.querySelector("#arrowRight");
const backArrow = document.querySelector("#arrowLeft");
const latestPosts = document.querySelector(".latestCon");
page = 1;
pageNr = "&page=" + page;
let urlWithPageNr = url + pageNr;
nextArrow.addEventListener("click", () => {
  page = page + 1;
  pageNr = "&page=" + page;
  urlWithPageNr = url + pageNr;
  renderCarousel();
});
backArrow.addEventListener("click", () => {
  page = page - 1;
  pageNr = "&page=" + page;
  urlWithPageNr = url + pageNr;
  renderCarousel();
});
async function getPost() {
  try {
    const resp = await fetch(urlWithPageNr);
    const apiJson = await resp.json();
    return apiJson;
  } catch (error) {
    console.log(error);
  }
}
async function renderCarousel() {
  let postsArray = await getPost();
  if (postsArray.length >= 0) {
    latestPosts.innerHTML = "";
    console.log(postsArray);
    for (let i = 0; i < postsArray.length; i++) {
      let pictureId = postsArray[i];
      let param = new URLSearchParams(pictureId);
      let id = param.get("featured_media");
      let featuredPicture = await fetch(
        "https://exam1api.gamehubstore.live/wp-json/wp/v2/media/" + id
      );
      try {
        let arrayPic = await featuredPicture.json();
        let posts = postsArray[i];
        latestPosts.innerHTML += `<div class="thumbnailLatest"><img src="${arrayPic.source_url}" class="thumbNailImg"></img><h2>${posts.title.rendered}</h2></div>`;
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    page = 1;
    pageNr = "&page=" + page;
    urlWithPageNr = url + pageNr;
    renderCarousel();
  }
}
renderCarousel();
