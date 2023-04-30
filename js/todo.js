const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

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

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.draggable = true; // enable drag functionality
  span.addEventListener("dragstart", handleDragStart);
  span.addEventListener("dragend", handleDragEnd);
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
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

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.backgroundColor = "yellow";
}

function handleDragEnd(event) {
  event.currentTarget.style.backgroundColor = "";
}

function handleDrop(event) {
  /*  const itemId = event.dataTransfer.getData("text/plain");
  const item = document.getElementById(itemId);
  event.currentTarget.appendChild(item); */

  event.preventDefault();
  const itemId = event.dataTransfer.getData("text/plain");
  const item = document.getElementById(itemId);
  event.currentTarget.insertBefore(item, event.currentTarget.lastChild);
}

function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.style.backgroundColor = "lightgray";
}

function handleDragLeave(event) {
  event.currentTarget.style.backgroundColor = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

const swimLanes = document.querySelectorAll(".swim_lane");
swimLanes.forEach((lane) => {
  lane.addEventListener("drop", handleDrop);
  lane.addEventListener("dragover", handleDragOver);
  lane.addEventListener("dragleave", handleDragLeave);
});
