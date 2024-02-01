// utils.js
import convert from "color-convert";

function generatePalette(hexColor, interval = 10) {
  const [h, s, l] = convert.hex.hsl(hexColor);
  const palette = [];

  for (let i = 0; i <= 100; i += interval) {
    palette.push([h, s, i]);
  }

  return palette;
}

document.querySelector("form").addEventListener("submit", function (event) {
event.preventDefault();
const input = document.querySelector("input").value;

  if (/^#[0-9A-F]{6}$/i.test(input)) {
    const palette = generatePalette(input);
    console.log(palette);
    displayColors(palette, input);
    updateBackground(palette);
  } else {
    console.error(`${input} is not a valid Hexadecimal color.`);
  }
});

import Color from "./modules/color.js";

function displayColors(palette, inputColor) {
  // Minimize the header
  document.querySelector("header").classList.add("minimized");

  // Clear existing colors in the main element
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";

  // Display new colors
  palette.forEach((colorHSL) => {
    const color = new Color(colorHSL);
    color.display(mainElement);
  });
  
  // Update the shadow color based on the input color
  const [h, s, l] = convert.hex.hsl(inputColor); // Convert hex to HSL
  const shadowColor = `${h}deg ${s}% ${l}%`;
  document.documentElement.style.setProperty('--shadow-color', shadowColor);
}

function updateBackground(palette) {
  console.log("background changed");
  const gradient = palette
    .map((color) => `hsl(${color[0]}deg, ${color[1]}%, ${color[2]}%)`)
    .join(", ");
  document.body.style.background = `linear-gradient(-45deg, ${gradient})`;
  document.body.style.backgroundSize = "400% 400%";
  console.log(gradient);

}

document.querySelector("main").addEventListener("click", function (event) {
  if (event.target.classList.contains("color")) {
    const color = event.target.dataset.color;
    navigator.clipboard.writeText(color).then(() => {
      console.log(`Copied ${color} to clipboard`);
    });
  }
});
