document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(evento) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;


  const task = {
    title, //title: title,
    description, //description : description
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
        <a class="btn btn-danger" onclick="deleteTask('${task.title}')">Delete</a>
      </div>
    </div>`;
  });
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks")); 
  tasks = tasks.filter( (task => task.title ==  title?  false : true ) )
  console.log(tasks)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  getTasks()
}

getTasks();
