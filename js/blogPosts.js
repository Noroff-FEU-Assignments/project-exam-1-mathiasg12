import { baseUrl } from "./function.js";
import { urlFunction } from "./function.js";
let page = 1;
let pageNr = "?page=" + page;
let urlWithPageNr = baseUrl + pageNr;
const con= document.querySelector(".blogCon")
const h2= document.querySelector("h2")
const loadBtn= document.querySelector(".load")
async function renderPosts(){
    let array= await urlFunction(urlWithPageNr);
    h2.innerHTML= "All posts"
    if(array.length >= 0){
    for (let i = 0; i < array.length; i++){
      let posts= array[i]
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
        }}
    }
    else{
        con.innerHTML += `<h2>You reached the end!</h2>`;
        loadBtn.disabled = true;
    }
}
   renderPosts();
   loadBtn.addEventListener("click",()=>{
    page ++
    pageNr = "?page=" + page;
    urlWithPageNr = baseUrl + pageNr;
    renderPosts(urlWithPageNr);
   })