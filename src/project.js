export default class Project {
  #title;
  #items;
  #view;
  #colorOne;
  #colorTwo;
  constructor(title) {
    this.#title = title;
    this.#items = [];
    this.#view = "List";
    this.#colorOne = this.randomHexColor();
    this.#colorTwo = this.randomHexColor();
  }
  //getters
  getTitle() {
    return this.#title;
  }
  getItems() {
    return this.#items;
  }
  getView() {
    return this.#view;
  }
  getColorOne() {
    return this.#colorOne;
  }
  getColorTwo() {
    return this.#colorTwo;
  }
  //setters
  setTitle(newTitle) {
    this.#title = newTitle;
  }
  setView(newView) {
    this.#view = newView;
  }
  addTodo(newTodo) {
    this.#items.push(newTodo);
  }
  setColorOne(hexColor) {
    this.#colorOne = hexColor;
  }
  setColorTwo(hexColor) {
    this.#colorTwo = hexColor;
  }
  //other methods
  removeTodo(todo) {
    for (let i = 0; i < this.#items.length; i++) {
      if (todo === this.#items[i]) this.#items.splice(i, 1);
    }
  }
  clearTodos() {
    this.#items.splice(0, this.#items.length);
  }
  randomHexColor() {
    const hex = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    return (
      "#" +
      hex[Math.floor(Math.random() * 15)] +
      hex[Math.floor(Math.random() * 15)] +
      hex[Math.floor(Math.random() * 15)] +
      hex[Math.floor(Math.random() * 15)] +
      hex[Math.floor(Math.random() * 15)] +
      hex[Math.floor(Math.random() * 15)]
    );
  }
}
