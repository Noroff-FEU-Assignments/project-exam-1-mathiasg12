import {urlFunction} from "./function.js";
import { baseUrl } from "./function.js";
import { formatDate } from "./function.js";
let querrySearch= document.location.search;
let newParameter= new URLSearchParams(querrySearch);
let idParameter= newParameter.get("id");
let newUrl= baseUrl + idParameter;
let json= await urlFunction(newUrl);
const con= document.querySelector(".speCon");
const loader= document.querySelector(".loader")
const title= document.querySelector("title");
const metaDescription= document.querySelector("meta[name=description]");
const userUrl = "https://exam1api.gamehubstore.live/wp-json/wp/v2/users/";
const commentUrl = "https://exam1api.gamehubstore.live/wp-json/wp/v2/comments";
let author= await urlFunction(userUrl + json.author);
let text= json.excerpt.rendered;
let metaCon= document.createElement("div");
let postId= 52;
let userEmail= "test@gmail.com";
let userName= "mathiasG"
let comment= "hello thisssssssss is a test to see how hard it is to post a comment";
metaCon.innerHTML = text;
console.log(json)
function htmlContent(json){
  return `<div><h1>${json.title.rendered}</h1><div class="date"><p>${formatDate(json.date)}</p><p> Author: ${author.name}</p></div><div>${json.content.rendered}</div></div>`
};
function renderBlog(){
title.innerHTML= json.slug;
metaDescription.setAttribute("content",`${metaCon.textContent}`);
loader.style.display="none";
con.innerHTML= htmlContent(json);
};
renderBlog();
document.addEventListener("click",(myClick)=>{
    if(myClick.target.hasAttribute('srcset')){
      myClick.target.classList.add("bigImage");
    }
    else{
      if(document.querySelector(".bigImage") !== null){
      document.querySelector(".bigImage").classList.remove("bigImage");
    }
    }
});
let commentPost =JSON.stringify({
  post: postId,
  author_name: userName,
  author_email: userEmail,
  content: comment,
})
function postComment(){
  try{fetch(commentUrl, {
    method: "post",
    headers: {"Content-Type": "application/json",},
    body: commentPost,

  })}
  catch(error){
    console.log(error)
  }}

