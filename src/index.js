import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator, { domGenerator } from "./domGenerator";
import ScreenController, { screenController } from "./screenController";
import Project from "./project";
import Todo from "./todo";

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
  createItem(name, description, date, priority, status, projects) {
    const newTodo = new Todo(
      name,
      description,
      date,
      priority,
      status,
      projects
    );
    this.#projects["All"].addTodo(newTodo);
    console.log(this.#projects["All"]);
    domGenerator.createItem(newTodo, "All");
    console.log("here?");
  }
}

const app = new App();
console.log(app);

export { app };
