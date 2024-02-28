var tasksArray = []; // Array to store tasks

function showNewTaskScreen() {
  document.getElementById('newTaskScreen').classList.add('active');
}

function hideNewTaskScreen() {
  document.getElementById('newTaskScreen').classList.remove('active');
}

function addTask() {
  var taskName = document.getElementById('taskName').value;
  var taskDescription = document.getElementById('taskDescription').value;

  if (taskName.trim() !== "") {
	var task = {
	  name: taskName,
	  description: taskDescription
	};

	tasksArray.push(task); // Add task to array

	// Store tasks in localStorage
	var tasksString = tasksArray.map(function(task) {
	  return task.name + '|' + task.description;
	}).join(',');

	localStorage.setItem("tasks", tasksString);

	alert("Your task has been added successfully!");

	// Clear input fields
	document.getElementById('taskName').value = "";
	document.getElementById('taskDescription').value = "";

	hideNewTaskScreen();
	displayTasks();
	document.getElementById('goodMorningCard').style.display = 'none'; // Hide "Good Morning" card
	document.getElementById('taskListCard').style.display = 'block'; // Show task list card
	return false; // Prevent form submission
  } else {
	alert("Please enter a task name.");
	return false; // Prevent form submission
  }
}

function displayTasks() {
  var tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = "";

  tasksArray.forEach(function(task, index) {
	var taskElement = document.createElement('div');
	taskElement.classList.add('task-item');
	taskElement.innerHTML = "<h3>" + task.name + "</h3><p>" + task.description + "</p>";
	var editIcon = document.createElement('div');
	editIcon.classList.add('edit-icon');
	editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20.7 4.9c-.4-.4-1-.4-1.4 0l-1.8 1.8-2.9-2.9 1.8-1.8c.4-.4.4-1 0-1.4L15 0c-.4-.4-1-.4-1.4 0l-8.5 8.5c-.4.4-.4 1 0 1.4l2.3 2.3-5.1 5.1c-.4.4-.4 1 0 1.4l3.1 3.1c.4.4 1 .4 1.4 0l5.1-5.1 2.3 2.3c.2.2.4.3.7.3s.5-.1.7-.3l8.5-8.5c.4-.4.4-1 0-1.4l-2.2-2.2 1.8-1.8c.4-.4.4-1 0-1.4L20.7 4.9zM7.5 18.3l-3.8-1.3 1.3-3.8 9.3-9.3 2.5 2.5-9.3 9.3z"/></svg>';
	editIcon.onclick = function() {
	  var editedName = prompt("Enter the edited task name:", task.name);
	  var editedDescription = prompt("Enter the edited task description:", task.description);
	  if (editedName !== null && editedDescription !== null) {
		tasksArray[index] = { name: editedName, description: editedDescription };
		localStorage.setItem("tasks", tasksArray.map(function(task) {
		  return task.name + '|' + task.description;
		}).join(','));
		displayTasks();
	  }
	};
	var deleteIcon = document.createElement('div');
	deleteIcon.classList.add('delete-icon');
	deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 15l-1.41-1.41L12 13.17l-2.59-2.58L8 11l4 4 4-4-1.41-1.41L12 15z"/></svg>';
	deleteIcon.onclick = function() {
	  var confirmation = confirm("Are you sure you want to delete this task?");
	  if (confirmation) {
		tasksArray.splice(index, 1);
		localStorage.setItem("tasks", tasksArray.map(function(task) {
		  return task.name + '|' + task.description;
		}).join(','));
		displayTasks();
	  }
	};
	taskElement.appendChild(editIcon);
	taskElement.appendChild(deleteIcon);
	tasksContainer.appendChild(taskElement);
  });

  if (tasksArray.length === 0) {
	document.getElementById('goodMorningCard').style.display = 'block'; // Show "Good Morning" card
	document.getElementById('taskListCard').style.display = 'none'; // Hide task list card
  }
}

function clearAll() {
  var confirmation = confirm("Are you sure you want to clear all tasks?");
  if (confirmation) {
	localStorage.removeItem("tasks"); // Clear localStorage
	tasksArray = []; // Clear the array in memory
	displayTasks(); // Refresh display
  }
}

// Load stored tasks from localStorage or initialize empty array
var storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  var tasksData = storedTasks.split(',');
  tasksArray = tasksData.map(function(task) {
	var taskParts = task.split('|');
	return {
	  name: taskParts[0],
	  description: taskParts[1]
	};
  });
  displayTasks(); // Display stored tasks
  document.getElementById('goodMorningCard').style.display = 'none'; // Hide "Good Morning" card
  document.getElementById('taskListCard').style.display = 'block'; // Show task list card
} else {
  document.getElementById('goodMorningCard').style.display = 'block'; // Show "Good Morning" card
  document.getElementById('taskListCard').style.display = 'none'; // Hide task list card
}
