import { screenController } from "./screenController";
export { DomHandler as default, domHandler };

class DomHandler {
  #addButton;
  constructor() {
    this.#addButton = document.querySelector("#add-button");
    this.#addButton.addEventListener("click", this.addItem);
  }
  static setProjectTabEvent(element) {
    element.addEventListener("click", (e) => {
      screenController.setProjectScreen(e.target.textContent);
    });
  }
}

const domHandler = new DomHandler();
