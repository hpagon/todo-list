export { ScreenController as default, screenController };

class ScreenController {
  #projects;
  #contentDiv;
  constructor() {
    this.#projects = {};
    this.#contentDiv = document.querySelector("#content");
  }
  //store project screen
  addProjectScreen(projectScreen, title) {
    this.#projects[title] = projectScreen;
  }
  //change current project screen
  setProjectScreen(title) {
    //remove previous project container
    if (document.querySelector("#project-container") !== null) {
        document.querySelector("#project-container").remove();
    }
    //add in new project container
    this.#contentDiv.appendChild(this.#projects[title]);
  }
}

const screenController = new ScreenController();
