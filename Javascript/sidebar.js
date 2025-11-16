const menu = document.querySelector(".bottom-menu");
const menuItems = document.querySelectorAll(".bottom-menu__item");
const header = document.querySelector(".header");

function updateHeaderHeight() {
  const menuHeight = menu.offsetHeight;
  header.style.minHeight = `calc(${menuHeight}px + 50px)`;
}

function resetHeaderHeight() {
  header.style.minHeight = "";
}

menu.addEventListener("click", (e) => {
  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    updateHeaderHeight();
  } else {
    resetHeaderHeight();
  }
});

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");

    if (menu.classList.contains("show")) {
      updateHeaderHeight();
    } else {
      resetHeaderHeight();
    }
  });
});

window.addEventListener("click", (e) => {
  if (!menu.contains(e.target)) {
    menu.classList.remove("show");
    resetHeaderHeight();
  }
});

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Top Menu
    const topMenu = document.querySelector(".top-menu");
    const updates = document.querySelector(".updates");
    const statusHide = document.querySelector(".updates-status__hide");
    const statusShow = document.querySelector(".updates-status__show");
    const arrow = document.querySelector(".top-menu__arrow");

    updates.addEventListener("click", (e) => {
      topMenu.offsetHeight === 40
        ? (topMenu.style.height = topMenu.scrollHeight + "px")
        : (topMenu.style.height = "40px");

      statusHide.classList.toggle("active");
      statusShow.classList.toggle("active");
      arrow.classList.toggle("rotate");
    });
  });
}
init();
