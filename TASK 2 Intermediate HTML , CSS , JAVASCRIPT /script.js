// Contact Form Validation
    document.getElementById("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you for contacting us, " + name + "!");
      document.getElementById("contactForm").reset();
    });

    // To-Do List Functionality
    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();

      if (!taskText) {
        alert("Please enter a task.");
        return;
      }

      const taskDiv = document.createElement("div");
      taskDiv.className = "todo-item";
      const taskContent = document.createElement("span");
      taskContent.textContent = taskText;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn";
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        taskDiv.remove();
      };

      taskDiv.appendChild(taskContent);
      taskDiv.appendChild(deleteButton);

      document.getElementById("todoList").appendChild(taskDiv);
      taskInput.value = "";
    }
