//Anna's Gallery
const closePopup = document.querySelector(".popup-close");
const closePopupText = document.querySelector(".popup-close__text");
const closePopupImg = document.querySelector(".popup-close__img");
const popup = document.querySelector(".popup");
const button = document.querySelector(".gallery-btn");
const span = button.querySelector("span");
const icon = button.querySelector("i");

const togglePopup = () => {
  popup.classList.toggle("show");
};

window.addEventListener("click", (e) => {
  e.target === closePopup ||
  e.target === button ||
  e.target === popup ||
  e.target === closePopupText ||
  e.target === closePopupImg ||
  e.target === span ||
  e.target === icon
    ? togglePopup()
    : false;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popup.classList.remove("show");
  }
});
