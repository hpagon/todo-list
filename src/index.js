import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator, { domGenerator } from "./domGenerator";
import ScreenController, { screenController } from "./screenController";
import Project from "./project";

class App {
  #projects = [];
  constructor() {
    this.createProject("All");
    this.createProject("Today");
    //set initial screen to all project
    screenController.setProjectScreen("All");
  }
  createProject(title) {
    const newProject = new Project(title);
    //add project to application project array
    this.#projects.push(newProject);
    //create dom for project
    domGenerator.createProject(newProject);
  }
  createItem() {
    console.log("item created");
  }
}

const app = new App();
console.log(app);

export { app };
