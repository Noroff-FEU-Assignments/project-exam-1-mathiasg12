const bars = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const logoCon = document.querySelector(".logoCon");
const navList = document.querySelector("nav ul li");
const baseUrl = "https://exam1api.gamehubstore.live/wp-json/wp/v2/posts/";
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
    navList.classList.add("smallList");
  } else {
    header.classList.remove("smallHeader");
    logo.classList.remove("smallLogo");
    logoCon.classList.remove("smallLogoCon");
    navList.classList.remove("smallList");
  }
});
function html(posts, arrayPic, thumbClass, postDate) {
  return `<a class="${thumbClass}" href="blog_specific.html?id=${posts.id}">
  <img src="${arrayPic.source_url}" alt="${arrayPic.alt_text}"></img><div class="date"><p>${postDate}</p></div><h3>${posts.title.rendered}</h3></a>`;
}
const urlFunction = async function getPost(url) {
  try {
    const resp = await fetch(url);
    const apiJson = await resp.json();
    return apiJson;
  } catch (error) {
    console.log(error);
  }
};
function formatDate(date) {
  let newDate = new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour12: "false",
  });
  return newDate;
}
function formatDateComments(n) {
  let newDate = new Date(n).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour24: "true",
  });
  return newDate;
}
function checkLength(min, input) {
  if (input.value.trim().length > min) {
    return true;
  } else {
    return false;
  }
}
function emailValidation() {
  const format = /\S+@\S+\.\S+/;
  const emailVal = email.value;
  return format.test(emailVal);
}
function checkEmail(emailLabel, email) {
  if (emailValidation() === true) {
    emailLabel.innerHTML = "Email";
    emailLabel.style.display="hidden"
    emailLabel.classList.remove("errorLabel");
    email.classList.remove("errorInput");
  } else {
    emailLabel.innerHTML = `<p>Please enter a valid email</p>`;
    emailLabel.style.display="inline"
    emailLabel.classList.add("errorLabel");
    email.classList.add("errorInput");
  }
}
function lengthValidation(min, checkLength, input, label, orgName) {
  if (checkLength === true) {
    label.innerHTML = orgName;
    label.style.display="hidden"
    label.classList.remove("errorLabel");
    input.classList.remove("errorInput");
  } else {
    label.innerHTML = `<p>Sorry ${orgName} must contain at least ${
      min + 1
    } characters</p>`;
    label.style.display="inline"
    label.classList.add("errorLabel");
    input.classList.add("errorInput");
  }
}
export { formatDate };
export { baseUrl };
export { html };
export { urlFunction };
export { checkLength };
export { emailValidation };
export { checkEmail };
export { lengthValidation };
export { formatDateComments };
