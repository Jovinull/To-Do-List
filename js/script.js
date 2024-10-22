// script.js

// Seleciona os elementos principais da página
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterTasks = document.getElementById('filter-tasks');

// Carrega as tarefas salvas ao iniciar
window.addEventListener('load', loadTasksFromLocalStorage);

// Função para adicionar nova tarefa
function addTask(taskText = null, completed = false) {
    // Verifica se estamos adicionando uma tarefa existente ou nova
    const text = taskText ? taskText : taskInput.value.trim();

    // Verifica se o campo de input está vazio
    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    // Cria um novo elemento <li> para a nova tarefa
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="delete-btn">Remove</button>
    `;

    // Se a tarefa foi concluída, aplica a classe "completed"
    if (completed) {
        newTask.querySelector('.task-text').classList.add('completed');
    }

    // Adiciona o <li> na lista de tarefas
    taskList.appendChild(newTask);

    // Se é uma tarefa nova, salva no Local Storage
    if (!taskText) {
        saveTaskToLocalStorage(text);
    }

    // Limpa o campo de input
    taskInput.value = "";

    // Adiciona evento de click para remover e marcar como concluída
    addTaskEvents(newTask);
}

// Função para salvar tarefa no Local Storage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para obter as tarefas do Local Storage
function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Função para carregar as tarefas do Local Storage
function loadTasksFromLocalStorage() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}

// Função para remover tarefa do Local Storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar os eventos de remover e concluir
function addTaskEvents(taskItem) {
    // Evento para marcar como concluída ao clicar no texto da tarefa
    const taskTextElement = taskItem.querySelector('.task-text');
    taskTextElement.addEventListener('click', () => {
        taskTextElement.classList.toggle('completed');
        updateTaskCompletionStatus(taskTextElement.textContent, taskTextElement.classList.contains('completed'));
    });

    // Evento para remover a tarefa ao clicar no botão "Remove"
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const taskText = taskTextElement.textContent;
        taskItem.remove();
        removeTaskFromLocalStorage(taskText);
    });
}

// Função para atualizar o status de conclusão da tarefa no Local Storage
function updateTaskCompletionStatus(taskText, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para filtrar as tarefas com base no status
filterTasks.addEventListener('change', filterTaskList);

function filterTaskList() {
    const filterValue = filterTasks.value;
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const taskTextElement = task.querySelector('.task-text');
        const isCompleted = taskTextElement.classList.contains('completed');

        if (filterValue === 'all') {
            task.style.display = 'flex';
        } else if (filterValue === 'pending' && isCompleted) {
            task.style.display = 'none';
        } else if (filterValue === 'completed' && !isCompleted) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}

// Adiciona um evento de clique no botão para adicionar a tarefa
addTaskBtn.addEventListener('click', () => addTask());
