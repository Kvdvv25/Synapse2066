// Your existing updateCountdown function remains the same
function updateCountdown() {
  const targetDate = new Date("December 12, 2025 00:00:00");

  function update() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
    } else {
      document.getElementById("countdown").textContent = "NOW AVAILABLE!";
    }
  }

  update();
  setInterval(update, 1000);
}

updateCountdown();

// Trailer Modal Functions
function openTrailerModal() {
  document.getElementById("trailerModal").style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeTrailerModal() {
  const modal = document.getElementById("trailerModal");
  const video = document.getElementById("trailerVideo");

  modal.style.display = "none";
  video.pause(); // Pause video when closing
  video.currentTime = 0; // Reset to beginning
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside the video
document.addEventListener("click", (e) => {
  const modal = document.getElementById("trailerModal");
  if (e.target === modal) {
    closeTrailerModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeTrailerModal();
  }
});

// For Test
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { openTrailerModal, closeTrailerModal };
}
