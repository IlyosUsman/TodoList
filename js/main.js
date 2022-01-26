const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todoWrapper = document.querySelector('.todos-wrapper');

let tasks;
//agar taskslar bolmasa array bosh bolsin. agar taskslar bolsa localStore da avvalgi tasklar saqlanib qolsin
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description){
    this.description = description;
    this.complated = false;
}

//todolarni create qilish va checked boganda index ga yuborish 
const createTemplate = (task, index) => {
    return `
          <div class="todo-item ${task.complated ? 'checked' : ''}"> 
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick="complateTask(${index})" class="btn-complate" type="checkbox" ${task.complated ? 'checked' : ''}>
                    <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
                </div>
            </div>
    `
}

// const filterTasks = () => {
//     const activeTasks = tasks.filter(item => item.complated == false);
//     const complatedTasks = tasks.filter(item => item.complated == true);
//     tasks = [...activeTasks,...complatedTasks];
//     console.log(tasks);

//     fillHtmlList()
// }

function fillHtmlList() {
    todoWrapper.innerHTML = "";
    if(tasks.length > 0) {
        // filterTasks();
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index) 
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}
// bu task lar ga murojat qiladi
fillHtmlList();





const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//tasklarni checked qilish
const complateTask = index => {
    tasks[index].complated = !tasks[index].complated;
    if(tasks[index].complated) {
        todoItemElems[index].classList.add('checked');//task bajarilgan bosa checked bosin 
    }else {
        todoItemElems[index].classList.remove('checked')//agar task bajarilmayagn bosa checked oz xolatiga qaytsin
    }
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}


