// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");// Add a new task.
var addButton=document.getElementsByTagName("button")[0];// First button.
var incompleteTaskHolder=document.querySelector(".incomplete-tasks-list");//ul of .incomplete-tasks-list.
var completedTasksHolder=document.querySelector(".completed-tasks-list");//ul of .completed-tasks-list.

// New task list item.
var createNewTaskElement=function(taskString) {

  var listItem=document.createElement("li");

  var checkBox=document.createElement("input");

  var label=document.createElement("label");

  var editInput=document.createElement("input");

  var editButton=document.createElement("button");

  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  listItem.className="task";

  label.innerText=taskString;
  label.className="label label_size_b";

  // Each elements, needs appending.
  checkBox.type="checkbox";
  checkBox.className="checkbox";

  editInput.type="text";
  editInput.className="label input task__input";

  editButton.innerText="Edit";// innerText encodes special characters, HTML does not.
  editButton.className="edit-btn";

  deleteButton.className="delete-btn";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.className="delete-btn__img"
  deleteButtonImg.alt="delete";
  deleteButton.appendChild(deleteButtonImg);

  // Appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask=function() {
  console.log("Add Task...");

  // Create a new list item with the text from the #new-task.
  if (!taskInput.value) return;

  var listItem=createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder.
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

// Edit an existing task.
var editTask=function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".input");
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".edit-btn");
  var containsClass=listItem.classList.contains("task_editable");

  label.classList.toggle("task__label");

  // If class of the parent is .task_editable
  if (containsClass) {
    // switch to .task_editable
    // label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  } else {
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  // Toggle .task_editable on the parent.
  listItem.classList.toggle("task_editable");
};


// Delete task.
var deleteTask=function() {
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;

  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


// Mark task completed.
var taskCompleted=function() {
  console.log("Complete Task...");

  // Append the task list item to the #completed-tasks-list.
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);

  // Add text-decoration: line-through.
  var label=listItem.querySelector("label");
  label.classList.add("completed-tasks__label");

  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function() {
  console.log("Incomplete Task...");

  // Mark task as incomplete.
  // When the checkbox is unchecked
  // append the task list item to the #incomplete-tasks-list.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);

  // Remove text-decoration: line-through.
  var label=listItem.querySelector("label");
  label.classList.remove("completed-tasks__label");

  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function() {
  console.log("AJAX Request");
}

// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");

  // Select ListItems children.
  var checkBox=taskListItem.querySelector(".checkbox");
  var editButton=taskListItem.querySelector(".edit-btn");
  var deleteButton=taskListItem.querySelector(".delete-btn");

  // Bind editTask to edit button.
  editButton.onclick=editTask;

  // Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;

  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

// Cycle over incompleteTaskHolder ul list items
// for each list item.
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  // Bind events to list items chldren(tasksCompleted).
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

// Cycle over completedTasksHolder ul list items.
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //Bind events to list items chldren(tasksIncomplete).
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
// Prevent creation of empty tasks.
// Change edit to save when you are in edit mode.