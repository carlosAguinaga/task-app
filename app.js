document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(evento) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;


  const task = {
    title, //title: title,
    description, //description : description
    id: new Date().valueOf().toString()
  };

  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset()
  evento.preventDefault();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");

  tasksView.innerHTML = "";

  tasks.forEach((task) => {
    tasksView.innerHTML += `<div class="card mb-3">
      <div class="card-body">
        <p>${task.title} - ${task.description}</p>
        <a class="btn btn-danger" onclick="deleteTask('${task.id}')">Delete</a>
      </div>
    </div>`;
  });
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")); 
  tasks = tasks.filter( (task => task.id == id?  false : true ) )
  localStorage.setItem('tasks', JSON.stringify(tasks))
  getTasks()
}

getTasks();
