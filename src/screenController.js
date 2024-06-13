export { ScreenController as default, screenController };

class ScreenController {
  #projects;
  #contentDiv;
  #currentProject;
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
    if (document.querySelector("#project-container")) {
        document.querySelector("#project-container").remove();
    }
    //add in new project container
    this.#contentDiv.appendChild(this.#projects[title]);
    this.#currentProject = title;
  }
  getCurrentProject() {
    return this.#currentProject;
  }
  showModal(modalNum) {
    document.querySelector(`dialog:nth-child(${modalNum + 1})`).showModal();
  }
}

const screenController = new ScreenController();
