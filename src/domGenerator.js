import { screenController } from "./screenController";
import DomHandler, { domHandler } from "./domHandler";
export { DomGenerator as default, domGenerator };

class DomGenerator {
  #projectList;
  #content = document.querySelector("#content");
  #project = document.querySelector("#project-container");
  #projectContentList;

  constructor() {
    this.#projectList = document.querySelector("#projects");
    this.#projectContentList = [];
  }
  //creates dom elements for projects
  createProject(project) {
    //create elements
    const sidebarLabel = document.createElement("li");
    const projectContainer = document.createElement("div");
    const banner = document.createElement("div");
    const bannerHeader = document.createElement("h2");
    const itemsContainer = document.createElement("div");
    const listViewTableHeader = document.createElement("div");
    const tableHeaderLeftDiv = document.createElement("div");
    const tableHeaderRightDiv = document.createElement("div");
    const nameHeader = document.createElement("p");
    const dateHeader = document.createElement("p");
    const priorityHeader = document.createElement("p");
    const statusHeader = document.createElement("p");
    const itemListContainer = document.createElement("div");
    //add classes/ids
    projectContainer.id = "project-container";
    listViewTableHeader.id = "list-header";
    itemsContainer.id = "items-container";
    banner.id = "banner";
    itemListContainer.id = "item-list";
    //add content
    sidebarLabel.textContent = project.getTitle();
    bannerHeader.textContent = project.getTitle();
    nameHeader.textContent = "Name";
    dateHeader.textContent = "Date";
    priorityHeader.textContent = "Priority";
    statusHeader.textContent = "Status";
    //add styles
    banner.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )})`;
    //add event listeners
    DomHandler.setProjectTabEvent(sidebarLabel);
    //add to dom
    if (project.getTitle() === "All" || project.getTitle() === "Today") {
      document.querySelector("#default-project-list").appendChild(sidebarLabel);
    } else {
      this.#projectList.appendChild(sidebarLabel);
    }
    banner.append(bannerHeader);
    tableHeaderLeftDiv.append(nameHeader);
    tableHeaderRightDiv.append(dateHeader, priorityHeader, statusHeader);
    listViewTableHeader.append(tableHeaderLeftDiv, tableHeaderRightDiv);
    itemsContainer.append(listViewTableHeader, itemListContainer);
    projectContainer.append(banner, itemsContainer);
    //add content to local div storage array
    this.#projectContentList.push([projectContainer, sidebarLabel]);
    //create project tag in dialog
    this.createProjectDialogOption(project.getTitle());
    //add project to project screen list in screen controller
    screenController.addProjectScreen(projectContainer, project.getTitle());
    console.log(this.#projectContentList);
  }
  createProjectDialogOption(title) {
    if (title === "All" || title === "Today") return;
    const addFormProjectOption = document.createElement("option");
    const editFormProjectOption = document.createElement("option");
    addFormProjectOption.setAttribute("value", title);
    editFormProjectOption.setAttribute("value", title);
    addFormProjectOption.textContent = title;
    editFormProjectOption.textContent = title;
    document
      .querySelector("#add-todo-form #project-select")
      .appendChild(addFormProjectOption);
    document
      .querySelector("#edit-todo-form #project-select")
      .appendChild(editFormProjectOption);
    this.#projectContentList[this.#projectContentList.length - 1].push(
      addFormProjectOption
    );
  }
  createItem(todo, project) {
    const length = this.#projectContentList.length;
    for (let i = 0; i < length; i++) {
      if (this.#projectContentList[i][1].textContent === project) {
        //create elements
        const todoDiv = document.createElement("div");
        const completeButton = document.createElement("button");
        const todoName = document.createElement("p");
        const date = document.createElement("p");
        const priority = document.createElement("div");
        const status = document.createElement("div");
        const tagContainer = document.createElement("div");
        const leftContainer = document.createElement("div");
        //add content
        todoName.textContent = todo.getTitle();
        date.textContent = todo.getDate();
        priority.textContent = todo.getPriority();
        status.textContent = todo.getStatus();
        //add class
        this.setPriorityClass(priority);
        //insert elements in place
        leftContainer.append(completeButton, todoName);
        tagContainer.append(date, priority, status);
        todoDiv.append(leftContainer, tagContainer);
        //add to correct project container
        this.#projectContentList[i][0].children[1].children[1].appendChild(
          todoDiv
        );
        //trigger events for intialization
        this.setStatusStyles(todoDiv);
        //create detailed item view modal
        this.createItemDetailedView(todo);
        //add events
        DomHandler.setCompleteButtonEvent(completeButton, todo);
        DomHandler.setTodoClickEvent(todoDiv, todo);
      }
    }
  }
  //fills in info from todo that was clicked
  fillInTodoDetails(todo) {
    const form = document.querySelector("#edit-todo-form");

    form.children[0].value = todo.getTitle();
    form.children[1].value = todo.getDescription();
    if (todo.getDate() !== "") {
      form.children[3].value = todo.getDate();
    }
    switch (todo.getPriority()) {
      case "Low":
        form.children[5].children[0].setAttribute("selected", "selected");
        break;
      case "Medium":
        form.children[5].children[1].setAttribute("selected", "selected");
        break;
      case "High":
        form.children[5].children[2].setAttribute("selected", "selected");
        break;
    }
    switch (todo.getStatus()) {
      case "Not Started":
        form.children[7].children[0].setAttribute("selected", "selected");
        break;
      case "In Progress":
        form.children[7].children[1].setAttribute("selected", "selected");
        break;
      case "Complete":
        form.children[7].children[2].setAttribute("selected", "selected");
        break;
    }
    form.children[9].children[0].setAttribute("selected", "selected");
    for (let option of form.children[9].children) {
      if (option.value === todo.getProject())
        option.setAttribute("selected", "selected");
    }
  }
  createItemDetailedView(todo) {
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    // const tex
  }
  setPriorityClass(priority) {
    switch (priority.textContent) {
      case "Low":
        priority.classList.add("low-priority");
        break;
      case "Medium":
        priority.classList.add("medium-priority");
        break;
      case "High":
        priority.classList.add("high-priority");
        break;
    }
  }
  setStatusStyles(todoDiv) {
    todoDiv.classList.remove("not-started", "in-progress", "complete");
    switch (todoDiv.children[1].children[2].textContent) {
      case "Not Started":
        todoDiv.classList.add("not-started");
        break;
      case "In Progress":
        todoDiv.classList.add("in-progress");
        break;
      case "Complete":
        todoDiv.classList.add("complete");
        break;
    }
  }
  completeButtonClickEvent(button, todo) {
    if (
      todo.getStatus() === "Not Started" ||
      todo.getStatus() === "In Progress"
    ) {
      todo.setStatus("Complete");
      button.parentElement.parentElement.children[1].children[2].textContent =
        "Complete";
    } else {
      todo.setStatus("Not Started");
      button.parentElement.parentElement.children[1].children[2].textContent =
        "Not Started";
    }
    this.setStatusStyles(button.parentElement.parentElement);
  }
}

const domGenerator = new DomGenerator();
