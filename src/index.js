import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator, { domGenerator } from "./domGenerator";
import ScreenController, { screenController } from "./screenController";
import Project from "./project";

class App {
  #projects = {};
  constructor() {
    this.createProject("All");
    this.createProject("Today");
    //set initial screen to all project
    screenController.setProjectScreen("All");
  }
  createProject(title) {
    const newProject = new Project(title);
    //add project to application project array
    this.#projects[title] = newProject;
    //create dom for project
    domGenerator.createProject(newProject);
  }
  createItem() {
    this.#projects[screenController.getCurrentProject()].addItem(
      "New Item",
      "",
      "",
      "Low",
      "Not Started",
      ["All"]
    );
    console.log(this.#projects[screenController.getCurrentProject()]);
  }
}

const app = new App();
console.log(app);

export { app };
