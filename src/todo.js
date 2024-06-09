export default class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #status;
  #projects;
  
  constructor(title, description, dueDate, priority, status, projects) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#status = status;
    this.#projects = projects;
  }
  //getters
  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }
  getDate() {
    return this.#dueDate;
  }
  getPriority() {
    return this.#priority;
  }
  getStatus() {
    return this.#status;
  }
  getProjects() {
    return this.#projects;
  }
  //setters
  setTitle(newTitle) {
    this.#title = newTitle;
  }
  setDescription(newDescription) {
    this.#description = newDescription;
  }
  setDate(newDate) {
    this.#dueDate = newDate;
  }
  setPriority(newPriority) {
    this.#priority = newPriority;
  }
  setStatus(newStatus) {
    this.#status = newStatus;
  }
  setProjects(newProjects) {
    this.#projects = newProjects;
  }
}
