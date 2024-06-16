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
    this.createItem(
      "Welcome to your todo...",
      "Placeholder Text",
      "",
      "Low",
      "Not Started",
      "All"
    );
    this.createItem(
      "The home for all your todo's.",
      "Placeholder Text",
      "",
      "Medium",
      "In Progress",
      ""
    );
    this.createItem("Try it out for yourself!", "Placeholder Text", "", "High", "Complete", "");
  }
  createProject(title) {
    const newProject = new Project(title);
    //add project to application project array
    this.#projects[title] = newProject;
    //create dom for project
    domGenerator.createProject(newProject);
  }
  createItem(name, description, date, priority, status, project) {
    const newTodo = new Todo(
      name,
      description,
      date,
      priority,
      status,
      project
    );
    this.#projects["All"].addTodo(newTodo);
    console.log(this.#projects["All"]);
    domGenerator.createItem(newTodo, "All");
    //if project was assigned add todo to said project
    if (project !== "All" && project !== "") {
      this.#projects[project].addTodo(newTodo);
      domGenerator.createItem(newTodo, project);
    }
  }
}

const app = new App();
console.log(app);

export { app };
