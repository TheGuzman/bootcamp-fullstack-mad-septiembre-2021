const todoContainer = document.querySelector('.todo__container__list');
const doneContainer = document.querySelector('.done__container__list');
const arrayTasks = [];

// todoContainer.appendChild(arrayTasks[2][1]);
// if(sessionStorage.getItem('tasks') !== null){
//     const storedTasks = JSON.parse(sessionStorage.getItem('tasks'));
//     updateDOMStats(storedTasks);
// }

document.querySelector('.form__container').addEventListener('submit', e => {
    e.preventDefault();
    const formElement = e.target;
    const inputTaskName = document.createElement('p'); //Added task name
    inputTaskName.value = formElement.task.value;
    const inputTaskDescription = document.createElement('p');//Added task description
    inputTaskDescription.value = formElement.description.value;
    const taskDoneChecker = document.createElement('input');//Added checkbox
    taskDoneChecker.type = 'checkbox'; //added type of checkbox
    const newTask = document.createElement('li'); //Added list
    newTask.textContent = inputTaskName.value + ':' + ' ' + inputTaskDescription.value;
    todoContainer.appendChild(newTask);
    newTask.insertAdjacentElement('beforeend', taskDoneChecker);
    arrayTasks.push([inputTaskName.value, inputTaskDescription.value, false]);
    localStorage.setItem('tasks',JSON.stringify(arrayTasks));
    formElement.task.value = '';
    formElement.description.value = '';
});

