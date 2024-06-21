import { screenController } from "./screenController";
import { app } from "./index.js";
import { domGenerator } from "./domGenerator.js";
export { DomHandler as default, domHandler };

class DomHandler {
  #addButton;
  #addTodoForm;
  #addProjectForm;
  #currentTodoInView;
  #currentProjectInView;
  #currentTodoDivInView;
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
    //edit form save event
    document.querySelector("#edit-todo-form").addEventListener("submit", () => {
      this.editFormSubmitEvent();
    });
    //delete todo button in edit form
    document
      .querySelector("#edit-todo-form #delete-todo-button")
      .addEventListener("click", () => {
        this.deleteFromEditFormEvent();
      });
    //delete project button in edit form
    document
      .querySelector("#edit-project-form #delete-project-button")
      .addEventListener("click", () => {
        this.deleteProjectEvent();
      });
    //submit event for project edit form
    document
      .querySelector("#edit-project-form")
      .addEventListener("submit", () => {
        this.editProjectSubmitEvent();
      });
  }
  static setProjectTabEvent(element) {
    element.addEventListener("click", () => {
      screenController.setProjectScreen(element.textContent);
      domGenerator.updateSelectedProject(element);
    });
  }
  addItemEvent() {
    screenController.showModal(1);
  }
  //extract data from dialog form and notify observers
  addButtonEvent() {
    const name = document.querySelector("#add-todo-form").children[0].value;
    const description =
      document.querySelector("#add-todo-form").children[1].value;
    const date =
      document.querySelector("#add-todo-form").children[2].children[1].value;
    const priority =
      document.querySelector("#add-todo-form").children[3].children[1].value;
    const status =
      document.querySelector("#add-todo-form").children[4].children[1].value;
    const project = document.querySelector("#project-select").value;
    app.createItem(name, description, date, priority, status, project);
  }
  showAddProjectEvent() {
    screenController.showModal(2);
  }
  addProjectFormButtonEvent(name) {
    app.createProject(name);
  }
  static setCompleteButtonEvent(button, todo) {
    button.addEventListener("click", () => {
      domGenerator.completeButtonClickEvent(button, todo);
    });
  }
  setTodoClickEvent(todoDiv, todo) {
    todoDiv.addEventListener("click", (e) => {
      //only trigger event for todo div, not children
      if (e.target !== todoDiv) return;
      domGenerator.fillInTodoDetails(todo);
      screenController.showModal(3);
      this.#currentTodoInView = todo;
      this.#currentTodoDivInView = todoDiv;
    });
  }
  editFormSubmitEvent() {
    const newTitle =
      document.querySelector("#edit-todo-form").children[0].value;
    const newDescription =
      document.querySelector("#edit-todo-form").children[1].value;
    const newDate =
      document.querySelector("#edit-todo-form").children[2].children[1].value;
    const newPriority =
      document.querySelector("#edit-todo-form").children[3].children[1].value;
    const newStatus =
      document.querySelector("#edit-todo-form").children[4].children[1].value;
    const newProject =
      document.querySelector("#edit-todo-form").children[5].children[1].value;
    app.editItem(
      this.#currentTodoInView,
      newTitle,
      newDescription,
      newDate,
      newPriority,
      newStatus,
      newProject
    );
  }
  setDeleteTodoEvent(closeElement, todo) {
    closeElement.addEventListener("click", () => {
      app.deleteItem(todo);
    });
  }
  setTodoDivHoverEvent(todoDiv, closeIcon) {
    todoDiv.addEventListener("mouseover", () => {
      domGenerator.todoHoverEnterEvent(todoDiv, closeIcon);
    });
    todoDiv.addEventListener("mouseleave", () => {
      domGenerator.todoHoverLeaveEvent(todoDiv, closeIcon);
    });
  }
  deleteFromEditFormEvent() {
    app.deleteItem(this.#currentTodoInView);
    screenController.closeModal(3);
  }
  setShowProjectEditFormEvent(editIcon, project) {
    editIcon.addEventListener("click", () => {
      domGenerator.fillInProjectDetails(project);
      screenController.showModal(4);
      this.#currentProjectInView = project;
    });
  }
  deleteProjectEvent() {
    app.deleteProject(screenController.getCurrentProject());
    screenController.closeModal(4);
  }
  editProjectSubmitEvent() {
    const newTitle =
      document.querySelector("#edit-project-form").children[1].value;
    const newColorOne =
      document.querySelector("#edit-project-form").children[2].children[1]
        .value;
    const newColorTwo =
      document.querySelector("#edit-project-form").children[3].children[1]
        .value;
    app.editProject(
      this.#currentProjectInView,
      newTitle,
      newColorOne,
      newColorTwo
    );
  }
}

const domHandler = new DomHandler();
