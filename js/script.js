// script.js

// Seleciona os elementos principais da página
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Função para adicionar nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    // Verifica se o campo de input está vazio
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Cria um novo elemento <li> para a nova tarefa
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // Adiciona o <li> na lista de tarefas
    taskList.appendChild(newTask);

    // Limpa o campo de input
    taskInput.value = "";
}

// Adiciona um evento de clique no botão para adicionar a tarefa
addTaskBtn.addEventListener('click', addTask);
