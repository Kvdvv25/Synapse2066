/**
 * @jest-environment jsdom
 */

describe("Terminal UI logic", () => {
  let button,
    popup,
    terminal,
    terminalMain,
    terminalWrapper,
    terminalForm,
    terminalInput,
    folder,
    terminalNumbers,
    memories,
    closeTerminal,
    closeMemories;

  beforeEach(() => {
    // Set up basic HTML structure
    document.body.innerHTML = `
      <button class="button"></button>
      <div class="popup"></div>
      <div class="terminal">
        <div class="terminal-main"></div>
        <div class="terminal-main__wrapper"></div>
        <form class="termnil-main-form">
          <input class="terminal-main-form__input" />
        </form>
        <ul class="terminal-main-numbers"></ul>
      </div>
      <div class="folder"></div>
      <div class="memories"></div>
      <button class="terminal-header__close"></button>
      <button class="memories-header__close"></button>
    `;

    // Select elements as in the script
    button = document.querySelector(".button");
    popup = document.querySelector(".popup");
    terminal = document.querySelector(".terminal");
    terminalMain = document.querySelector(".terminal-main");
    terminalWrapper = document.querySelector(".terminal-main__wrapper");
    terminalForm = document.querySelector(".termnil-main-form");
    terminalInput = document.querySelector(".terminal-main-form__input");
    folder = document.querySelector(".folder");
    terminalNumbers = document.querySelector(".terminal-main-numbers");
    memories = document.querySelector(".memories");
    closeTerminal = document.querySelector(".terminal-header__close");
    closeMemories = document.querySelector(".memories-header__close");

    // Load the main script
    require("../Javascript/leo-easter-egg");
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("toggles popup visibility when button is clicked", () => {
    expect(popup.classList.contains("show")).toBe(false);
    button.click();
    expect(popup.classList.contains("show")).toBe(true);
  });

  test("closes popup when closeTerminal is clicked", () => {
    button.click();
    expect(popup.classList.contains("show")).toBe(true);
    closeTerminal.click();
    expect(popup.classList.contains("show")).toBe(false);
  });

  test("shows success message and adds 6 numbers when correct USER_ID (CDPR77) is entered", () => {
    terminalInput.value = "CDPR77";
    terminalForm.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(folder.classList.contains("show-flex")).toBe(true);
    expect(terminalNumbers.children.length).toBe(6);
    expect(document.body.innerHTML).toContain("access granted");
  });

  test("shows error message and adds 3 numbers when wrong USER_ID is entered", () => {
    terminalInput.value = "wrong";
    terminalForm.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(folder.classList.contains("show-flex")).toBe(false);
    expect(terminalNumbers.children.length).toBe(3);
    expect(document.body.innerHTML).toContain("ERROR: USER_ID not found");
  });

  test("hides terminal and shows memories when folder is clicked", () => {
    folder.click();
    expect(terminal.style.display).toBe("none");
    expect(memories.classList.contains("show")).toBe(true);
  });

  test("shows terminal again and hides memories when closeMemories is clicked", () => {
    folder.click(); // open memories
    closeMemories.click();
    expect(terminal.style.display).toBe("block");
    expect(memories.classList.contains("show")).toBe(false);
  });
});
