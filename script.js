document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("expression");
  const liveResult = document.getElementById("live-result");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let isFinalResult = false;

  function calculateLive() {
    if (isFinalResult) {
      liveResult.textContent = "";
      return;
    }
    try {
      let expression = currentInput
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100");
      liveResult.textContent = eval(expression) || "";
    } catch {
      liveResult.textContent = "";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "AC") {
        currentInput = "";
        liveResult.textContent = "";
        isFinalResult = false;
      } else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        isFinalResult = false;
      } else if (value === "=") {
        try {
          let result = eval(
            currentInput
              .replace(/×/g, "*")
              .replace(/÷/g, "/")
              .replace(/%/g, "/100")
          );
          currentInput = result.toString();
          isFinalResult = true;
        } catch {
          currentInput = "Error";
          isFinalResult = true;
        }
      } else {
        if (
          "+-×÷%".includes(value) &&
          "+-×÷%".includes(currentInput.slice(-1))
        ) {
          return;
        }
        if (isFinalResult) {
          currentInput = "";
          isFinalResult = false;
        }
        currentInput += value;
      }

      inputField.value = currentInput;
      calculateLive();
    });
  });
});
