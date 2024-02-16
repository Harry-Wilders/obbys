document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("progressCanvas");
  const context = canvas.getContext("2d");
  const contentDiv = document.getElementById("content");

  const progressBar = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    lineWidth: 5,
    progress: 0,
    maxProgress: 100,
  };

  function drawProgress() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(
      progressBar.x,
      progressBar.y,
      progressBar.radius,
      -0.5 * Math.PI,
      (2 * Math.PI * progressBar.progress) / progressBar.maxProgress -
        0.5 * Math.PI
    );
    context.lineWidth = progressBar.lineWidth;
    context.strokeStyle = "#3498db"; // Change the color as needed
    context.stroke();

    // Percentage indicator
    context.font = "14px Arial";
    context.fillStyle = "#3498db";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${progressBar.progress}%`, progressBar.x, progressBar.y);
  }

  function updateProgress() {
    if (progressBar.progress < progressBar.maxProgress) {
      progressBar.progress++;
      drawProgress();
      requestAnimationFrame(updateProgress);
    } else {
      // Hide progress bar and show content
      canvas.style.display = "none";
      contentDiv.style.display = "block";
      document.body.classList.add("content-shown");

      // Set a flag in local storage to indicate that the progress bar has been shown
      localStorage.setItem("progressBarShown", "true");
    }
  }

  // Check if content is already loaded and the progress bar has not been shown
  if (
    document.readyState === "complete" &&
    localStorage.getItem("progressBarShown") !== "true"
  ) {
    updateProgress();
  } else {
    // If progress bar has been shown, hide it and show the content directly
    canvas.style.display = "none";
    contentDiv.style.display = "block";
    document.body.classList.add("content-shown");
  }
});
