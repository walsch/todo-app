const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const todoCount = document.getElementById("todo-count");
const emptyState = document.getElementById("empty-state");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

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

function updateCount() {
  const total = todoList.querySelectorAll(".todo-item").length;
  const done = todoList.querySelectorAll(".todo-item.done").length;
  todoCount.textContent = total === 0
    ? "No tasks"
    : done > 0
      ? `${done} of ${total} done`
      : `${total} task${total === 1 ? "" : "s"}`;
  emptyState.classList.toggle("hidden", total > 0);
}

function addTodo(text) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.setAttribute("aria-label", "Mark as complete");
  checkbox.addEventListener("change", () => {
    listItem.classList.toggle("done", checkbox.checked);
    updateCount();
  });

  const todoText = document.createElement("span");
  todoText.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete "${text}"`);
  deleteButton.addEventListener("click", () => {
    listItem.classList.add("removing");
    listItem.addEventListener("animationend", () => {
      listItem.remove();
      updateCount();
    }, { once: true });
  });

  listItem.append(checkbox, todoText, deleteButton);
  todoList.appendChild(listItem);
  updateCount();
}

updateCount();
