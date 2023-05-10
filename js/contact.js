const nameInput = document.querySelector("#name");
const nameLabel = document.querySelector("#nameL");
const email = document.querySelector("#email");
const emailLabel = document.querySelector("#emailL");
const subject = document.querySelector("#subject");
const subjectLabel = document.querySelector("#subjectL");
const message = document.querySelector("#text");
const messageLabel = document.querySelector("#textL");
const sendBtn = document.querySelector(".submitBtn");
function emailValidation() {
  const format = /\S+@\S+\.\S+/;
  const emailVal = email.value;
  return format.test(emailVal);
}
function checkEmail() {
  if (emailValidation() === true) {
    emailLabel.innerHTML = "Email";
    emailLabel.classList.remove("errorLabel");
    email.classList.remove("errorInput");
  } else {
    emailLabel.innerHTML = `<p>Please enter a valid email</p>`;
    emailLabel.classList.add("errorLabel");
    email.classList.add("errorInput");
  }
}
function checkLength(min, input) {
  if (input.value.trim().length > min) {
    return true;
  } else {
    return false;
  }
}
function lengthValidation(min, checkLength, input, label, orgName) {
  if (checkLength === true) {
    label.innerHTML = orgName;
    label.classList.remove("errorLabel");
    input.classList.remove("errorInput");
  } else {
    label.innerHTML = `<p>Sorry ${orgName} must contain at least ${
      min + 1
    } characters</p>`;
    label.classList.add("errorLabel");
    input.classList.add("errorInput");
  }
}
sendBtn.addEventListener("click", (reload) => {
  reload.preventDefault();
  if (
    checkLength(5, nameInput) &&
    checkLength(25, message) &&
    (emailValidation() === true) &&
    checkLength(15, subject)
  ) {
    window.location = "thx.html";
  } else {
    lengthValidation(
      5,
      checkLength(5, nameInput),
      nameInput,
      nameLabel,
      "Name"
    );
    lengthValidation(
      15,
      checkLength(15, subject),
      subject,
      subjectLabel,
      "Subject"
    );
    lengthValidation(
      25,
      checkLength(25, message),
      message,
      messageLabel,
      "Message"
    );
    checkEmail();
  }
});
email.addEventListener("change", () => {
  checkEmail();
});
nameInput.addEventListener("change", () => {
  lengthValidation(5, checkLength(5, nameInput), nameInput, nameLabel, "Name");
});
subject.addEventListener("change", () => {
  lengthValidation(
    15,
    checkLength(15, subject),
    subject,
    subjectLabel,
    "Subject"
  );
});
message.addEventListener("change", () => {
  lengthValidation(
    25,
    checkLength(25, message),
    message,
    messageLabel,
    "Message"
  );
});
