const items = document.querySelectorAll(".item");
const count = items.length;
const circleMenu = document.getElementById("circleMenu");
radius = circleMenu.offsetWidth / 2.2;

let currentAngle = 0;
let currentIndex = 0;
let isScrolling = false;

const content = [
  {
    title: "Title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, incidunt.",
    button: "See Title 1 →",
    link: "#1",
  },
  {
    title: "Title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, incidunt.",
    button: "See Title 2 →",
    link: "#2",
  },
  {
    title: "Title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, incidunt.",
    button: "See Title 3 →",
    link: "#3",
  },
  {
    title: "Gallery",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, incidunt.",
    button: "See Gallery →",
    link: "gallery.html",
  },
  {
    title: "Title 5",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, incidunt.",
    button: "See Title 5 →",
    link: "#5",
  },
];

function updatePositions() {
  const verticalOffset = window.innerHeight * -0.03;

  items.forEach((el, i) => {
    const angle = i * (360 / count) + currentAngle;
    el.style.transform = `
      rotate(${angle}deg)
      translate(${radius}px)
      rotate(${-angle}deg)
      translateY(${verticalOffset * Math.sin((angle * Math.PI) / 180)}px)
    `;
  });

  // Active Element
  const normalizedAngle = ((currentAngle % 360) + 360) % 360;
  const activeIndex =
    Math.round(count - normalizedAngle / (360 / count)) % count;

  items.forEach((el) => el.classList.remove("active"));
  const activeEl = items[activeIndex];
  activeEl.classList.add("active");

  const index = activeEl.dataset.index;
  const title = document.querySelector(".title");
  const text = document.querySelector(".subtitle");
  const button = document.querySelector(".button");

  title.textContent = content[index - 1].title;
  text.textContent = content[index - 1].text;
  button.textContent = content[index - 1].button;
  button.href = content[index - 1].link;

  updateBackground(index);
}

// Changing background
const backgroundLayer = document.querySelector(".background-layer");

function updateBackground(index) {
  backgroundLayer.classList.add("fade-out");
  setTimeout(() => {
    backgroundLayer.style.backgroundImage = `url("images/bg_${index}.jpg")`;
    backgroundLayer.classList.remove("fade-out");
  }, 300);
}

// Rotating wheel by touchpad and mouse wheel
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (isScrolling) return;

    if (Math.abs(e.deltaY) < 30) return;

    isScrolling = true;
    rotateWheel(e.deltaY > 0 ? 1 : -1);
    mobileMenu(e.deltaY > 0 ? 1 : -1);
  },
  { passive: false }
);

// Rotating wheel by arrows
window.addEventListener("keydown", (e) => {
  if (isScrolling) return;

  if (["ArrowRight", "ArrowDown", "d", "s"].includes(e.key)) {
    isScrolling = true;
    rotateWheel(1);
    mobileMenu(1);
  } else if (["ArrowLeft", "ArrowUp", "a", "w"].includes(e.key)) {
    isScrolling = true;
    rotateWheel(-1);
    mobileMenu(-1);
  } else if (e.key === "Enter") {
    e.preventDefault();

    window.location.href = document
      .querySelector(".button")
      .getAttribute("href");
  }
});

// Main Rotaiting Wheel Function
function rotateWheel(direction) {
  const step = 360 / count;
  currentAngle += step * direction;
  updatePositions();

  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

function mobileMenu(direction) {
  const mobileMenuItemsList = document.querySelectorAll(".mobile-menu__item");

  mobileMenuItemsList.forEach((item, index) => {
    item.classList.contains("active") ? (currentIndex = index) : currentIndex;
    item.classList.remove("active");
  });

  currentIndex += direction;
  if (currentIndex > 4) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = 4;
  }
  mobileMenuItemsList[currentIndex].classList.add("active");
}

// Resizing
window.addEventListener("resize", () => {
  const circleMenu = document.getElementById("circleMenu");
  radius = circleMenu.offsetWidth / 2.2;
  document.documentElement.style.setProperty("--radius", `${radius}px`);
  updatePositions();
});

// Init
document.documentElement.style.setProperty("--radius", `${radius}px`);
updatePositions();
