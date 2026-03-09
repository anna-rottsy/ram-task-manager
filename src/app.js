const input = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()

function addTask() {

  const taskText = input.value.trim()

  if (taskText === "") return

  const task = {
    text: taskText,
    completed: false
  }

  tasks.push(task)

  saveTasks()
  renderTasks()

  input.value = ""
}

function renderTasks() {

  taskList.innerHTML = ""

  tasks.forEach((task, index) => {

    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = task.text

    if (task.completed) {
      span.classList.add("completed")
    }

    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed
      saveTasks()
      renderTasks()
    }

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    deleteBtn.onclick = () => {
      tasks.splice(index, 1)
      saveTasks()
      renderTasks()
    }

    li.appendChild(span)
    li.appendChild(deleteBtn)

    taskList.appendChild(li)

  })

}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask()
  }
})

function clearCompleted() {

  tasks = tasks.filter(task => !task.completed)

  saveTasks()
  renderTasks()

}
