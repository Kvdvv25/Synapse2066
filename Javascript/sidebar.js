const menu = document.querySelector(".bottom-menu");
const menuItems = document.querySelectorAll(".bottom-menu__item");
const header = document.querySelector(".header");

const updates = document.querySelector(".updates");
const topMenu = document.querySelector(".top-menu");
const statusHide = document.querySelector(".updates-status__hide");
const statusShow = document.querySelector(".updates-status__show");
const arrow = document.querySelector(".top-menu__arrow");

let isTopMenuOpen = false;

function openTopMenu() {
  topMenu.style.height = topMenu.scrollHeight + "px";
  topMenu.classList.add("top-menu__active");
  statusHide.classList.add("active");
  statusShow.classList.remove("active");
  arrow.classList.add("rotate");
  isTopMenuOpen = true;
}

function closeTopMenu() {
  topMenu.style.height = "40px";
  statusHide.classList.remove("active");
  statusShow.classList.add("active");
  arrow.classList.remove("rotate");
  isTopMenuOpen = false;
  topMenu.classList.remove("top-menu__active");
}

function toggleTopMenu() {
  if (isTopMenuOpen) {
    closeTopMenu();
  } else {
    openTopMenu();
  }
}

function openBottomMenu() {
  menu.classList.add("show");
  updateHeaderHeight();
}

function closeBottomMenu() {
  menu.classList.remove("show");
  resetHeaderHeight();
}

function toggleBottomMenu() {
  const isOpen = menu.classList.contains("show");

  if (!isOpen) {
    openBottomMenu();
  } else {
    closeBottomMenu();
  }
}

function updateHeaderHeight() {
  const menuHeight = menu.offsetHeight;
  const headerHeight = header.offsetHeight;
  const requiredHeight = menuHeight + 50;

  if (headerHeight >= requiredHeight) {
    header.style.minHeight = "";
    return;
  }

  header.style.setProperty("min-height", `${requiredHeight}px`, "important");
}

function resetHeaderHeight() {
  header.style.minHeight = "";
}

// Top menu toggle
updates.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleTopMenu();
});

// Bottom menu toggle
menu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleBottomMenu();
});

// Close bottom menu when clicking item
menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBottomMenu();
  });
});

// Click outside closes BOTH
window.addEventListener("click", () => {
  closeBottomMenu();
  closeTopMenu();
});
