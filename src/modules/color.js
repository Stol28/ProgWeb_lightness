import convert from 'color-convert';

class Color {
  #hsl;
  #hex;
  #element;

  constructor(hsl) {
    this.#hsl = hsl;
    this.#hex = `#${convert.hsl.hex(hsl)}`;
    this.#generateElement();
  }

  #generateElement() {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.dataset.color = this.#hex;
    colorDiv.style.backgroundColor = this.#hex;
    const textColor = this.#hsl[2] < 60 ? '#ffffff' : '#000000';
    const textP = document.createElement('p');
    textP.style.color = textColor;
    textP.textContent = this.#hex;

    colorDiv.appendChild(textP);
    this.#element = colorDiv;
  }

  display(parentElement) {
    parentElement.appendChild(this.#element);
  }
}

export default Color;