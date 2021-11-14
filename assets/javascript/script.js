var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var taskFormHandler = function()  {
    event.preventDefault(); //Prevents browser's default action when form is submitted i.e refresh

    //declaring variables top store for inputs
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
    }
    //reset form
    formEl.reset()

    // package up data as an object
    var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    };
    
    var createTaskEl = function (taskDataObj) {
        // create list item
        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        //add task id as a custom attribute
        listItemEl.setAttribute("data-task-id", taskIdCounter)
      
        // create div to hold task info and add to list item
        var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        //adds div to <li>
        listItemEl.appendChild(taskInfoEl);
        
        var taskActionsEl = createTaskActions(taskIdCounter);
        listItemEl.appendChild(taskActionsEl);
        // add entire list item to list
        tasksToDoEl.appendChild(listItemEl);

        //increase or increment taskIdCount
        taskIdCounter++;
      };

        var createTaskActions = function(taskId)  {
        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";

        //create edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(editButtonEl);

        //create delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className ="btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(deleteButtonEl);
        
        //create drop down
        var statusSelectEl = document.createElement("select");
        statusSelectEl.className = "select-status";
        statusSelectEl.setAttribute("name", "status-change");
        statusSelectEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(statusSelectEl);

        var statusChoices = ["To Do", "In Prgress", "Completed"];
        for (var i = 0; i < statusChoices.length; i++) {
            // create option element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);
          
            // append to select
            statusSelectEl.appendChild(statusOptionEl);
        }
        

        return actionContainerEl;
      };
      
      formEl.addEventListener("submit", taskFormHandler);

      var taskButtonHandler = function(event) {
        console.log(event.target);

        //edit task function
        var editTask = function(taskId) {
            console.log("editing task" + taskId);
            // get task list item element based on id
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
            // get content from task name and type using the var 
            var taskName = taskSelected.querySelector("h3.task-name").textContent;
            var taskType = taskSelected.querySelector("span.task-type").textContent;
            
            //makes the form fields update with the task's name and type
            document.querySelector("input[name='task-name']").value = taskName;
            document.querySelector("select[name='task-type']").value = taskType;

            //change button text to say save task
            document.querySelector("#save-task").textContent = "Save Task";
            formEl.setAttribute("data-task-id", taskId);
            }

            

        //delet task function
        var deleteTask = function(taskId) {
            // get task list item element based on id
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
            taskSelected.remove();
        };

        // identifies button with .edit-btn was clicked in the main/ id #page-content area
        if (event.target.matches(".edit-btn")) {
            var taskId = event.target.getAttribute("data-task-id");
            editTask(taskId);
        } 
        
        //identifies button with .delete-btn was clicked in the main/ id #page-content area
        if (event.target.matches(".delete-btn")) {
            //gets task list item element based on id
            var taskId= event.target.getAttribute("data-task-id");
            deleteTask(taskId);
          }
    };
      pageContentEl.addEventListener("click", taskButtonHandler);