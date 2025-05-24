let todoUserInput = document.getElementById("todoUserInput");
let addTodoButton = document.getElementById("addTodoButton");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");



saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onchangeStatus(inputId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoElement = document.getElementById(todoId);
    let todoIndex = todoList.findIndex(function(eachItem) {
        let todoitemindex = "todo" + eachItem.uniqueNo;
        if (todoitemindex === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let requiredItem = todoList[todoIndex];
    if (requiredItem.isChecked === false) {
        requiredItem.isChecked = true;
    } else {
        requiredItem.isChecked = false;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let todoIndex = todoList.findIndex(function(eachitem) {
        let eachtodoIndex = "todo" + eachitem.uniqueNo;
        if (eachtodoIndex === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(todoIndex, 1);

}

function createAndAppendTodo(todo) {
    let inputId = "input" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputEl = document.createElement("input");
    inputEl.classList.add("checkbox-input");
    inputEl.type = "checkbox";
    inputEl.id = inputId;
    inputEl.onclick = function() {
        onchangeStatus(inputId, labelId, todoId);
    };
    inputEl.checked = todo.isChecked;
    todoElement.appendChild(inputEl);


    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelcontainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputId);
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }
    labelcontainer.appendChild(labelElement);

    let deleIconContainer = document.createElement("div");
    deleIconContainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deleIconContainer);


    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconElement.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleIconContainer.appendChild(deleteIconElement);
}



function getTodoListFromLocalStorage() {
    let stringifiedtodoList = localStorage.getItem("todoList");
    let parsedtodoList = JSON.parse(stringifiedtodoList);
    if (parsedtodoList === null) {
        return [];
    } else {
        return parsedtodoList;
    }
}

let todoList = getTodoListFromLocalStorage();


for (let todo of todoList) {

    createAndAppendTodo(todo);
}


let todosCount = todoList.length;

function onAddTodo() {
    let todoUserInputValue = todoUserInput.value;
    if (todoUserInputValue === "") {
        alert("Enter valid input");
        return;
    }
    todosCount += 1;
    let newTodo = {
        text: todoUserInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}