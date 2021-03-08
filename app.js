//SELECTORS 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

let completeTodos = 0;
let uncompleteTodos = 0;

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', GetTodos);
todoButton.addEventListener('click',AddTodo)
todoList.addEventListener('click', DeleteCheck);
filterOption.addEventListener('click', FilterTodo);

//FUNCTIONS
function AddTodo (event){

    //PREVIENE QUE SE RECARGUE LA PÁGINA CUANDO SE HACE EL SUMBMIT 
    event.preventDefault();
    //TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //CREANDO LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    SaveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //CLEAR todo INPUT
    todoInput.value = "";
}


function DeleteCheck(event){
    const item = event.target;
    const todos = todoList;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        RemoveLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }
    
    if(item.classList[0] === 'complete-btn'){
        if(item.parentElement.classList.contains('completed')){
            completeTodos--;
        }else{
            completeTodos++;
        }
        const todo = item.parentElement;
        // todo.firstElementChild.classList.toggle('completed');
        todo.classList.toggle('completed');
        todos.appendChild(todo);
        PushLocalCompletedTodos(todo);
    }

}



function FilterTodo(event){
    event.preventDefault();
    const todos = todoList.childNodes;
    console.log(todos[0])
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
    
}


function SaveLocalTodos(todo){
    let todos;
    let uncompleteTodos
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

// localStorage.clear();


function GetTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //TODO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //CREANDO LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        //CHECK MARK BUTTON
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class = "fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    })
     
}

function RemoveLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("Comprar huevos"));

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function PushLocalCompletedTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        //JSON.PARSE -> analisa como un JSON
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;

    //todo - div contenedor, [0] li que contiene la info
    todos.splice(todos.indexOf(todoIndex), 1);
    todos.push(todoIndex);
    localStorage.setItem("todos", JSON.stringify(todos))
}

