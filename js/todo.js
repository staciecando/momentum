const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const todoLane = document.getElementById("todo-lane");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function handleDragStart(event) {
  event.target.classList.add("is-dragging");
}

function handleDragEnd(event) {
  event.target.classList.remove("is-dragging");
}

function handleDrop(event) {
  event.preventDefault();
  const swimlane = event.target.closest(".swim_lane");
  const li = document.querySelector(".is-dragging").parentElement;
  swimlane.appendChild(li);
}

function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.style.backgroundColor = "lightgray";
}

function handleDragLeave(event) {
  event.currentTarget.style.backgroundColor = "";
}

function addSwimLaneListeners(swimLanes) {
  swimLanes.forEach((lane) => {
    lane.addEventListener("drop", handleDrop);
    lane.addEventListener("dragover", handleDragOver);
    lane.addEventListener("dragleave", handleDragLeave);
  });
}

function createToDoElement(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.draggable = true;
  span.addEventListener("dragstart", handleDragStart);
  span.addEventListener("dragend", handleDragEnd);
  
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  
  li.appendChild(span);
  li.appendChild(button);
  
  return li;
}

function paintToDo(newTodo) {
  const li = createToDoElement(newTodo);
  toDoList.appendChild(li);

  const swimLanes = document.querySelectorAll(".swim_lane");
  addSwimLaneListeners(swimLanes);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
