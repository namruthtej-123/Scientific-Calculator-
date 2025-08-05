const inputField = document.querySelector(".js-input");
const resultField = document.querySelector(".result");

let lastAnswer = 0;
let isDegree = true; // Deg/Rad toggle
let invMode = false; // INV toggle

// Convert degrees to radians
function degToRad(deg) {
  return deg * Math.PI / 180;
}

// Factorial function
function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Handle button clicks
document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    handleButton(button.innerHTML);
  });
});

function handleButton(value) {
  switch (value) {
    case "=":
      calculateExpression();
      break;
    case "AC":
      inputField.value = "";
      resultField.value = "";
      break;
    case "Ans":
      inputField.value += lastAnswer;
      break;
    case "÷":
      inputField.value += "/";
      break;
    case "×":
      inputField.value += "*";
      break;
    case "π":
      inputField.value += Math.PI;
      break;
    case "e":
      inputField.value += Math.E;
      break;
    case "Rad":
      isDegree = false;
      alert("Switched to Radians mode");
      break;
    case "Deg":
      isDegree = true;
      alert("Switched to Degrees mode");
      break;
    case "X!":
      inputField.value += "!";
      break;
    case "INV":
      invMode = !invMode;
      alert("Inverse mode: " + (invMode ? "ON" : "OFF"));
      break;
    case "EXP":
      inputField.value += "E"; // JS can parse 2E3 = 2000
      break;
    case "sin":
    case "cos":
    case "tan":
    case "log":
    case "ln":
    case "√":
      inputField.value += value + "(";
      break;
    case "x<sup>y</sup>": // Power button
      inputField.value += "**";
      break;
    default:
      inputField.value += value;
  }
}

// Main calculation function
function calculateExpression() {
  let expr = inputField.value;

  // Factorial
  expr = expr.replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)));

  // Replace functions with Math functions
  expr = expr.replace(/sin\(/g, invMode ? "aSin(" : "Sin(")
             .replace(/cos\(/g, invMode ? "aCos(" : "Cos(")
             .replace(/tan\(/g, invMode ? "aTan(" : "Tan(")
             .replace(/log\(/g, invMode ? "Math.pow(10," : "Math.log10(")
             .replace(/ln\(/g, invMode ? "Math.exp(" : "Math.log(")
             .replace(/√/g, "Math.sqrt");

  // Custom wrappers for degree/radian
  function Sin(x) { return Math.sin(isDegree ? degToRad(x) : x); }
  function Cos(x) { return Math.cos(isDegree ? degToRad(x) : x); }
  function Tan(x) { return Math.tan(isDegree ? degToRad(x) : x); }
  function aSin(x) { 
    let val = Math.asin(x);
    return isDegree ? val * 180 / Math.PI : val;
  }
  function aCos(x) { 
    let val = Math.acos(x);
    return isDegree ? val * 180 / Math.PI : val;
  }
  function aTan(x) { 
    let val = Math.atan(x);
    return isDegree ? val * 180 / Math.PI : val;
  }

  try {
    const res = eval(expr);
    resultField.value = res;
    lastAnswer = res;
  } catch (e) {
    resultField.value = "Error";
  }
}
let infoVissible=false
function infoButton() {

  const btn = document.querySelector('.js-info-button');
  if (!infoVissible) {
    btn.innerHTML = `
    AC => clears everything<br>  
    e => constant value<br>
    INV => inverse trigonometrics<br>
    EXP 3 → 2 × 10³ → 2000`;
    infoVissible = true;
  }
  else {
    btn.innerHTML = 'Info'
    infoVissible=false
  }
}
setInterval(infoButton())