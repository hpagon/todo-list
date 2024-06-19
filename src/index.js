import "./style.css";
import DomHandler from "./domHandler";
import DomGenerator, { domGenerator } from "./domGenerator";
import ScreenController, { screenController } from "./screenController";
import Project from "./project";
import Todo from "./todo";
import { format } from "date-fns";

class App {
  #projects = {};
  constructor() {
    this.createProject("All");
    this.createProject("Today");
    this.createProject("Personal");
    //set initial screen to all project
    screenController.setProjectScreen("All");
    this.createItem(
      "Welcome to your todo...",
      "Placeholder Text",
      "",
      "Low",
      "Not Started",
      ""
    );
    this.createItem(
      "The home for all your todo's.",
      "Placeholder Text",
      "",
      "Medium",
      "In Progress",
      ""
    );
    this.createItem(
      "Try it out for yourself!",
      "Placeholder Text",
      format(new Date(), "yyyy-MM-dd"),
      "High",
      "Complete",
      ""
    );
    this.updateToday();
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
  editItem(
    todo,
    newTitle,
    newDescription,
    newDate,
    newPriority,
    newStatus,
    newProject
  ) {
    const oldProject = todo.getProject();
    const oldDate = todo.getDate();
    const today = format(new Date(), "yyyy-MM-dd");
    todo.setTitle(newTitle);
    todo.setDescription(newDescription);
    todo.setDate(newDate);
    todo.setPriority(newPriority);
    todo.setStatus(newStatus);
    todo.setProject(newProject);
    //if project was changed
    if (oldProject !== newProject) {
      //had no project before, but now it does
      if (oldProject === "" && newProject !== "") {
        this.#projects[newProject].addTodo(todo);
        domGenerator.createItem(todo, newProject);
      } else if (oldProject !== "" && newProject === "") {
        //had project before, but now no project
        this.#projects[oldProject].removeTodo(todo);
        domGenerator.removeItem(todo.getId(), oldProject);
      } else {
        //project swap
        this.#projects[oldProject].removeTodo(todo);
        this.#projects[newProject].addTodo(todo);
        domGenerator.moveItem(todo.getId(), oldProject, newProject);
      }
    }
    // if date was changed
    if (oldDate !== newDate) {
      if (oldDate !== today && newDate === today) {
        this.#projects["Today"].addTodo(todo);
        domGenerator.createItem(todo, "Today");
      } else if (oldDate === today && newDate !== today) {
        this.#projects["Today"].removeTodo(todo);
        domGenerator.removeItem(todo.getId(), "Today");
      }
    }
    //edit todoDiv in active projects
    domGenerator.editItem(todo, "All");
    if (newProject !== "") domGenerator.editItem(todo, newProject);
    if (todo.getDate() === today) domGenerator.editItem(todo, "Today");
  }
  updateToday() {
    //clear today project
    this.#projects["Today"].clearTodos();
    domGenerator.clearItems("Today");
    //repopulate today project
    const today = format(new Date(), "yyyy-MM-dd");
    const todos = this.#projects["All"].getItems();
    for (const todo of todos) {
      if (todo.getDate() === today) {
        this.#projects["Today"].addTodo(todo);
        domGenerator.createItem(todo, "Today");
      }
    }
  }
}
const app = new App();
console.log(app);

export { app };
