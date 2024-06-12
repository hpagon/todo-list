import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator, { domGenerator } from "./domGenerator";
import ScreenController, { screenController} from "./screenController";
import Project from "./project";

class App {
  #projects = [];
//   #domGenerator;
//   #domHandler;
//   #screenController;
  constructor() {
    // this.#domHandler = new DomHandler();
    // this.#domGenerator = new DomGenerator();
    // this.#screenController = new ScreenController();
    this.createProject("All");
    this.createProject("Today");
    //set initial screen to all project
    screenController.setProjectScreen("All");
    // this.#screenController.setProjectScreen("All");
  }
  createProject(title) {
    const newProject = new Project(title);
    //add project to application project array
    this.#projects.push(newProject);
    //create dom for project and add it to screen controller
    // this.#screenController.addProjectScreen(
      domGenerator.createProject(newProject)
    //   title
    // );
  }
  getScreenController() {
    // return this.#screenController;
  }
}

const app = new App();
console.log(app);

export { app };
