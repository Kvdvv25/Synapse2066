const menu = document.querySelector(".bottom-menu");
const menuItems = document.querySelectorAll(".bottom-menu__item");
const header = document.querySelector(".header");
const updates = document.querySelector(".updates");
const topMenu = document.querySelector(".top-menu");
const statusHide = document.querySelector(".updates-status__hide");
const statusShow = document.querySelector(".updates-status__show");
const arrow = document.querySelector(".top-menu__arrow");

let isTopMenuOpen = true;
topMenu.style.maxWidth = "60vw"; 

function openTopMenu() {
  topMenu.style.height = topMenu.scrollHeight + "px";
  topMenu.style.maxWidth = "none"; 
  statusHide.classList.add("active");
  statusShow.classList.remove("active");
  arrow.classList.add("rotate");
  isTopMenuOpen = true;
  updateHeaderHeight();
}

function closeTopMenu() {
  topMenu.style.height = "30vh";
  topMenu.style.maxWidth = "60vw"; 
  statusHide.classList.remove("active");
  statusShow.classList.add("active");
  arrow.classList.remove("rotate");
  isTopMenuOpen = false;
  resetHeaderHeight();
}

function toggleTopMenu() {
  if (isTopMenuOpen) {
    closeTopMenu();
  } else {
    openTopMenu();
  }
  closeBottomMenu();
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
    closeTopMenu();
    openBottomMenu();
  } else {
    closeBottomMenu();
  }
}

function updateHeaderHeight() {
  const menuHeight = menu.classList.contains("show") ? menu.offsetHeight : 0;
  const topMenuHeight = isTopMenuOpen ? topMenu.scrollHeight : 40;
  const baseHeight = 85;
  const totalHeight = baseHeight + menuHeight + topMenuHeight - 40;
  
  header.style.minHeight = `${totalHeight}px`;
}

function resetHeaderHeight() {
  header.style.minHeight = "";
}

updates.addEventListener("click", (e) => {
  e.stopPropagation();
  if (menu.classList.contains("show")) {
    closeBottomMenu();
    openTopMenu();
    return;
  }
  toggleTopMenu();
});

menu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleBottomMenu();
});

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBottomMenu();
  });
});

window.addEventListener("click", () => {
  closeBottomMenu();
  closeTopMenu();
});