const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

function addTodo(text) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  const todoText = document.createElement("span");
  todoText.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    listItem.remove();
  });

  listItem.append(todoText, deleteButton);
  todoList.appendChild(listItem);
}
