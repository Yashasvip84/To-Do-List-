let tasks = [];
let currentFilter = 'all'; // Track the current filter

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks(currentFilter); // Render tasks based on the current filter
    }
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete" onclick="markAsCompleted(${task.id})">Complete</button>
                <button class="pending" onclick="markAsPending(${task.id})">Pending</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function markAsCompleted(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });
    renderTasks(currentFilter); // Render tasks based on the current filter
}

function markAsPending(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = false;
        }
        return task;
    });
    renderTasks(currentFilter); // Render tasks based on the current filter
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(currentFilter); // Render tasks based on the current filter
}

function editTask(id) {
    const newTaskText = prompt('Edit your task:', tasks.find(task => task.id === id).text);
    if (newTaskText !== null) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newTaskText;
            }
            return task;
        });
        renderTasks(currentFilter); // Render tasks based on the current filter
    }
}

function filterTasks(filter) {
    currentFilter = filter; // Update the current filter
    renderTasks(currentFilter); // Render tasks based on the current filter
}

// Initial render
renderTasks();
