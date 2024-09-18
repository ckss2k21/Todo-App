function loadTodo() {
    const todoList = JSON.parse(localStorage.getItem("todo-list")) || {"todolist":[]}// parse the data which are is json format and add to array // || -> is short circuiting true || false -> true and false || true -> false
    return todoList;                                                           
}
function editTodo() {
    console.log("edit");
    const todoList = loadTodo();
    const data = todoList.todolist;
    const li = this.closest('li');
    const spanText = li.querySelector('span').textContent;
    const editedTask = prompt("Write your Todo Task here to edit");
    console.log(editedTask);
    
    
    data.forEach(element => {
        if(element.todoid == spanText) {
            let spans = document.querySelectorAll("li > div > span");
            element.todotext = editedTask;
        } 
    });
    localStorage.setItem("todo-list",JSON.stringify(todoList)); 
    displayTodo(data);
}
function deleteTodo() {
        
    console.log("delete"); 
    const todoList = loadTodo();
    const data = todoList.todolist;
    const li = this.closest('li');
    const spanText = li.querySelector('span').textContent;
    console.log(spanText);

    data.forEach(element => {
        if(element.todoid == spanText) {
            const index = data.indexOf(element);
            if (index > -1) {
                data.splice(index, 1);
            }
        } 
    }); 
    localStorage.setItem("todo-list",JSON.stringify(todoList)); 
    displayTodo(data);
}

function completeTodo (event) {
    console.log("comp");
    const todoList = loadTodo();
    const data = todoList.todolist;
    const li = this.closest('li');
    const spanText = li.querySelector('span').textContent;
    console.log(spanText);
    const todotext = document.querySelector('li div span:nth-child(2)');
    data.forEach(element => {
        if(element.todoid == spanText) {
            if(element.iscompleted)
            element.iscompleted = false;
            else {
                element.iscompleted = true;

            }
        }
    }); 
    localStorage.setItem("todo-list",JSON.stringify(todoList)); 
    displayTodo(data);
    //element.iscompleted = true;
}
function createTodoList(todoTasks) {
    const ul = document.getElementById("task-list");
    const li = document.createElement("li");
    li.className ="todo-item";
    const div = document.createElement("div");
    div.className ="todo-text";
    const span1 = document.createElement("span");
    span1.style.display ="none";
    span1.textContent = `${todoTasks.todoid}`;
    const span2 = document.createElement("span");
    span2.textContent = `${todoTasks.todotext}`;
    if(todoTasks.iscompleted) {
        span2.style.textDecoration ="line-through";
        li.style.background=`rgb(131, 206, 131)`;
        li.addEventListener('mouseover', function() {
            li.style.borderBottom = '1px solid grey'; // Add a bottom border
            li.style.background = `rgb(102, 240, 102)`; 
        });
    
        li.addEventListener('mouseout', function() {
            li.style.background = `rgb(131, 206, 131)`;
        });
        span2.style.color = "white";
    } else {
        span2.style.textDecoration ="none";
    }
    div.appendChild(span1);
    div.appendChild(span2);
    li.appendChild(div);
    const div1 = document.createElement("div");
    div1.className = "action-btn";
    const editBtn = document.createElement("button");
    editBtn.textContent="Edit";
    editBtn.className = "act-btn edit-btn";
    editBtn.addEventListener("click", editTodo);

    const delBtn = document.createElement("button");
    delBtn.textContent="Delete";
    delBtn.className = "act-btn del-btn";
    delBtn.addEventListener("click", deleteTodo);

    const completeBtn = document.createElement("button");
    completeBtn.className = "act-btn complete-btn";
    todoTasks.iscompleted ? completeBtn.textContent="Reset" : completeBtn.textContent="Completed";
    completeBtn.addEventListener("click", completeTodo);
    div1.appendChild(editBtn);
    div1.appendChild(delBtn);
    div1.appendChild(completeBtn);
    li.appendChild(div1);
    ul.appendChild(li);
}


function displayTodo() {
    const ul = document.getElementById("task-list");
    ul.innerHTML="";
    console.log("displayTodo called");
    const todoList = JSON.parse(localStorage.getItem("todo-list")) || {"todolist":[]}// parse the data which are is json format and add to array // || -> is short circuiting true || false -> true and false || true -> false
    if(todoList.todolist) {
        for(let i = 0; i <todoList.todolist.length; i++) {   
            createTodoList(todoList.todolist[i]); 
        } 
    }
}

function applyFilter(event) {
    const filterBtn = event.target;
    const getClickedBtn = filterBtn.getAttribute("data-filter");
    const todoLists = document.getElementById("task-list");
    const todoList = loadTodo();
    todoLists.innerHTML="";
    todoList.todolist.forEach(element => {
        
        if(getClickedBtn === 'all') {
            createTodoList(element);
        } 
        else if(getClickedBtn === 'pending') {
            if(element.iscompleted === false)
            createTodoList(element);
            else {
                //todoLists.innerHTML= "No Todo is Pending";
            }
        } else if(getClickedBtn === 'completed'){
            if(element.iscompleted === true) {
                createTodoList(element);
            }  
            else {
                //todoLists.innerHTML= "No Todo is Completed";
            }
        }
    }); 
}

function addTodoTask() {
    let todoTask  = document.getElementById("task-input").value;
    const todoLists = loadTodo();
    console.log(todoLists);
    todoTask = todoTask.trim();
    if(todoTask =='') {
        window.alert("Please add some task!!");
        return;
    }
    let currentdate = new Date(); 
    let datetime = " Date: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " : "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
    todoLists.todolist.push({
        todoid   : Math.floor(Math.random()*1000),
        todotext : todoTask,
        creationdate : datetime,
        iscompleted: false
    });
    localStorage.setItem("todo-list",JSON.stringify(todoLists)); //set the data in browser local storage
    const taskList = document.getElementById("task-list");
    createTodoList(todoLists.todolist);
}


document.addEventListener("DOMContentLoaded", () => {

   displayTodo();
   const addTaskBtn = document.getElementById("add-task");
   addTaskBtn.addEventListener("click",addTodoTask); //onclick of add task button
   //Filter buttons in action
   const filterBtn = document.getElementsByClassName("filterBtn");
   for(const filter of filterBtn) {
        filter.addEventListener("click",applyFilter);
   }

});