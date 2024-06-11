import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator from "./domGenerator";
import ScreenController from "./screenController";
import Project from "./project";

class App {
  #projects = [];
  #domGenerator;
  #screenController;
  constructor() {
    this.#domGenerator = new DomGenerator();
    this.#screenController = new ScreenController();
    this.createProject("All");
    this.createProject("Today");
    this.#screenController.setProjectScreen("All");
  }
  createProject(title) {
    const newProject = new Project(title);
    //add project to application project array
    this.#projects.push(newProject);
    //create dom for project and add it to screen controller
    this.#screenController.addProjectScreen(
      this.#domGenerator.createProject(newProject),
      title
    );
  }
  getScreenController() {
    return this.#screenController;
  }
}

const app = new App();
console.log(app);

export { app };
