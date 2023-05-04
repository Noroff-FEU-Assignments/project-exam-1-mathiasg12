import {urlFunction} from "./function.js";
const baseUrl= "https://exam1api.gamehubstore.live/wp-json/wp/v2/posts/";
let querrySearch= document.location.search;
let newParameter= new URLSearchParams(querrySearch);
let idParameter= newParameter.get("id")
let newUrl= baseUrl + idParameter;
const body= document.querySelector("body")
let json= await urlFunction(newUrl)
const con= document.querySelector(".speCon");
const title= document.querySelector("title");
function renderBlog(){
console.log(json)
title.innerHTML= json.slug
con.innerHTML= `<div><h1>${json.title.rendered}</h1><div>${json.content.rendered}</div></div>`
}
renderBlog();

document.addEventListener("click",(myClick)=>{
    if(myClick.target.hasAttribute('srcset')){
      myClick.target.classList.add("bigImage")
    }
    else{
      document.querySelector(".bigImage").classList.remove("bigImage");
    }
})