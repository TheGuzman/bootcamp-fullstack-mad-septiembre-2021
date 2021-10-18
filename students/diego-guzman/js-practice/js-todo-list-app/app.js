const todoContainer = document.querySelector('.todo__container__list');
const doneContainer = document.querySelector('.done__container__list');
const arrayAllTasks = [];
let NewTasks = [];

// todoContainer.appendChild(arrayTasks[2][1]);
// if(sessionStorage.getItem('tasks') !== null){
//     const storedTasks = JSON.parse(sessionStorage.getItem('tasks'));
//     updateDOMStats(storedTasks);
// }
if (localStorage.getItem('newtasks') !== null) {
    NewTasks = JSON.parse(localStorage.getItem('newtasks'));
    arrayAllTasks.push(NewTasks);
    localStorage.setItem('tasks', JSON.stringify(arrayAllTasks));
    checktasks(NewTasks);
}
function checktasks(arr) {
    const prevTask = document.createElement('li');
    for (let i = 0; i < arr.length; i++) {
        prevTask.textContent = localStorage.getItem('newtasks', JSON.stringify(arr[i]));
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
    const taskDoneChecker = document.createElement('input');//Added checkbox
    taskDoneChecker.type = 'checkbox'; //added type of checkbox
    const newTask = document.createElement('li'); //Added list
    newTask.textContent = inputTaskName.value + ':' + ' ' + inputTaskDescription.value;
    todoContainer.appendChild(newTask);
    newTask.insertAdjacentElement('beforeend', taskDoneChecker);
    NewTasks.push({ task: inputTaskName.value, description: inputTaskDescription.value, done: false });
    localStorage.setItem('newtasks', JSON.stringify(NewTasks));
    formElement.task.value = '';
    formElement.description.value = '';
})




// arr.forEach(v=>{
//     const prevTask = document.createElement('li');
//     prevTask.textContent = localStorage.getItem('newtasks', JSON.stringify(arrayAllTasks[v]));
//     todoContainer.appendChild(prevTask);
// })


// function checktasks(arr){
//     for (let i =0; i<arr.length; i++){
//         for(let j=0; j<arr[i].length; j++){
//         }
//     }
//     }



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
