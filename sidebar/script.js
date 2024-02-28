const body = document.querySelector("body"),
       sidebar = body.querySelector(".sidebar"),
       toggle = body.querySelector(".toggle"),
       searchBox = body.querySelector(".search-box"),
       modeSwitch = body.querySelector(".toggle-switch"),
       modeText = body.querySelector(".mode-text");


       toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
       });


       modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
       });

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    if (inputBox.value === '') {
        alert("You must write something");
    } 
    
    else {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const label = document.createElement("label");
        label.appendChild(checkbox);
        const textNode = document.createTextNode(inputBox.value);
        const span = document.createElement("span");
        span.appendChild(textNode);

        label.appendChild(span);
        li.appendChild(label);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function() {
            li.remove();
        };
        li.appendChild(deleteButton);

        listContainer.appendChild(li);

        inputBox.value = '';
    }
}







       
