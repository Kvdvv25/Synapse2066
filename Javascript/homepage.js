const items = document.querySelectorAll(".item");
const count = items.length;
const circleMenu = document.getElementById("circleMenu");
radius = circleMenu.offsetWidth / 2.2;

let currentAngle = 0;
let isScrolling = false;

const content = [
  {
    title: "Corporation",
    text: "Learn more about Synapse`s Corporation",
    button: "Explore the Corporation →",
    link: "company.html",
  },
  {
    title: "Cast",
    text: "Explore the film`s characters, who they are and which actors bring them to life",
    button: "Explore the Characters →",
    link: "cast.html",
  },
  {
    title: "Production Team",
    text: "Explore the individual profile introducing the members of our filming team",
    button: "Discover the team →",
    link: "productionteam.html",
  },
  {
    title: "Gallery",
    text: "Explore the gallery with film poster and much more",
    button: "See Gallery →",
    link: "gallery.html",
  },
  {
    title: "Synopsis",
    text: "Learn more about Synapse`s storyline",
    button: "Learn about the film →",
    link: "synopsis.html",
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

let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].clientY;
});

window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

window.addEventListener("touchend", (e) => {
  if (isScrolling) return;

  touchEndY = e.changedTouches[0].clientY;
  const diff = touchEndY - touchStartY;
  if (Math.abs(diff) < 40) return;

  isScrolling = true;

  const direction = diff < 0 ? 1 : -1;

  rotateWheel(direction);
  mobileMenu(direction);

  setTimeout(() => {
    isScrolling = false;
  }, 500);
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

function isMobile() {
  return window.innerWidth <= 1024;
}

function mobileMenu(direction) {
  if (!isMobile()) return;

  const mobileMenuItemsList = document.querySelectorAll(".mobile-menu__item");

  const activeIndex = [...mobileMenuItemsList].findIndex((item) =>
    item.classList.contains("active")
  );

  mobileMenuItemsList.forEach((item) => item.classList.remove("active"));
  let newIndex = activeIndex + direction;

  if (newIndex > mobileMenuItemsList.length - 1) newIndex = 0;
  if (newIndex < 0) newIndex = mobileMenuItemsList.length - 1;

  const newActiveItem = mobileMenuItemsList[newIndex];
  newActiveItem.classList.add("active");

  const dataIndex = parseInt(newActiveItem.dataset.index, 10);

  updateMobileContent(dataIndex);
}

function updateMobileContent(index) {
  const title = document.querySelector(".title");
  const text = document.querySelector(".subtitle");
  const button = document.querySelector(".button");

  title.textContent = content[index - 1].title;
  text.textContent = content[index - 1].text;
  button.textContent = content[index - 1].button;
  button.href = content[index - 1].link;

  updateBackground(index);
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

// For Test
if (typeof window !== "undefined") {
  window.updatePositions = updatePositions;
  window.updateBackground = updateBackground;
  window.rotateWheel = rotateWheel;
  window.mobileMenu = mobileMenu;
}
if (typeof module !== "undefined") {
  module.exports = {
    updatePositions,
    updateBackground,
    rotateWheel,
    mobileMenu,
  };
}
