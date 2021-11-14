var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function()  {
    event.preventDefault(); //Prevents browser's default action when form is submitted i.e refresh

    //declaring variables top store for inputs
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create a div to hold task info to list item and apply ccs styling
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='taskname'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";


    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};


formEl.addEventListener("submit", createTaskHandler);