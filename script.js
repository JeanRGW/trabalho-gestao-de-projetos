(function () {
  const form = document.getElementById("taskForm");
  const taskList = document.getElementById("listContainer");

  // Carrega tarefas do localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = ""; // limpa a lista antes de redesenhar
    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const title = document.createElement("h3");
      title.textContent = task.name;
      title.className = "task__name";
      if (task.done) title.classList.add("done");

      const description = document.createElement("p");
      description.textContent = task.description;
      description.className = "task__description";
      if (task.done) description.classList.add("done");

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = task.done ? "Desfazer" : "Concluir";
      toggleBtn.className = "task__toggleDone";
      toggleBtn.addEventListener("click", () => {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";
      deleteBtn.className = "task__deleteBtn";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskDiv.appendChild(title);
      taskDiv.appendChild(description);
      taskDiv.appendChild(toggleBtn);
      taskDiv.appendChild(deleteBtn);

      taskList.appendChild(taskDiv);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("taskName").value.trim();
    const desc = document.getElementById("taskDescription").value.trim();

    if (!name || !desc) return;

    tasks.push({
      name,
      description: desc,
      done: false,
    });

    saveTasks();
    renderTasks();
    form.reset();
  });

  // Inicializa tarefas salvas
  renderTasks();
})();
