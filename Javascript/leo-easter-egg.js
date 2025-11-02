// Variables
const button = document.querySelector(".button");
const popup = document.querySelector(".popup");
const terminal = document.querySelector(".terminal");
const terminalMain = document.querySelector(".terminal-main");
const terminalWrapper = document.querySelector(".terminal-main__wrapper");
const terminalForm = document.querySelector(".termnil-main-form");
const terminalInput = document.querySelector(".terminal-main-form__input");
const folder = document.querySelector(".folder");
const terminalNumbers = document.querySelector(".terminal-main-numbers");
const memories = document.querySelector(".memories");

// Open Terminal
button.addEventListener("click", () => {
  popup.classList.toggle("show");
  terminalInput.focus();
});

// Close Terminal
const closeTerminal = document.querySelector(".terminal-header__close");
closeTerminal.addEventListener("click", () => popup.classList.toggle("show"));

terminalMain.addEventListener("click", () => terminalInput.focus());

// Main Terminal Function
const success = `
<br />
<p class="terminal-main__text">
    [+] <span class="blue">USER ID verified - access granted.</span>
</p>
<p class="terminal-main__text">
    [+] Memory "user_124243.archive" located.
</p>
<p class="terminal-main__text">[+] Starting data transfer...</p>
<br />
<p class="terminal-main__text">
    [+]
    <span class="blue">Download complete: implant_CDPR77.enc</span>
</p>
`;

const error = `
<p class="terminal-main__text">
    [-] <span class="red">ERROR: USER_ID not found</span>
</p>
<p class="terminal-main__text">
    [-] <span class="red">PLEASE TRY AGAIN.</span>
</p>
<br />
`;

terminalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (terminalInput.value.trim().toUpperCase() == "CDPR77") {
    folder.classList.add("show-flex");
    terminalWrapper.insertAdjacentHTML("afterend", success);
    for (let i = 0; i < 6; i++) {
      terminalNumbers.insertAdjacentHTML(
        "beforeend",
        `<li class="terminal-main-numbers__item">${
          terminalNumbers.children.length + 1
        }</li>`
      );
    }
  } else {
    const prevElement = terminalWrapper.previousElementSibling;
    prevElement.insertAdjacentHTML("beforebegin", error);
    for (let i = 0; i < 3; i++) {
      terminalNumbers.insertAdjacentHTML(
        "beforeend",
        `<li class="terminal-main-numbers__item">${
          terminalNumbers.children.length + 1
        }</li>`
      );
    }
  }
  terminalMain.scrollTop = terminalMain.scrollHeight;
  terminalInput.value = "";
});

// Open Memories Popup
folder.addEventListener("click", () => {
  terminal.style.display = "none";
  memories.classList.add("show");
});

// Close Memories Popup
const closeMemories = document.querySelector(".memories-header__close");
closeMemories.addEventListener("click", () => {
  terminal.style.display = "block";
  memories.classList.remove("show");
});

// Change active Memory Image
if (window.innerWidth > 768) {
  const activeMemoryImage = document.querySelector(".memories-main__active");
  const allMemoryImages = document.querySelectorAll(".memories-main-list__img");

  allMemoryImages.forEach((img) => {
    img.addEventListener("click", () => {
      [activeMemoryImage.src, img.src] = [img.src, activeMemoryImage.src];
    });
  });
}
