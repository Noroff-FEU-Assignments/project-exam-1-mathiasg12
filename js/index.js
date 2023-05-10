import { baseUrl } from "./function.js";
import { html } from "./function.js";
import { urlFunction } from "./function.js";
import { formatDate } from "./function.js";
const url = baseUrl + "?per_page=4";
const expandedUrl = baseUrl + "?per_page=50";
const nextArrow = document.querySelector("#arrowRight");
const backArrow = document.querySelector("#arrowLeft");
const latestPosts = document.querySelector(".latestCon");
const featuredPosts = document.querySelector(".featuredCon");
const recoPosts = document.querySelector(".recoCon");
const featureH2 = document.querySelector(".featuredH2");
const recoH2 = document.querySelector(".recoH2");
const latestH2 = document.querySelector(".latestH2");
const loader = document.querySelector(".loader");
let page = 1;
let pageNr = "&page=" + page;
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
async function renderCarousel() {
  let postsArray = await urlFunction(urlWithPageNr);
  if (postsArray.length >= 0) {
    latestPosts.innerHTML = " ";
    latestH2.innerHTML = "Latest Posts";
    loader.innerHTML = "";
    for (let i = 0; i < postsArray.length; i++) {
      let pictureId = postsArray[i];
      let param = new URLSearchParams(pictureId);
      let id = param.get("featured_media");
      try {
        let featuredPicture = await fetch(
          "https://exam1api.gamehubstore.live/wp-json/wp/v2/media/" + id
        );
        let arrayPic = await featuredPicture.json();
        let posts = postsArray[i];
        latestPosts.innerHTML += html(
          posts,
          arrayPic,
          "thumbnailLatest",
          formatDate(posts.date)
        );
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
async function RenderBasedonCategory(category, con, h2, h2text, thumbClass) {
  let array = await urlFunction(expandedUrl);
  con.innerHTML = " ";
  h2.innerHTML = h2text;
  loader.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let posts = array[i];
    let postDate = formatDate(posts.date);
    console.log(posts.author);
    if (posts.categories[0] === category) {
      let param = new URLSearchParams(posts);
      let id = param.get("featured_media");
      try {
        let featuredPicture = await fetch(
          "https://exam1api.gamehubstore.live/wp-json/wp/v2/media/" + id
        );
        let arrayPic = await featuredPicture.json();
        con.innerHTML += html(posts, arrayPic, thumbClass, postDate);
      } catch (error) {
        console.log(error);
      }
    } else {
      continue;
    }
  }
}
RenderBasedonCategory(4, featuredPosts, featureH2, "Featured", "thumbFeatured");
RenderBasedonCategory(3, recoPosts, recoH2, "Recommended", "thumbReco");
renderCarousel();
