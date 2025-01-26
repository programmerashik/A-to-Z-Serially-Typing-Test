document.getElementById("startBtn").addEventListener("click", startTest);

const correctSequence = "abcdefghijklmnopqrstuvwxyz";
let startTime = null;

function startTest() {
  // Show the typing area
  document.getElementById("testArea").classList.remove("hidden");
  document.getElementById("userInput").value = "";
  document.getElementById("result").textContent = "";

  // Focus on the input field and record start time
  const inputField = document.getElementById("userInput");
  inputField.focus();
  startTime = Date.now();

  // Listen for input change
  inputField.addEventListener("input", checkInput);
}

function checkInput(event) {
  const userInput = event.target.value;

  // Check if the user input matches the correct sequence so far
  if (correctSequence.startsWith(userInput)) {
    // If the user has completed typing
    if (userInput === correctSequence) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; // In seconds
      const typingSpeed = correctSequence.length / timeTaken; // Characters per second
      const wordsPerMinute = (correctSequence.length / 5) / (timeTaken / 60); // Words per minute

      document.getElementById("result").innerHTML = `
        ✅ Correct!<br>
        ⏱ Time taken: ${timeTaken.toFixed(2)} seconds<br>
        ⚡ Typing speed: ${typingSpeed.toFixed(2)} characters per second, ${wordsPerMinute.toFixed(2)} words per minute
      `;

      // Remove input listener after completion
      event.target.removeEventListener("input", checkInput);
    }
  } else {
    // If the input does not match, restart the test
    document.getElementById("result").textContent = "❌ Incorrect! Restarting...";
    resetTest();
  }
}

function resetTest() {
  const inputField = document.getElementById("userInput");
  inputField.value = ""; // Clear the input
  inputField.removeEventListener("input", checkInput); // Remove the old listener
  setTimeout(() => {
    document.getElementById("result").textContent = ""; // Clear the result message
    inputField.focus(); // Refocus on the input field
    startTest(); // Restart the test
  }, 1000); // Add a slight delay before restarting
}
