import { app } from "./index.js";

export default class DomGenerator {
  #projectList;
  #content = document.querySelector("#content");
  #project = document.querySelector("#project-container");

  constructor() {
    this.#projectList = document.querySelector("#projects");
  }
  //creates dom elements for projects
  createProject(project) {
    //create elements
    const sidebarLabel = document.createElement("li");
    const itemsContainer = document.createElement("div");
    const listViewTableHeader = document.createElement("div");
    const nameHeader = document.createElement("p");
    const dateHeader = document.createElement("p");
    //add classes/ids
    itemsContainer.id = "items-container";
    //add content
    sidebarLabel.textContent = project.getTitle();
    nameHeader.textContent = "Name";
    dateHeader.textContent = "Date";
    //add to dom
    this.#projectList.appendChild(sidebarLabel);
    listViewTableHeader.append(nameHeader, dateHeader);
    itemsContainer.append(listViewTableHeader);
    return itemsContainer;
  }
  toggleProjectView(project) {}
}
