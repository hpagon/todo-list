import { screenController } from "./screenController";
import { app } from "./index.js";
export { DomHandler as default, domHandler };

class DomHandler {
  #addButton;
  #addTodoForm;
  #addProjectForm;
  constructor() {
    this.#addButton = document.querySelector("#add-button");
    this.#addTodoForm = document.querySelector("#add-todo-form");
    this.#addProjectForm = document.querySelector("#add-project-form");
    this.#addButton.addEventListener("click", this.addItemEvent);
    this.#addTodoForm.addEventListener("submit", this.addButtonEvent);
    document
      .querySelector("#add-project-button")
      .addEventListener("click", this.showAddProjectEvent);
    this.#addProjectForm.addEventListener("submit", () => {
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
    const name = document.querySelector("#add-todo-form").children[0].value;
    const description = document.querySelector("#add-todo-form").children[1].value;
    const date = document.querySelector("#add-todo-form").children[2].value;
    const priority = document.querySelector("#add-todo-form").children[4].value;
    const status = document.querySelector("#add-todo-form").children[6].value;
    const project = document.querySelector("#project-select").value;
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
