export default class ScreenController {
  #projects;
  #projectContainerDiv;
  constructor() {
    this.#projects = {};
    this.#projectContainerDiv = document.querySelector("#project-container");
  }
  //store project screen
  addProjectScreen(projectScreen, title) {
    this.#projects[title] = projectScreen;
  }
  setProjectScreen(title) {
    //remove previous project container
    if (document.querySelector("#items-container")) {
      document.querySelector("#items-container").remove();
    }
    //add in new project container
    this.#projectContainerDiv.appendChild(this.#projects[title]);
  }
}
