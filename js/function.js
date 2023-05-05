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

