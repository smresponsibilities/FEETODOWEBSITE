var tasksArray = []; // Array to store tasks

function showNewTaskScreen() {
  document.getElementById("newTaskScreen").classList.add("active");
}

function hideNewTaskScreen() {
  document.getElementById("newTaskScreen").classList.remove("active");
}

function setDefaultDate(taskDate, taskTime) {
  var now = new Date(); // Get the current date and time

  // Format the date and time in the format used by HTML date and time input fields
  var year = now.getFullYear();
  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
  var day = now.getDate().toString().padStart(2, "0");
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");

  var date = `${year}-${month}-${day}`;
  var time = `${hours}:${minutes}`;

  // Set the values of the date and time input fields
  taskDate.value = date;
  taskTime.value = time;
}

function addTask() {
  var taskName = document.getElementById("taskName").value;
  var taskDescription = document.getElementById("taskDescription").value;
  var taskDate = document.getElementById("taskDate").value;
  var taskTime = document.getElementById("taskTime").value;

  setDefaultDate(taskDate, taskTime);

  if (taskName.trim() !== "") {
    var task = {
      name: taskName,
      description: taskDescription,
      date: taskDate,
      time: taskTime,
    };

    tasksArray.push(task);

    // Store tasks in localStorage
    var tasksString = tasksArray
      .map(function (task) {
        return (
          task.name + "|" + task.description + "|" + task.date + "|" + task.time
        );
      })
      .join(",");

    localStorage.setItem("tasks", tasksString);

    alert("Your task has been added successfully!");

    // Clear input fields
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";

    hideNewTaskScreen();
    displayTasks();
    document.getElementById("goodMorningCard").style.display = "none"; // Hide "Good Morning" card
    document.getElementById("taskListCard").style.display = "block"; // Show task list card
    return false; // Prevent form submission
  } else {
    alert("Please enter a task name.");
    return false; // Prevent form submission
  }
}

function displayTasks() {
  var tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = "";

  tasksArray.forEach(function (task, index) {
    var taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.style.backgroundColor =
      document.getElementById("taskListCard").style.backgroundColor;
    taskElement.innerHTML =
      "<h3>" +
      task.name +
      "</h3><p>" +
      task.description +
      "</p><p>Date: " +
      task.date +
      "</p><p>Time: " +
      task.time +
      "</p>";
    var editIcon = document.createElement("div");
    editIcon.classList.add("edit-icon");
    editIcon.innerHTML = '<img class="edit-icon" src="Images/edit.png" alt="">';
    editIcon.onclick = function () {
      editTask(index);
    };
    var deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML =
      '<img class="delete-icon" src="Images/delete.png" alt="">';
    deleteIcon.onclick = function () {
      deleteTask(index);
    };
    taskElement.appendChild(editIcon);
    taskElement.appendChild(deleteIcon);
    tasksContainer.appendChild(taskElement);
  });

  if (tasksArray.length === 0) {
    document.getElementById("goodMorningCard").style.display = "block"; // Show "Good Morning" card
    document.getElementById("taskListCard").style.display = "none"; // Hide task list card
  } else {
    document.getElementById("goodMorningCard").style.display = "none"; // Hide "Good Morning" card
    document.getElementById("taskListCard").style.display = "block"; // Show task list card
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

function editTask(index) {
  var task = tasksArray[index];
  var editedName = prompt("Enter the edited task name:", task.name);
  var editedDescription = prompt(
    "Enter the edited task description:",
    task.description
  );
  var editedDate = prompt("Enter the edited task date:", task.date);
  var editedTime = prompt("Enter the edited task time:", task.time);
  if (
    editedName !== null &&
    editedDescription !== null &&
    editedDate !== null &&
    editedTime !== null
  ) {
    tasksArray[index] = {
      name: editedName,
      description: editedDescription,
      date: editedDate,
      time: editedTime,
    };
    localStorage.setItem(
      "tasks",
      tasksArray
        .map(function (task) {
          return (
            task.name +
            "|" +
            task.description +
            "|" +
            task.date +
            "|" +
            task.time
          );
        })
        .join(",")
    );
    displayTasks();
  }
}

function deleteTask(index) {
  var confirmation = confirm("Are you sure you want to delete this task?");
  if (confirmation) {
    tasksArray.splice(index, 1);
    localStorage.setItem(
      "tasks",
      tasksArray
        .map(function (task) {
          return (
            task.name +
            "|" +
            task.description +
            "|" +
            task.date +
            "|" +
            task.time
          );
        })
        .join(",")
    );
    displayTasks();
  }
}

function changeColor(color) {
  document.getElementById("taskListCard").style.backgroundColor = color;
  var boxShadowColor = getComputedStyle(document.getElementById("taskListCard"))
    .boxShadow.split(" ")
    .pop();
  document.getElementById(
    "taskListCard"
  ).style.boxShadow = `0px 0px 10px ${boxShadowColor}`;
  // searchbox color
  var searchBoxes = document.querySelectorAll(".search-box input");
  searchBoxes.forEach(function (searchBox) {
    searchBox.style.backgroundColor = color;

    var taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(function (taskItem) {
      taskItem.style.backgroundColor = color;
    });
  });
}

function showColorPicker() {
  document.getElementById("colorPickerScreen").classList.add("active");
}

function hideColorPicker() {
  document.getElementById("colorPickerScreen").classList.remove("active");
}

function checkAlarm() {
  var now = new Date();
  var currentTime = now.getTime();

  tasksArray.forEach(function (task) {
    var alarmDateTime = new Date(task.date + "T" + task.time);
    var taskTime = alarmDateTime.getTime();

    // Compare within a range (e.g., 1 minute) of the current time
    if (Math.abs(currentTime - taskTime) < 800) {
      alert("Time for task: " + task.name);
      document.getElementById("alarmSound").play();
    }
  });

  // Schedule the next check in 15 seconds
  setTimeout(checkAlarm, 10000);
}

// Start checking for alarms
checkAlarm();

// Load stored tasks from localStorage or initialize empty array
var storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  var tasksData = storedTasks.split(",");
  tasksArray = tasksData.map(function (task) {
    var taskParts = task.split("|");
    return {
      name: taskParts[0],
      description: taskParts[1],
      date: taskParts[2],
      time: taskParts[3],
    };
  });
  displayTasks(); // Display stored tasks
} else {
  document.getElementById("goodMorningCard").style.display = "block"; // Show "Good Morning" card
  document.getElementById("taskListCard").style.display = "none"; // Hide task list card
}
