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
  } else {
    console.error(`${input} is not a valid Hexadecimal color.`);
  }
});

import Color from "./modules/color.js";

function displayColors(palette) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = ""; // Clear existing colors

  palette.forEach((colorHSL) => {
    const color = new Color(colorHSL);
    color.display(mainElement);
  });
}

function updateBackground(palette) {
  const gradient = palette
    .map((color) => `#${convert.hsl.hex(color)}`)
    .join(", ");
  document.body.style.background = `linear-gradient(${gradient})`;
  document.body.style.backgroundSize = "400% 400%";
}

document.querySelector("main").addEventListener("click", function (event) {
  if (event.target.classList.contains("color")) {
    const color = event.target.dataset.color;
    navigator.clipboard.writeText(color).then(() => {
      console.log(`Copied ${color} to clipboard`);
    });
  }
});

