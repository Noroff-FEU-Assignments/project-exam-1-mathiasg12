import { baseUrl } from "./function.js";
import { urlFunction } from "./function.js";
let page = 1;
let pageNr = "?page=" + page;
let urlWithPageNr = baseUrl + pageNr;
const con = document.querySelector(".blogCon");
const h2 = document.querySelector("h2");
const loadBtn = document.querySelector(".load");
const select = document.querySelector("#select");
const search = document.querySelector("#search");
let arrayWithPosts = await urlFunction(baseUrl);
console.log(arrayWithPosts);
async function renderPosts(url) {
  let array = await urlFunction(url);
  h2.innerHTML = " ";
  h2.style.display = "none";
  if (array.length >= 0) {
    for (let i = 0; i < array.length; i++) {
      let posts = array[i];
      let param = new URLSearchParams(posts);
      let id = param.get("featured_media");
      let featuredPicture = await fetch(
        "https://exam1api.gamehubstore.live/wp-json/wp/v2/media/" + id
      );
      try {
        let arrayPic = await featuredPicture.json();
        con.innerHTML += `<a class="thumbFeatured" href="blog_specific.html?id=${posts.id}"><img src="${arrayPic.source_url}"></img><h3>${posts.title.rendered}</h3></a>`;
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    con.innerHTML += `<h2>You reached the end!</h2>`;
    loadBtn.disabled = true;
  }
}
renderPosts(urlWithPageNr);
select.addEventListener("change", () => {
  con.innerHTML = "";
  page = 1;
  pageNr = "?page=" + page;
  urlWithPageNr = baseUrl + pageNr;
  loadBtn.disabled = false;
  if (select.value === "newest") {
    renderPosts(urlWithPageNr);
  } else if (select.value === "oldest") {
    renderPosts(urlWithPageNr + "&order=asc");
  }
});
loadBtn.addEventListener("click", () => {
  if (select.value === "newest") {
    page++;
    pageNr = "?page=" + page;
    urlWithPageNr = baseUrl + pageNr;
    renderPosts(urlWithPageNr);
  } else if (select.value === "oldest") {
    page++;
    pageNr = "?page=" + page;
    urlWithPageNr = baseUrl + pageNr;
    renderPosts(urlWithPageNr + "&order=asc");
  }
});
