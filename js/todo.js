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
  saveToDos(); // deleteToDo에 안적으면 todo지워도 계속 남음(save 됨)
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.setAttribute("draggble", "true");
  span.draggable = true; 

  span.addEventListener("dragstart", () => {
    span.classList.add("is-dragging");
  });

  span.addEventListener("dragend", () => {
    span.classList.remove("is-dragging");
  });
 

  

  function handleDrop(event) {
    event.preventDefault();
   
    const swimlane = event.target.closest(".swim_lane");
    swimlane.appendChild(li);
 
  }
  
  
  function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "lightgray";
  }
  
  function handleDragLeave(event) {
    event.currentTarget.style.backgroundColor = "";
  }
  
  const swimLanes = document.querySelectorAll(".swim_lane");
  swimLanes.forEach((lane) => {
    lane.addEventListener("drop", handleDrop);
    lane.addEventListener("dragover", handleDragOver);
    lane.addEventListener("dragleave", handleDragLeave);
  }); 

  /* span.addEventListener("dragstart", handleDragStart);
  span.addEventListener("dragend", handleDragEnd); */
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

toDoForm.addEventListener("submit", handleToDoSubmit);

/* function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.backgroundColor = "yellow";
} */
/* 
function handleDragEnd(event) {
  event.currentTarget.style.backgroundColor = "";
} */

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
