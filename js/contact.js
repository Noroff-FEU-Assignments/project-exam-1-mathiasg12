const nameInput = document.querySelector("#name");
const nameLabel = document.querySelector("#nameL");
const email = document.querySelector("#email");
const emailLabel = document.querySelector("#emailL");
const subject = document.querySelector("#subject");
const subjectLabel = document.querySelector("#subjectL");
const message = document.querySelector("#text");
const messageLabel = document.querySelector("#textL");
const sendBtn = document.querySelector(".submitBtn");
const form = document.querySelector("form");
import { checkLength } from "./function.js";
import { emailValidation } from "./function.js";
import { checkEmail } from "./function.js";
import { lengthValidation } from "./function.js";
const thankYouMessage = `<section class="mainContent thank_you"><h2>Thank you</h2>
<p> Thank you for your message. I will answer as soon as possible by email</p></section> `;
sendBtn.addEventListener("click", (reload) => {
  reload.preventDefault();
  if (
    checkLength(5, nameInput) &&
    checkLength(25, message) &&
    emailValidation() === true &&
    checkLength(15, subject)
  ) {
    form.innerHTML = thankYouMessage;
    window.scrollTo(0, 0);
  } else {
    lengthValidation(
      5,
      checkLength(5, nameInput),
      nameInput,
      nameLabel,
      "Name",
      "none"
    );
    lengthValidation(
      15,
      checkLength(15, subject),
      subject,
      subjectLabel,
      "Subject",
      "none"
    );
    lengthValidation(
      25,
      checkLength(25, message),
      message,
      messageLabel,
      "Message",
      "none"
    );
    checkEmail(emailLabel, email, "none");
  }
});
email.addEventListener("change", () => {
  checkEmail(emailLabel, email, "none");
});
nameInput.addEventListener("change", () => {
  lengthValidation(
    5,
    checkLength(5, nameInput),
    nameInput,
    nameLabel,
    "Name",
    "none"
  );
});
subject.addEventListener("change", () => {
  lengthValidation(
    15,
    checkLength(15, subject),
    subject,
    subjectLabel,
    "Subject",
    "none"
  );
});
message.addEventListener("change", () => {
  lengthValidation(
    25,
    checkLength(25, message),
    message,
    messageLabel,
    "Message",
    "none"
  );
});
