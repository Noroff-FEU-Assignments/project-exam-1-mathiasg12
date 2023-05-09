const bars = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const logoCon = document.querySelector(".logoCon");
const navList= document.querySelector("nav ul li")
const baseUrl= "https://exam1api.gamehubstore.live/wp-json/wp/v2/posts/";
bars.addEventListener("click", () => {
  nav.classList.toggle("navOn");
  bars.classList.toggle("fa-x");
  bars.classList.toggle("fa-bars");
});
document.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.classList.add("smallHeader");
    logo.classList.add("smallLogo");
    logoCon.classList.add("smallLogoCon");
    navList.classList.add("smallList")
  } else {
    header.classList.remove("smallHeader");
    logo.classList.remove("smallLogo");
    logoCon.classList.remove("smallLogoCon");
    navList.classList.remove("smallList")
  }
});
function html(posts, arrayPic, thumbClass) {
  return `<a class="${thumbClass}" href="blog_specific.html?id=${posts.id}"><img src="${arrayPic.source_url}" alt="${arrayPic.alt_text}"></img><h3>${posts.title.rendered}</h3></a>`;
}
export const urlFunction= async function getPost(url) {
  try {
    const resp = await fetch(url);
    const apiJson = await resp.json();
    return apiJson;
  } catch (error) {
    console.log(error);
  }
}
export {baseUrl}
export {html}

