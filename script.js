// script.js
document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  const addTodoButton = document.getElementById("add-todo");
  const newTodoInput = document.getElementById("new-todo");
  const modeToggleButton = document.getElementById("mode-toggle");

  // Load to-do items from Local Storage
  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => {
      const newTodoItem = createTodoItem(todo.text, todo.completed);
      todoList.appendChild(newTodoItem);
    });
  };

  // Save to-do items to Local Storage
  const saveTodos = () => {
    const todos = [];
    todoList.querySelectorAll("li").forEach((li) => {
      todos.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Function to create a new to-do item element
  function createTodoItem(text, completed = false) {
    const li = document.createElement("li");
    if (completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed");
      saveTodos();
    });

    const span = document.createElement("span");
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      li.remove();
      saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
  }

  // Event listener for adding a new to-do item
  addTodoButton.addEventListener("click", () => {
    const todoText = newTodoInput.value.trim();
    if (todoText !== "") {
      const newTodoItem = createTodoItem(todoText);
      todoList.appendChild(newTodoItem);
      newTodoInput.value = "";
      saveTodos();
    }
  });

  // Allow pressing Enter to add a new to-do item
  newTodoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTodoButton.click();
    }
  });

  // Load existing to-do items from Local Storage when the page loads
  loadTodos();

  // Load mode from Local Storage and apply it
  const loadMode = () => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    }
  };

  // Save mode to Local Storage
  const saveMode = (mode) => {
    localStorage.setItem("mode", mode);
  };

  // Toggle Dark/Light mode
  modeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    saveMode(mode);
  });

  // Load mode on initial load
  loadMode();
});
