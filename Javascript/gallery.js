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

    // Gallery
    const gallery = document.querySelector(".gallery");
    const galleryImages = document.querySelectorAll(".gallery__img");

    if (window.innerWidth > 575) {
      galleryImages.forEach((item) => {
        item.addEventListener("click", (e) => {
          if (e.target !== galleryImages[0]) {
            [e.target.src, galleryImages[0].src] = [
              galleryImages[0].src,
              e.target.src,
            ];
          }
        });
      });
    }
  });
}
init();

// For Tests
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { init };
}
