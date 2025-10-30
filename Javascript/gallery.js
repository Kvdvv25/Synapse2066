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

  // Gallery
  const gallery = document.querySelector(".gallery");
  const galleryImages = document.querySelectorAll(".gallery__img");

  if (window.innerWidth > 575) {
    galleryImages.forEach((item) => {
      item.addEventListener("click", () => {
        if (gallery.firstElementChild === item) {
          return;
        }

        item.classList.add("fade-out");

        item.addEventListener(
          "animationend",
          () => {
            gallery.prepend(item);
            item.classList.remove("fade-out");
            item.classList.add("fade-in");
            setTimeout(() => item.classList.remove("fade-in"), 500);
          },
          { once: true }
        );
      });
    });
  }
});
