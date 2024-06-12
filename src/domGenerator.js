import { screenController } from "./screenController";
import DomHandler from "./domHandler";
export { DomGenerator as default, domGenerator };

class DomGenerator {
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
    const projectContainer = document.createElement("div");
    const banner = document.createElement("div");
    const bannerHeader = document.createElement("h2");
    const itemsContainer = document.createElement("div");
    const listViewTableHeader = document.createElement("div");
    const nameHeader = document.createElement("p");
    const dateHeader = document.createElement("p");
    //add classes/ids
    projectContainer.id = "project-container";
    itemsContainer.id = "items-container";
    banner.id = "banner";
    //add content
    sidebarLabel.textContent = project.getTitle();
    bannerHeader.textContent = project.getTitle();
    nameHeader.textContent = "Name";
    dateHeader.textContent = "Date";
    //add styles
    banner.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )})`;
    //add event listeners
    DomHandler.setProjectTabEvent(sidebarLabel);
    //add to dom
    this.#projectList.appendChild(sidebarLabel);
    banner.append(bannerHeader);
    listViewTableHeader.append(nameHeader, dateHeader);
    itemsContainer.append(listViewTableHeader);
    projectContainer.append(banner, itemsContainer);
    //add project to project screen list in screen controller
    screenController.addProjectScreen(projectContainer, project.getTitle());
  }
  toggleProjectView(project) {}
}

const domGenerator = new DomGenerator();
