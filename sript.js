// Função para criar uma nova tarefa
const createTask = async (event) => {
  event.preventDefault();
  const newTaskData = await getCreatedTaskInfo(event);

  const checkbox = getCheckboxInput(newTaskData);
  createTaskListItem(newTaskData, checkbox);

  const tasks = getTasksFromLocalStorage();
  const updatedTasks = [
    ...tasks,
    {
      id: newTaskData.id,
      description: newTaskData.description,
      checked: false,
    },
  ];
  setTasksInLocalStorage(updatedTasks);
  renderTasksProgressData(updatedTasks);

  document.getElementById("task-name").value = "";
  document.getElementById("task-category").value = "";
};

// Função para criar um novo elemento de tarefa
const createTaskListItem = (task, checkbox) => {
  const list = document.getElementById("task-board");
  const toDo = document.createElement("article");

  const removeTaskButton = document.createElement("button");
  removeTaskButton.textContent = "Concluir";
  removeTaskButton.ariaLabel = "Concluir tarefa";

  removeTaskButton.onclick = () => {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, checked: true };
      }
      return t;
    });
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    const taskElement = document.getElementById(`task-${task.id}`);
    taskElement.querySelector("h3").style.textDecoration = "line-through";
    removeTaskButton.textContent = "";
    removeTaskButton.innerHTML = "&#10004;";
  };

  toDo.id = `task-${task.id}`;
  toDo.appendChild(checkbox);
  toDo.appendChild(removeTaskButton);

  list.appendChild(toDo);

  return toDo;
};

// Função para obter as tarefas do localStorage
const getTasksFromLocalStorage = () => {
  const localTasks = JSON.parse(window.localStorage.getItem("tasks"));
  return localTasks ? localTasks : [];
};

// Função para salvar as tarefas no localStorage
const setTasksInLocalStorage = (tasks) => {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Função para renderizar o contador de tarefas
const renderTasksProgressData = (tasks) => {
  const doneTasks = tasks.filter((task) => task.checked).length;
  const totalTasks = tasks.length;
  document.getElementById(
    "tasks-progress"
  ).textContent = `${doneTasks}/${totalTasks} concluídas`;
};

// Função para obter as informações da nova tarefa
const getCreatedTaskInfo = (event) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(getNewTaskData(event));
    }, 3000);
  });

// Função para obter as informações da nova tarefa
const getNewTaskData = (event) => {
  const description = event.target.elements["task-name"].value;
  const category = event.target.elements["task-category"].value;
  const id = getNewTaskId();

  return { description, category, id };
};

// Função para obter o novo ID da tarefa
const getNewTaskId = () => {
  const tasks = getTasksFromLocalStorage();
  const lastId = tasks[tasks.length - 1]?.id;
  return lastId ? lastId + 1 : 1;
};

// Função para criar um novo checkbox
const getCheckboxInput = ({ id, description, checked }) => {
  const checkbox = document.createElement("input");
  const label = document.createElement("h3");
  const wrapper = document.createElement("div");

  checkbox.type = "checkbox";
  checkbox.id = `task-${id}-checkbox`;
  checkbox.checked = checked || false;

  label.textContent = description;
  label.htmlFor = `task-${id}-checkbox`;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);

  return wrapper;
};

// Função para carregar as tarefas ao iniciar a página
window.onload = function () {
  const button = document.getElementById("add-task-button");

  button.addEventListener("click", createTask);

  const tasks = getTasksFromLocalStorage();

  tasks.forEach((task) => {
    const checkbox = getCheckboxInput(task);
    createTaskListItem(task, checkbox);
  });

  renderTasksProgressData(tasks);
};

// Adicionei essa linha para renderizar o contador de tarefas ao iniciar a página
renderTasksProgressData(getTasksFromLocalStorage());
