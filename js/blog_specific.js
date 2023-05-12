import {urlFunction} from "./function.js";
import { baseUrl } from "./function.js";
import { formatDate } from "./function.js";
let querrySearch= document.location.search;
let newParameter= new URLSearchParams(querrySearch);
let idParameter= newParameter.get("id");
let newUrl= baseUrl + idParameter;
let json= await urlFunction(newUrl);
let postBtn= document.querySelector(".publishCom");
const con= document.querySelector(".speCon");
const commentsCon =document.querySelector(".commentsCon")
const loader= document.querySelector(".loader")
const title= document.querySelector("title");
const metaDescription= document.querySelector("meta[name=description]");
const userUrl = "https://exam1api.gamehubstore.live/wp-json/wp/v2/users/";
const commentUrl = "https://exam1api.gamehubstore.live/wp-json/wp/v2/comments";
const getCommentsUrl= commentUrl +  "?post=" + idParameter;
const form= document.querySelector("form");
let author= await urlFunction(userUrl + json.author);
let text= json.excerpt.rendered;
let metaCon= document.createElement("div");
let postId= json.id;
let comments= await urlFunction(getCommentsUrl)
console.log(comments)
metaCon.innerHTML = text;
console.log(json)
function htmlContent(json){
  return `<div><h1>${json.title.rendered}</h1><div class="date"><p>${formatDate(json.date)}</p><p> Author: ${author.name}</p></div><div>${json.content.rendered}</div></div>`
};
function htmlComments(json){
  return `<div class="commentCard"><h3>${json.author_name}</h3><div class="date"><p>${formatDate(json.date)}</p><p>${json.content.rendered}</p></div>`
};
function renderComments(){
  if(comments.length >= 1){
for(let i=0; i < comments.length; i++ ){
  let allComments= comments[i]
  commentsCon.innerHTML += htmlComments(allComments);
}}
else{
  commentsCon.innerHTML= `<h3>No comments published</h3>`
}
}
renderComments()
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
async function postComment(object){
  try{await fetch(commentUrl, {
    method: "post",
    headers: {"Content-Type": "application/json",},
    body: object,

  })}
  catch(error){
    console.log(error)
    form.innerHTML=`<h3 class="errorMessage">Sorry something went wrong please try again later</h3>`
    form.style.color="coral"
    form.style.display="block"
  }}
postBtn.addEventListener("click",(reload)=>{
  reload.preventDefault();
let userEmail= document.querySelector("#email").value;
let userName= document.querySelector("#name").value;
let comment= document.querySelector("#com").value;
let commentPost =JSON.stringify({
  post: postId,
  author_name: userName,
  author_email: userEmail,
  content: comment,
})
  postComment(commentPost);
})

