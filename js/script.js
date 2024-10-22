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

    // Adiciona o texto da tarefa e o botão de remover
    newTask.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Remove</button>
    `;

    // Adiciona o <li> na lista de tarefas
    taskList.appendChild(newTask);

    // Limpa o campo de input
    taskInput.value = "";

    // Adiciona evento de click para remover e marcar como concluída
    addTaskEvents(newTask);
}

// Função para adicionar os eventos de remover e concluir
function addTaskEvents(taskItem) {
    // Evento para marcar como concluída ao clicar no texto da tarefa
    const taskTextElement = taskItem.querySelector('.task-text');
    taskTextElement.addEventListener('click', () => {
        taskTextElement.classList.toggle('completed');
    });

    // Evento para remover a tarefa ao clicar no botão "Remove"
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });
}

// Adiciona um evento de clique no botão para adicionar a tarefa
addTaskBtn.addEventListener('click', addTask);
