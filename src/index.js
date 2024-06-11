import "./style.css";
import DomHandler from "./domHandler";
import ScreenController from "./screenController";
import Project from "./project";
import Todo from "./todo";

class App {
  #projects = [];
  constructor() {
    this.createProject("All");
    this.createProject("Today");
  }
  createProject(title) {
    const newProject = new Project(title);
    this.#projects.push(newProject);
  }
}

const app = new App();
console.log(app);

export { app };
