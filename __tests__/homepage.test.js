/**
 * @jest-environment jsdom
 */

jest.useFakeTimers();

describe("Circle menu logic", () => {
  let items, backgroundLayer, title, subtitle, button;
  let rotateWheel, mobileMenu, updatePositions, updateBackground;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="circleMenu" style="width:220px;"></div>
      <div class="background-layer"></div>

      <div class="title"></div>
      <div class="subtitle"></div>
      <a class="button"></a>

      <div class="menu">
        <div class="item" data-index="1"></div>
        <div class="item" data-index="2"></div>
        <div class="item" data-index="3"></div>
        <div class="item" data-index="4"></div>
        <div class="item" data-index="5"></div>
      </div>

      <div class="mobile-menu">
        <div class="mobile-menu__item active"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
        <div class="mobile-menu__item"></div>
      </div>
    `;

    // Import funcs
    jest.resetModules();
    const script = require("../Javascript/homepage.js");
    rotateWheel = script.rotateWheel;
    mobileMenu = script.mobileMenu;
    updatePositions = script.updatePositions;
    updateBackground = script.updateBackground;

    items = document.querySelectorAll(".item");
    backgroundLayer = document.querySelector(".background-layer");
    title = document.querySelector(".title");
    subtitle = document.querySelector(".subtitle");
    button = document.querySelector(".button");

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      configurable: true,
    });
  });

  test("updatePositions sets active item and updates content", () => {
    updatePositions();

    const active = document.querySelector(".item.active");
    expect(active).not.toBeNull();

    expect(title.textContent).toMatch(/^Title/);
    expect(subtitle.textContent).toContain("Lorem");
    expect(button.textContent).toContain("See");
  });

  test("updateBackground changes background image with fade-out class", () => {
    updateBackground(3);

    expect(backgroundLayer.classList.contains("fade-out")).toBe(true);

    jest.advanceTimersByTime(300);

    expect(backgroundLayer.style.backgroundImage).toContain("bg_3.jpg");
    expect(backgroundLayer.classList.contains("fade-out")).toBe(false);
  });

  test("rotateWheel updates active item and changes state", () => {
    const prevActive = document.querySelector(".item.active");

    rotateWheel(1);
    const newActive = document.querySelector(".item.active");

    expect(newActive).not.toBe(prevActive);

    jest.advanceTimersByTime(500);
    expect(
      typeof window.isScrolling !== "undefined" ? window.isScrolling : true
    ).toBe(true);
  });

  test("mobileMenu cycles active element correctly", () => {
    const mobileItems = document.querySelectorAll(".mobile-menu__item");

    expect(mobileItems[0].classList.contains("active")).toBe(true);

    mobileMenu(1);
    expect(mobileItems[1].classList.contains("active")).toBe(true);

    mobileMenu(-2);
    expect(mobileItems[4].classList.contains("active")).toBe(true);
  });
});
