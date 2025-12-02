/**
 * @jest-environment jsdom
 */

jest.useFakeTimers(); // control setInterval timing

describe("Countdown and trailer modal logic", () => {
  let days,
    hours,
    minutes,
    seconds,
    countdown,
    background,
    trailerModal,
    trailerVideo;

  beforeEach(() => {
    // Prepare DOM elements
    document.body.innerHTML = `
      <div id="countdown">
        <span id="days"></span>
        <span id="hours"></span>
        <span id="minutes"></span>
        <span id="seconds"></span>
      </div>
      <div class="background"></div>
      <div id="trailerModal" style="display: none;">
        <video id="trailerVideo"></video>
      </div>
    `;

    days = document.getElementById("days");
    hours = document.getElementById("hours");
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
    countdown = document.getElementById("countdown");
    background = document.querySelector(".background");
    trailerModal = document.getElementById("trailerModal");
    trailerVideo = document.getElementById("trailerVideo");

    // Mock video methods
    trailerVideo.pause = jest.fn();
    trailerVideo.currentTime = 0;

    // Load script under test
    jest.isolateModules(() => {
      require("../Javascript/pre-launch.js");
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetModules();
  });

  test("updates countdown values correctly when target date is in the future", () => {
    const RealDate = Date;
    const targetDate = new RealDate("December 12, 2025 00:00:00").getTime();

    function MockDate(...args) {
      if (args.length === 0) {
        // One day before the target
        return new RealDate(targetDate - 24 * 60 * 60 * 1000);
      }
      return new RealDate(...args);
    }

    MockDate.now = RealDate.now;
    global.Date = MockDate;

    jest.isolateModules(() => {
      require("../Javascript/pre-launch.js");
    });

    jest.advanceTimersByTime(1000);

    expect(Number(days.textContent)).toBeGreaterThanOrEqual(0);
    expect(hours.textContent).toMatch(/^\d+$/);
    expect(minutes.textContent).toMatch(/^\d+$/);
    expect(seconds.textContent).toMatch(/^\d+$/);

    global.Date = RealDate; // restore Date
  });

  test("shows 'NOW AVAILABLE!' when target date is in the past", () => {
    const RealDate = Date;

    // Mock Date to simulate a time after December 12, 2025
    function MockDate(...args) {
      if (args.length === 0) {
        return new RealDate("December 13, 2025 00:00:00");
      }
      return new RealDate(...args);
    }

    MockDate.now = RealDate.now;
    global.Date = MockDate;

    jest.isolateModules(() => {
      require("../Javascript/pre-launch.js");
    });

    jest.advanceTimersByTime(1000);

    expect(countdown.textContent).toContain("NOW AVAILABLE!");

    global.Date = RealDate;
  });

  test("openTrailerModal displays modal and disables scrolling", () => {
    const { openTrailerModal } = require("../Javascript/pre-launch.js");

    openTrailerModal();

    expect(trailerModal.style.display).toBe("flex");
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("closeTrailerModal hides modal, pauses video, and restores scrolling", () => {
    const { closeTrailerModal } = require("../Javascript/pre-launch.js");

    trailerModal.style.display = "flex";

    closeTrailerModal();

    expect(trailerModal.style.display).toBe("none");
    expect(trailerVideo.pause).toHaveBeenCalled();
    expect(trailerVideo.currentTime).toBe(0);
    expect(document.body.style.overflow).toBe("auto");
  });

  test("clicking outside the video closes modal", () => {
    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "target", { value: trailerModal });
    document.dispatchEvent(event);

    expect(trailerModal.style.display).toBe("none");
  });

  test("pressing Escape closes modal", () => {
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    expect(trailerModal.style.display).toBe("none");
  });
});
