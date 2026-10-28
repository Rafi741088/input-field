// Grab the elements we need from the page
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");
const errorMessage = document.getElementById("error-message");

// Create one task item (<li>) with its own Delete button
function createTaskElement(text) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text; // textContent keeps user text safe

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", "Delete task: " + text);

  // Each Delete button removes only its own task
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateUI();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// Update the task count and show/hide the empty message
function updateUI() {
  const total = taskList.children.length;
  taskCount.textContent = "Total tasks: " + total;
  emptyState.hidden = total > 0;
}

// Validate the input, then add the task
function addTask() {
  const text = taskInput.value.trim(); // remove extra spaces

  if (text === "") {
    errorMessage.hidden = false; // empty or spaces only
    taskInput.value = "";
    taskInput.focus();
    return;
  }

  errorMessage.hidden = true;
  taskList.appendChild(createTaskElement(text));
  taskInput.value = "";
  taskInput.focus();
  updateUI();
}

// Event listeners (each one is attached only once)
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

// Hide the error as soon as the user starts typing again
taskInput.addEventListener("input", function () {
  errorMessage.hidden = true;
});

// Set the initial state (0 tasks, empty message visible)
updateUI();
