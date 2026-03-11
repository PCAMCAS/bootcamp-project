const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskTagInput = document.getElementById("task-tag")
const searchInput = document.getElementById("search-input")
const taskList = document.getElementById("task-list")
const emptyMessage = document.getElementById("empty-message")

const totalTasks = document.getElementById("total-tasks")
const completedTasks = document.getElementById("completed-tasks")
const pendingTasks = document.getElementById("pending-tasks")

const statusFilter = document.getElementById("status-filter")
const tagFilter = document.getElementById("tag-filter")
const tagList = document.getElementById("tag-list")

const completeAllBtn = document.getElementById("complete-all-btn")
const clearCompletedBtn = document.getElementById("clear-completed-btn")

const taskTemplate = document.getElementById("task-template")

let tasks = []

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks")

  if (storedTasks) {
    tasks = JSON.parse(storedTasks)
  }
}

function normalizeTag(tag) {
  return tag.trim().toLowerCase()
}

function formatTag(tag) {
  if (!tag) return ""

  const normalized = normalizeTag(tag)
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

function createTask(title, tag = "") {
  const task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    tag: normalizeTag(tag)
  }

  tasks.push(task)
  saveTasks()
  updateTagFilterOptions()
  renderTasks()
}

function getUniqueTags() {
  const tags = tasks
    .map(task => task.tag)
    .filter(tag => tag !== "")

  return [...new Set(tags)].sort((a, b) => a.localeCompare(b))
}

function updateTagFilterOptions() {
  const uniqueTags = getUniqueTags()
  const currentValue = tagFilter.value

  tagFilter.innerHTML = '<option value="all">Todos los tags</option>'

  uniqueTags.forEach(tag => {
    const option = document.createElement("option")
    option.value = tag
    option.textContent = formatTag(tag)
    tagFilter.appendChild(option)
  })

  const valueStillExists =
    currentValue === "all" || uniqueTags.includes(currentValue)

  tagFilter.value = valueStillExists ? currentValue : "all"
}

function renderTagList() {
  const uniqueTags = getUniqueTags()

  tagList.innerHTML = ""

  if (uniqueTags.length === 0) {
    const li = document.createElement("li")
    li.textContent = "No hay tags todavía."
    tagList.appendChild(li)
    return
  }

  uniqueTags.forEach(tag => {
    const li = document.createElement("li")
    li.textContent = formatTag(tag)
    tagList.appendChild(li)
  })
}

function getFilteredTasks() {
  let filteredTasks = [...tasks]
  const searchValue = searchInput.value.trim().toLowerCase()

  if (statusFilter.value === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.completed)
  } else if (statusFilter.value === "completed") {
    filteredTasks = filteredTasks.filter(task => task.completed)
  }

  if (tagFilter.value !== "all") {
    filteredTasks = filteredTasks.filter(task => task.tag === tagFilter.value)
  }

  if (searchValue !== "") {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchValue)
    )
  }

  return filteredTasks
}

function editTask(taskId) {
  const task = tasks.find(item => item.id === taskId)

  if (!task) return

  const newTitle = prompt("Edita el título de la tarea:", task.title)

  if (newTitle === null) return

  const trimmedTitle = newTitle.trim()

  if (trimmedTitle === "") return

  task.title = trimmedTitle
  saveTasks()
  renderTasks()
}

function completeAllTasks() {
  if (tasks.length === 0) return

  tasks = tasks.map(task => ({
    ...task,
    completed: true
  }))

  saveTasks()
  renderTasks()
}

function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed)
  saveTasks()
  updateTagFilterOptions()
  renderTasks()
}

function renderTasks() {
  taskList.innerHTML = ""

  const filteredTasks = getFilteredTasks()

  emptyMessage.style.display = filteredTasks.length === 0 ? "block" : "none"

  filteredTasks.forEach(task => {
    const clone = taskTemplate.content.cloneNode(true)

    const taskItem = clone.querySelector(".task-item")
    const checkbox = clone.querySelector(".task-checkbox")
    const title = clone.querySelector(".task-title")
    const tag = clone.querySelector(".task-tag")
    const editBtn = clone.querySelector(".edit-task")
    const deleteBtn = clone.querySelector(".delete-task")

    title.textContent = task.title
    checkbox.checked = task.completed

    if (task.completed) {
      taskItem.classList.add("completed")
    }

    if (task.tag) {
      tag.textContent = formatTag(task.tag)
      tag.classList.remove("hidden")
    } else {
      tag.textContent = ""
      tag.classList.add("hidden")
    }

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
      renderTasks()
    })

    editBtn.addEventListener("click", () => {
      editTask(task.id)
    })

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      saveTasks()
      updateTagFilterOptions()
      renderTasks()
    })

    taskList.appendChild(clone)
  })

  updateStats()
  renderTagList()
}

function updateStats() {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed

  totalTasks.textContent = total
  completedTasks.textContent = completed
  pendingTasks.textContent = pending
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const title = taskInput.value.trim()
  const tag = taskTagInput.value.trim()

  if (title === "") return

  createTask(title, tag)

  taskInput.value = ""
  taskTagInput.value = ""
})

statusFilter.addEventListener("change", renderTasks)
tagFilter.addEventListener("change", renderTasks)
searchInput.addEventListener("input", renderTasks)

completeAllBtn.addEventListener("click", completeAllTasks)
clearCompletedBtn.addEventListener("click", clearCompletedTasks)

loadTasks()
updateTagFilterOptions()
renderTasks()