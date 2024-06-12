import { screenController } from "./screenController";
import { app } from "./index.js";
export { DomHandler as default, domHandler };

class DomHandler {
  #addButton;
  constructor() {
    this.#addButton = document.querySelector("#add-button");
    this.#addButton.addEventListener("click", this.addItemEvent);
    document
      .querySelector("dialog form input[type= 'submit']")
      .addEventListener("click", this.addButtonEvent);
  }
  static setProjectTabEvent(element) {
    element.addEventListener("click", (e) => {
      screenController.setProjectScreen(e.target.textContent);
    });
  }
  addItemEvent() {
    document.querySelector("dialog").showModal();
  }
  addButtonEvent() {
    app.createItem();
  }
}

const domHandler = new DomHandler();
