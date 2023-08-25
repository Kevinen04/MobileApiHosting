const nameInput = document.querySelector('#input-name');
const dateTime = document.querySelector('#datetime');
const priorityInput = document.querySelector('#input-priority');
const clearButton = document.querySelector('#button-clear');
const addButton = document.querySelector('#button-add');
const tasksList = document.querySelector('#list-tasks');

let tasks = [];
let taskId = 0;

const resetValue = () => {
  nameInput.value = '';
  priorityInput.value = '';
  dateTime.value = new Date().toISOString();
};

clearButton.addEventListener('click', resetValue);

const removeTask = (taskId) => {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
};

const renderTasks = () => {
  tasksList.innerHTML = '';

  tasks.forEach(task => {
    const date = task.dueDate.toLocaleDateString('en-gb', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    const time = task.dueDate.toLocaleTimeString('en-gb', { timeStyle: "short" });

    const newItem = document.createElement('ion-item');
    newItem.textContent = `${task.name} with priority ${task.priority} is due at ${time} on ${date}`;

    const deleteIcon = document.createElement('ion-icon');
    deleteIcon.setAttribute('name', 'trash-outline');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', () => removeTask(task.id));
    newItem.appendChild(deleteIcon);

    tasksList.appendChild(newItem);
  });
};

addButton.addEventListener('click', () => {
  const nameValue = nameInput.value;
  const dateTimeInput = dateTime.value;
  const priorityValue = parseInt(priorityInput.value);

  const dateTimeValue = new Date(dateTimeInput);

  if (!nameValue || nameValue.trim() === '' || !priorityValue || isNaN(priorityValue)) {
    showAlert('Blank fields','Invalid values', 'All fields should be filled !');
    return;
  }

  if (priorityValue > 3 || priorityValue < 1) {
    showAlert('Invalid priority', 'Priority number should be 1,2 or 3.');
    priorityInput.value = '';
    return;
  }

  tasks.push({ name: nameValue, dueDate: dateTimeValue, priority: priorityValue, id: taskId });
  taskId++;

  renderTasks();
  resetValue();
});



function showAlert(title, message) {
  const alert = document.createElement('ion-alert');
  alert.header = title;
  alert.message = message;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  return alert.present();
}