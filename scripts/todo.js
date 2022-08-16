'use strict';

const inTaskElm = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');

const todoListElm = document.getElementById('todo-list');
const todoHeaderElm = document.querySelector('.todo-list-header');

userLogin = userLoginStore.getData(); // kiểm tra xem có user login
if (userLogin) {
    renderTodoList(todosArr, userLogin.username); // render UI

    // =============lắng nghe sự kiện click add btn==============
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const inTaskValue = inTaskElm.value.trim();
        if (inTaskValue === '') {
            alert(`Input task please.`);
        } else {
            inTaskElm.value = '';
            const taskInput = new Task(inTaskValue, userLogin.username, false);
            todosArr = todosListStore.getData() ?? []; //doc du lieu tu store
            todosArr.push(taskInput);
            console.log(todosArr);
            todosListStore.saveData(todosArr); // save to store

            renderTodoList(todosArr, userLogin.username); // render UI
        }
    });
} else {
    // todoHeaderElm.style.display = 'none';
    todoListElm.innerHTML = `<div id="message-login">
        You need <a href="../index.html" class="btn btn-primary">Login</a> to see
        your todolist.
    </div>`;
}

//============hàm render nội dung todoslist ==========
function renderTodoList(arr, username) {
    const htmlString = arr
        .filter(todo => todo.owner === username)
        .reverse()
        .map(
            todo =>
                `<li onclick="toggleCheck('${todo.task}','${username}')" ${
                    todo.isDone && 'class="checked"'
                }>${todo.task}<span onclick="deleteTodo('${
                    todo.task
                }','${username}')" class="close">×</span></li>`
        )
        .reduce((sum, string) => (sum += string), '');
    todoListElm.innerHTML = htmlString;
}

//==========lắng nghe sự kiện click delete btn=============
function deleteTodo(taskDelete, username) {
    if (confirm(`Delete task "${taskDelete}". Are you sure?`)) {
        todosArr = todosArr.filter(
            todo => !(todo.task === taskDelete && todo.owner === username)
        );

        todosListStore.saveData(todosArr); // save to store
        renderTodoList(todosArr, username); // render UI
    }
}

//==============toggleCheck event=================
function toggleCheck(taskToggle, username) {
    todosArr = todosArr.map(todo =>
        todo.task === taskToggle && todo.owner === username
            ? new Task(todo.task, todo.owner, !todo.isDone)
            : todo
    );
    todosListStore.saveData(todosArr); // save to store
    renderTodoList(todosArr, username); // render UI
}
