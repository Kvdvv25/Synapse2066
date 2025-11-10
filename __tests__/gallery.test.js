/**
 * @jest-environment jsdom
 */

describe("Script UI logic", () => {
  let init;

  beforeEach(() => {
    jest.resetModules(); // Cleaning Cash
    init = require("../Javascript/gallery").init;

    document.body.innerHTML = `
      <div class="top-menu" style="height:40px;"></div>
      <div class="updates"></div>
      <div class="updates-status__hide"></div>
      <div class="updates-status__show active"></div>
      <div class="top-menu__arrow"></div>

      <div class="gallery">
        <img class="gallery__img" src="1.jpg">
        <img class="gallery__img" src="2.jpg">
        <img class="gallery__img" src="3.jpg">
      </div>
    `;
  });

  test("menu toggles on click", () => {
    const topMenu = document.querySelector(".top-menu");

    const offsetHeightMock = jest
      .spyOn(topMenu, "offsetHeight", "get")
      .mockReturnValue(40);
    jest.spyOn(topMenu, "scrollHeight", "get").mockReturnValue(100);

    init();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    const updates = document.querySelector(".updates");
    const arrow = document.querySelector(".top-menu__arrow");
    const hide = document.querySelector(".updates-status__hide");
    const show = document.querySelector(".updates-status__show");

    updates.click();

    expect(topMenu.style.height).toBe("100px");
    expect(hide.classList.contains("active")).toBe(false);
    expect(show.classList.contains("active")).toBe(true);
    expect(arrow.classList.contains("rotate")).toBe(false);

    offsetHeightMock.mockReturnValue(100);
    updates.click();

    expect(topMenu.style.height).toBe("40px");
  });

  test("gallery swaps images on click (width > 575)", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 800,
      configurable: true,
    });

    init();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    const images = document.querySelectorAll(".gallery__img");

    const src1 = images[0].src;
    const src2 = images[1].src;

    images[1].click();

    // Test for swapping images
    expect(images[1].src).toBe(src2);
    expect(images[0].src).toBe(src1);
  });

  test("gallery does nothing if window width <= 575", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      configurable: true,
    });

    init();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    const images = document.querySelectorAll(".gallery__img");

    const src1 = images[0].src;
    const src2 = images[1].src;

    images[1].click();

    expect(images[0].src).toBe(src1);
    expect(images[1].src).toBe(src2);
  });
});
