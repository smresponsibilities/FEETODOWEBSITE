var tasksArray = []; // Array to store tasks

  function showNewTaskScreen() {
    document.getElementById('newTaskScreen').classList.add('active');
  }

  function hideNewTaskScreen() {
    document.getElementById('newTaskScreen').classList.remove('active');
  }

  function sendEmail(userName, userEmail, taskName, taskDescription, taskDate, taskTime) {
    // Check if the user's email is provided
    if (!userEmail || userEmail.trim() === '') {
        alert("User's email address is missing!");
        return;
    }

    Email.send({
        SecureToken: "194e7364-b951-4293-9378-52bf24fcccde",
        To: userEmail, // Set the recipient's email address
        From: "dodocket@gmail.com",
        Subject: "Task Added Successfully!",
        Body: "Hello " + userName + ",\n\nYour task '" + taskName + "' has been added successfully!\n\nTask Description: " + taskDescription + "\nDate: " + taskDate + "\nTime: " + taskTime + "\n\nRegards,\nYour Task Manager"
    }).then(
        message => {
            if (message === "OK") {
                alert("Email sent successfully!");
            } else {
                alert("Email not sent. Error: " + message);
            }
        }
    ).catch(
        error => alert("Error sending email: " + error)
    );
}



function addTaskAndSendEmail() {
  var userName = document.getElementById('userName').value;
  var userEmail = document.getElementById('userEmail').value;
  var taskName = document.getElementById('taskName').value;
  var taskDescription = document.getElementById('taskDescription').value;
  var taskDate = document.getElementById('taskDate').value;
  var taskTime = document.getElementById('taskTime').value;

  if (userEmail.trim() === "") {
    alert("Please provide your email address.");
    return; // Stop execution if email is empty
}


  // Add task logic here...

  // After adding the task, send email
  sendEmail(userName, userEmail, taskName, taskDescription, taskDate, taskTime);
}

let current_color = "#000000";

function takeColor(color) {
  current_color = color;

  console.log(current_color);
}



  function addTask() {
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var taskName = document.getElementById('taskName').value;
    var taskDescription = document.getElementById('taskDescription').value;
    var taskDate = document.getElementById('taskDate').value;
    var taskTime = document.getElementById('taskTime').value;

    var selectedColor = current_color;


    if (!userEmail || userEmail.trim() === '') {
      alert("Please enter your email address.");
      return false;
  }

    if (taskName.trim() !== "") {
      var task = {
        name: taskName,
        description: taskDescription,
        date: taskDate,
        time: taskTime,
        color: selectedColor
      };

      tasksArray.push(task);

      // Store tasks in localStorage
      var tasksString = tasksArray.map(function(task) {
        return task.name + '|' + task.description + '|' + task.date + '|' + task.time + '|' + task.color;
      }).join(',');

      localStorage.setItem("tasks", tasksString);

      alert("Your task has been added successfully!");
      sendEmail(userName, userEmail, taskName, taskDescription, taskDate, taskTime);

      // Clear input fields
      document.getElementById('taskName').value = "";
      document.getElementById('taskDescription').value = "";
      document.getElementById('taskDate').value = "";
      document.getElementById('taskTime').value = "";

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
      // Apply selected color as border color
      taskElement.style.borderColor = task.color;
      taskElement.style.boxShadow = ` -8px 6px 2px 0px ${task.color}`;
      // Truncate task description before displaying
      var truncatedName = truncateText(task.name, 20);
      var truncatedDescription = truncateText(task.description, 10);
      //taskElement.style.backgroundColor = document.getElementById('taskListCard').style.backgroundColor;
      taskElement.innerHTML = "<h3>" + truncatedName + "</h3><p class='description'> " + truncatedDescription + "</p><p>Date: " + task.date + "</p><p>Time: " + task.time + "</p>";
      
      if (task.name.length > 20 || task.description.length > 10) {
        var readMoreButton = document.createElement('button');
        readMoreButton.textContent = "Read More";
        readMoreButton.classList.add('read-more');
        readMoreButton.onclick = function() {
            showFullTask(task);
        };
        taskElement.appendChild(readMoreButton);
    }

        var completeButton = document.createElement('button');
        completeButton.textContent = "Mark as Completed";
        completeButton.classList.add('complete-button');
        completeButton.onclick = function() {
            markTaskAsCompleted(taskElement);
        };
        taskElement.appendChild(completeButton);
      
      var editIcon = document.createElement('div');
      editIcon.classList.add('edit-icon');
      editIcon.innerHTML = '<img class="edit-icon" src="Images/edit.png" alt="">';
      editIcon.onclick = function() {
        editTask(index);
      };
      var deleteIcon = document.createElement('div');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '<img class="delete-icon" src="Images/delete.png" alt="">';
      deleteIcon.onclick = function() {
        deleteTask(index);
      };
      taskElement.appendChild(editIcon);
      taskElement.appendChild(deleteIcon);
      tasksContainer.appendChild(taskElement);
    });

    if (tasksArray.length === 0) {
      document.getElementById('goodMorningCard').style.display = 'block'; // Show "Good Morning" card
      document.getElementById('taskListCard').style.display = 'none'; // Hide task list card
    } else {
      document.getElementById('goodMorningCard').style.display = 'none'; // Hide "Good Morning" card
      document.getElementById('taskListCard').style.display = 'block'; // Show task list card
    }
  }
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function showFullTask(task) {
  alert("Task Name: " + task.name + "\n\nDescription: " + task.description);
}
function markTaskAsCompleted(taskElement) {
  taskElement.style.backgroundColor = '#f2f2f2'; // Change background color to light grey
  taskElement.style.textDecoration = 'line-through'; // Add strikethrough line
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
    var editedDescription = prompt("Enter the edited task description:", task.description);
    var editedDate = prompt("Enter the edited task date:", task.date);
    var editedTime = prompt("Enter the edited task time:", task.time);
    if (editedName !== null && editedDescription !== null && editedDate !== null && editedTime !== null) {
      tasksArray[index] = { name: editedName, description: editedDescription, date: editedDate, time: editedTime };
      localStorage.setItem("tasks", tasksArray.map(function(task) {
        return task.name + '|' + task.description + '|' + task.date + '|' + task.time;
      }).join(','));
      displayTasks();
    }
  }

  function deleteTask(index) {
    var confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
      tasksArray.splice(index, 1);
      localStorage.setItem("tasks", tasksArray.map(function(task) {
        return task.name + '|' + task.description + '|' + task.date + '|' + task.time;
      }).join(','));
      displayTasks();
    }
  }

  function changeColor(color) {
    let task_list = document.getElementsByClassName("task-item");

  task_list.map((task) => {
    task.style.backgroundColor = color;
  });

    document.getElementById('taskListCard').style.backgroundColor = color;
    var boxShadowColor = getComputedStyle(document.getElementById('taskListCard')).boxShadow.split(' ').pop();
    document.getElementById('taskListCard').style.boxShadow = `0px 0px 10px ${boxShadowColor}`;
  // searchbox color 
    var searchBoxes = document.querySelectorAll('.search-box input');
    searchBoxes.forEach(function(searchBox) {
    searchBox.style.backgroundColor = color;
 
    var taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(function(taskItem) {
    taskItem.style.backgroundColor = color;
  });
  });
  }
  
  function showColorPicker() {
    document.getElementById('colorPickerScreen').classList.add('active');
  }

  function hideColorPicker() {
    document.getElementById('colorPickerScreen').classList.remove('active');
  }

  function checkAlarm() {
    var now = new Date();
    var currentTime = now.getTime();

    tasksArray.forEach(function(task) {
      var alarmDateTime = new Date(task.date + 'T' + task.time);
      var taskTime = alarmDateTime.getTime();

      // Compare within a range (e.g., 1 minute) of the current time
      if (Math.abs(currentTime - taskTime) < 1000) {
        alert("Time for task: " + task.name);
        document.getElementById('alarmSound').play(); 
      }
    });

    
    setTimeout(checkAlarm, 1000);
  }

  // Start checking for alarms
  checkAlarm();

  // Load stored tasks from localStorage or initialize empty array
  var storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    var tasksData = storedTasks.split(',');
    tasksArray = tasksData.map(function(task) {
      var taskParts = task.split('|');
      return {
        name: taskParts[0],
        description: taskParts[1],
        date: taskParts[2],
        time: taskParts[3]
      };
    });
    displayTasks(); // Display stored tasks
  } else {
    document.getElementById('goodMorningCard').style.display = 'block'; // Show "Good Morning" card
    document.getElementById('taskListCard').style.display = 'none'; // Hide task list card
  }