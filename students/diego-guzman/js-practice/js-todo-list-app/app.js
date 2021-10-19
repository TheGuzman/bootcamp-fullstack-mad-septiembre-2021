const todoContainer = document.querySelector('.todo__container__list');
const doneContainer = document.querySelector('.done__container__list');
const taskDoneChecker = document.createElement('input');//Added checkbox
taskDoneChecker.type = 'checkbox'; //added type of checkbox
let NewTasks = [];

if (localStorage.getItem('newtasks') !== null) {
    NewTasks = JSON.parse(localStorage.getItem('newtasks'));
    checktasks(NewTasks);
}
function checktasks(arr) {
    for (let i = 0; i < arr.length; i++) {
        const prevTask = document.createElement('li');
        prevTask.classList.add('li__task');
        const objPrevTask = arr[i];//object at index [i] in the newTasks array
        const arrPrevTask = Object.values(objPrevTask); //object at [i] to array for better printing
        arrPrevTask.splice(2, 1);
        prevTask.innerHTML = arrPrevTask;
        prevTask.insertAdjacentElement('beforeend', taskDoneChecker);
        todoContainer.appendChild(prevTask);   
    }
}

document.querySelector('.form__container').addEventListener('submit', e => {
    e.preventDefault();
    const formElement = e.target;
    const inputTaskName = document.createElement('p'); //Added task name
    inputTaskName.value = formElement.task.value;
    const inputTaskDescription = document.createElement('p');//Added task description
    inputTaskDescription.value = formElement.description.value;
    // const taskDoneChecker = document.createElement('input');//Added checkbox
    // taskDoneChecker.type = 'checkbox'; //added type of checkbox
    const newTask = document.createElement('li'); //Added list
    newTask.textContent = inputTaskName.value + ':' + ' ' + inputTaskDescription.value;
    todoContainer.appendChild(newTask);
    newTask.insertAdjacentElement('beforeend', taskDoneChecker);
    NewTasks.push({ 0: inputTaskName.value, 1: inputTaskDescription.value, 2: false });
    localStorage.setItem('newtasks', JSON.stringify(NewTasks));
    formElement.task.value = '';
    formElement.description.value = '';
})




// function addEntry() {
//     // Parse any JSON previously stored in allEntries
//     const existingTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (existingTasks == null) arrayTasks = [];
//     const newTask = document.createElement('li'); //Added list
//     newTask.textContent = inputTaskName.value + ':' + ' ' + inputTaskDescription.value;
//     todoContainer.appendChild(newTask);
//     newTask.insertAdjacentElement('beforeend', taskDoneChecker);
//     arrayTasks.push([inputTaskName.value, inputTaskDescription.value, false]);
//     localStorage.setItem('tasks', JSON.stringify(arrayTasks));
//     formElement.task.value = '';
//     formElement.description.value = ''
//     localStorage.setItem("newTask", JSON.stringify(newTask));
//     // Save allEntries back to local storage
//     existingTasks.push(newTask);
//     localStorage.setItem("tasks", JSON.stringify(existingTasks));
// };
