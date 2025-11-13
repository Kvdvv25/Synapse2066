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
