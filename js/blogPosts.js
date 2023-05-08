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
const loader= document.querySelector(".loader");
const sBtn= document.querySelector(".fa-magnifying-glass")
let arrayWithPosts = await urlFunction(baseUrl + "?per_page=50");
console.log(arrayWithPosts);
async function renderPosts(url) {
  let array = await urlFunction(url);
  h2.innerHTML = " ";
  loader.style.display="none"
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
  search.value= " "
  page = 1;
  pageNr = "?page=" + page;
  urlWithPageNr = baseUrl + pageNr;
  loader.style.display="block"
  loadBtn.disabled = false;
  if (select.value === "newest") {
    renderPosts(urlWithPageNr);
  } else if (select.value === "oldest") {
    renderPosts(urlWithPageNr + "&order=asc");
  }
});
loadBtn.addEventListener("click", () => {
  search.value= " "
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
async function searchArray(searchResult) {
  let array = searchResult;
  h2.innerHTML = " ";
  h2.style.display = "none";
  if (array.length >= 1) {
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
search.addEventListener("keypress",(press)=>{
  if(press.key === "Enter"){
    sBtn.click();
  }
})
sBtn.addEventListener("click", () => {
  let searchValue = search.value.toLowerCase().trim();
  let searchResult = arrayWithPosts.filter((search) => {
    if (search.title.rendered.toLowerCase().includes(searchValue)) {
      return true;
    }
  });
  if (searchResult.length >= 1) {
    if (search.value.toLowerCase().trim().length >= 1) {
      loadBtn.disabled = true;
      con.innerHTML = "";
      searchArray(searchResult);
    } else {
      location.reload()
    }
  }
  else if(searchResult.length === 0){
    con.innerHTML = "<h2>Sorry no matches</h2>"
  }
});
