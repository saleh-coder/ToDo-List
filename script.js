// Element selection
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load saved tasks
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value;

    if (taskText.trim() !== '') {
        addTaskToDOM(taskText);
        saveTask(taskText);

        taskInput.value = '';
    }
});

// Function to add task to the DOM
function addTaskToDOM(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        removeTask(taskText);
    });

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Save task to localStorage
function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(addTaskToDOM);
}

// Remove task from localStorage
function removeTask(taskText) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
