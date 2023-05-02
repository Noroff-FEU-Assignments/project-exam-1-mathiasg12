const bars = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const logoCon = document.querySelector(".logoCon");
const body = document.querySelector("main");
const navList= document.querySelector("nav ul li")
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

