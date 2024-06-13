import { screenController } from "./screenController";
import { app } from "./index.js";
export { DomHandler as default, domHandler };

class DomHandler {
  #addButton;
  #addProjectForm;
  constructor() {
    this.#addButton = document.querySelector("#add-button");
    this.#addProjectForm = document.querySelector("#add-project-form");
    this.#addButton.addEventListener("click", this.addItemEvent);
    document
      .querySelector("dialog form input[type= 'submit']")
      .addEventListener("click", this.addButtonEvent);
    document
      .querySelector("#add-project-button")
      .addEventListener("click", this.showAddProjectEvent);
    document
      .querySelector('dialog form input[type="submit"]:nth-child(3)')
      .addEventListener("click", () => {
        const name = this.#addProjectForm.children[1].value;
        this.addProjectFormButtonEvent(name);
      });
  }
  static setProjectTabEvent(element) {
    element.addEventListener("click", (e) => {
      screenController.setProjectScreen(e.target.textContent);
    });
  }
  addItemEvent() {
    screenController.showModal(1);
  }
  //extract data from dialog form and notify observers
  addButtonEvent() {
    const name = "New Item";
    const description = "";
    const date = "";
    const priority = "Low";
    const status = "Not Started";
    const project = "";
    app.createItem(name, description, date, priority, status, project);
  }
  showAddProjectEvent() {
    screenController.showModal(2);
  }
  addProjectFormButtonEvent(name) {
    app.createProject(name);
  }
}

const domHandler = new DomHandler();
