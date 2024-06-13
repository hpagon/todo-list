import Todo from "./todo";

export default class Project {
    #title;
    #items;
    #view;
    constructor(title) {
        this.#title = title;
        this.#items = [];
        this.#view = "List";
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
}