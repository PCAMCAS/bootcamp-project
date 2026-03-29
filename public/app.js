const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskTagInput = document.getElementById("task-tag")
const taskDescriptionInput = document.getElementById("task-description")
const taskStartInput = document.getElementById("task-start")
const taskEndInput = document.getElementById("task-end")
const taskPriorityInput = document.getElementById("task-priority")

const searchInput = document.getElementById("search-input")
const taskList = document.getElementById("task-list")
const emptyMessage = document.getElementById("empty-message")

const totalTasks = document.getElementById("total-tasks")
const completedTasks = document.getElementById("completed-tasks")
const pendingTasks = document.getElementById("pending-tasks")
const progressText = document.getElementById("progress-text")
const progressFill = document.getElementById("progress-fill")

const statusFilter = document.getElementById("status-filter")
const tagFilter = document.getElementById("tag-filter")
const tagList = document.getElementById("tag-list")

const completeAllBtn = document.getElementById("complete-all-btn")
const clearCompletedBtn = document.getElementById("clear-completed-btn")
const themeToggleBtn = document.getElementById("theme-toggle")

const taskTemplate = document.getElementById("task-template")

const editTaskModal = document.getElementById("edit-task-modal")
const editTaskForm = document.getElementById("edit-task-form")
const editTaskTitleInput = document.getElementById("edit-task-title")
const editTaskDescriptionInput = document.getElementById("edit-task-description")
const editTaskCancelBtn = document.getElementById("edit-task-cancel")
const editTaskModalPanel = document.getElementById("edit-task-modal-panel")

const confirmModal = document.getElementById("confirm-modal")
const confirmModalMessage = document.getElementById("confirm-modal-message")
const confirmModalConfirmBtn = document.getElementById("confirm-modal-confirm")
const confirmModalCancelBtn = document.getElementById("confirm-modal-cancel")
const confirmModalPanel = document.getElementById("confirm-modal-panel")

const LOCAL_API_URL = "http://localhost:3000/api/v1/tasks"
const PRODUCTION_API_URL = "/api/v1/tasks"

function isLocalEnvironment() {
  const hostname = window.location.hostname

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0"
  )
}

const API_URL = isLocalEnvironment() ? LOCAL_API_URL : PRODUCTION_API_URL

let tasks = []
let editingTaskId = null
let confirmModalAction = null
let isLoading = false
let errorMessage = ""

/* =========================
   API
========================= */

async function fetchTasks() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || "No se pudieron cargar las tareas.")
  }

  return response.json()
}

async function createTaskRequest(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo crear la tarea.")
  }

  return data
}

async function updateTaskRequest(taskId, updates) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo actualizar la tarea.")
  }

  return data
}

async function deleteTaskRequest(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE"
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || "No se pudo eliminar la tarea.")
  }
}

async function syncTasksFromApi() {
  try {
    isLoading = true
    errorMessage = ""
    renderTasks()

    tasks = await fetchTasks()
  } catch (error) {
    errorMessage = error.message
  } finally {
    isLoading = false
    updateTagFilterOptions()
    renderTasks()
  }
}

/* =========================
   Tema
========================= */

function saveTheme(theme) {
  localStorage.setItem("theme", theme)
}

function updateThemeToggleButton() {
  const isDark = document.body.classList.contains("dark")
  const iconSpan = themeToggleBtn.querySelector("span[aria-hidden='true']")
  const textSpan = themeToggleBtn.querySelector("span:not([aria-hidden='true'])")

  if (iconSpan) {
    iconSpan.textContent = isDark ? "☀️" : "🌙"
  }

  if (textSpan) {
    textSpan.textContent = isDark ? "Modo claro" : "Modo oscuro"
  }

  themeToggleBtn.setAttribute(
    "aria-label",
    isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  )
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  } else {
    document.body.classList.remove("dark")
  }

  updateThemeToggleButton()
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark")

  if (isDark) {
    saveTheme("dark")
  } else {
    saveTheme("light")
  }

  updateThemeToggleButton()
}

/* =========================
   Helpers
========================= */

function normalizeTag(tag) {
  return tag.trim().toLowerCase()
}

function formatTag(tag) {
  if (!tag) return ""

  const normalized = normalizeTag(tag)
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

function formatDateTime(value) {
  if (!value) return ""

  const date = new Date(value)

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date)
}

function normalizePriority(priority) {
  if (priority === "baja" || priority === "media" || priority === "alta") {
    return priority
  }

  return "media"
}

function getPriorityMeta(priority) {
  const normalizedPriority = normalizePriority(priority)

  if (normalizedPriority === "alta") {
    return {
      label: "Prioridad alta",
      className: "inline-block self-start rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100"
    }
  }

  if (normalizedPriority === "baja") {
    return {
      label: "Prioridad baja",
      className: "inline-block self-start rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
    }
  }

  return {
    label: "Prioridad media",
    className: "inline-block self-start rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-100"
  }
}

async function createTask(title, description = "", tag = "", startAt = "", endAt = "", priority = "media") {
  const trimmedTitle = title.trim()
  const trimmedDescription = description.trim()
  const normalizedTag = normalizeTag(tag)
  const normalizedPriority = normalizePriority(priority)

  const newTask = await createTaskRequest({
    title: trimmedTitle,
    description: trimmedDescription,
    tag: normalizedTag,
    startAt,
    endAt,
    priority: normalizedPriority,
    completed: false
  })

  tasks.push(newTask)
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

function getTaskTimingStatus(task) {
  if (task.completed) {
    return {
      text: "Completada",
      className: "status-completed"
    }
  }

  const now = new Date()
  const startDate = task.startAt ? new Date(task.startAt) : null
  const endDate = task.endAt ? new Date(task.endAt) : null

  if (endDate && endDate < now) {
    return {
      text: "Vencida",
      className: "status-overdue"
    }
  }

  if (startDate && startDate > now) {
    return {
      text: "Próxima",
      className: "status-upcoming"
    }
  }

  if (startDate || endDate) {
    return {
      text: "Programada",
      className: "status-scheduled"
    }
  }

  return null
}

function buildScheduleText(task) {
  const hasStart = task.startAt !== ""
  const hasEnd = task.endAt !== ""

  if (!hasStart && !hasEnd) return ""

  if (hasStart && hasEnd) {
    return `🗓 Inicio: ${formatDateTime(task.startAt)} · Fin: ${formatDateTime(task.endAt)}`
  }

  if (hasStart) {
    return `🗓 Inicio: ${formatDateTime(task.startAt)}`
  }

  return `🗓 Fin: ${formatDateTime(task.endAt)}`
}

function sortTasksForDisplay(taskArray) {
  return [...taskArray].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed - b.completed
    }

    const aStart = a.startAt ? new Date(a.startAt).getTime() : Number.MAX_SAFE_INTEGER
    const bStart = b.startAt ? new Date(b.startAt).getTime() : Number.MAX_SAFE_INTEGER

    if (aStart !== bStart) {
      return aStart - bStart
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  return sortTasksForDisplay(filteredTasks)
}

function getEmptyMessage() {
  if (isLoading) {
    return "Cargando tareas..."
  }

  if (errorMessage) {
    return `Error: ${errorMessage}`
  }

  if (tasks.length === 0) {
    return "📋 Empieza añadiendo tu primera tarea."
  }

  if (searchInput.value.trim() !== "" || statusFilter.value !== "all" || tagFilter.value !== "all") {
    return "🔍 No hay tareas que coincidan con los filtros actuales."
  }

  return "🎉 No hay tareas para mostrar."
}

function syncModalBodyScroll() {
  const editOpen = !editTaskModal.hasAttribute("hidden")
  const confirmOpen = !confirmModal.hasAttribute("hidden")
  document.body.style.overflow = editOpen || confirmOpen ? "hidden" : ""
}

function openEditTaskModal(taskId) {
  const task = tasks.find(item => item.id === taskId)

  if (!task) return

  editingTaskId = taskId
  editTaskTitleInput.value = task.title
  editTaskDescriptionInput.value = task.description ?? ""
  editTaskModal.removeAttribute("hidden")
  syncModalBodyScroll()
  editTaskTitleInput.focus()
  editTaskTitleInput.select()
}

function closeEditTaskModal() {
  editingTaskId = null
  editTaskModal.setAttribute("hidden", "")
  editTaskForm.reset()
  syncModalBodyScroll()
}

function openConfirmModal(message, onConfirm) {
  confirmModalMessage.textContent = message
  confirmModalAction = onConfirm
  confirmModal.removeAttribute("hidden")
  syncModalBodyScroll()
  confirmModalConfirmBtn.focus()
}

function closeConfirmModal() {
  confirmModalAction = null
  confirmModal.setAttribute("hidden", "")
  syncModalBodyScroll()
}

async function saveEditTaskFromModal() {
  if (!editingTaskId) return

  const task = tasks.find(item => item.id === editingTaskId)

  if (!task) {
    closeEditTaskModal()
    return
  }

  const trimmedTitle = editTaskTitleInput.value.trim()

  if (trimmedTitle === "") {
    editTaskTitleInput.focus()
    return
  }

  try {
    const updatedTask = await updateTaskRequest(editingTaskId, {
      title: trimmedTitle,
      description: editTaskDescriptionInput.value.trim()
    })

    const index = tasks.findIndex(item => item.id === editingTaskId)

    if (index !== -1) {
      tasks[index] = updatedTask
    }

    closeEditTaskModal()
    renderTasks()
  } catch (error) {
    errorMessage = error.message
    renderTasks()
  }
}

function editTask(taskId) {
  openEditTaskModal(taskId)
}

async function completeAllTasks() {
  if (tasks.length === 0) return

  try {
    for (const task of tasks) {
      if (!task.completed) {
        await updateTaskRequest(task.id, { completed: true })
      }
    }

    await syncTasksFromApi()
  } catch (error) {
    errorMessage = error.message
    renderTasks()
  }
}

function clearCompletedTasks() {
  const completedCount = tasks.filter(task => task.completed).length

  if (completedCount === 0) return

  openConfirmModal("¿Seguro que quieres borrar todas las tareas completadas?", async () => {
    try {
      const completedTasksList = tasks.filter(task => task.completed)

      for (const task of completedTasksList) {
        await deleteTaskRequest(task.id)
      }

      await syncTasksFromApi()
    } catch (error) {
      errorMessage = error.message
      renderTasks()
    }
  })
}

function deleteTask(taskId) {
  openConfirmModal("¿Seguro que quieres eliminar esta tarea?", async () => {
    try {
      await deleteTaskRequest(taskId)
      tasks = tasks.filter(task => task.id !== taskId)
      updateTagFilterOptions()
      renderTasks()
    } catch (error) {
      errorMessage = error.message
      renderTasks()
    }
  })
}

function updateStats() {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  totalTasks.textContent = total
  completedTasks.textContent = completed
  pendingTasks.textContent = pending
  progressText.textContent = `${completionPercentage}%`
  progressFill.style.width = `${completionPercentage}%`

  const progressContainer = progressFill.parentElement

  if (progressContainer) {
    progressContainer.setAttribute("aria-valuenow", String(completionPercentage))
  }

  document.title = pending > 0 ? `TaskFlow (${pending} pendientes)` : "TaskFlow"
}

function filtrarTareasCompletadas(tareas) {
  return tareas.filter(task => task.completed)
}

function filtrarTareasPendientes(tareas) {
  return tareas.filter(task => !task.completed)
}

function filtrarTareasPorTag(tareas, tag) {
  return tareas.filter(task => task.tag === tag)
}

function filtrarTareasPorTitulo(tareas, titulo) {
  return tareas.filter(task => task.title.toLowerCase().includes(titulo.toLowerCase()))
}

function filtrarTareasPorFechaInicio(tareas, fechaInicio) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio))
}

function filtrarTareasPorFechaFin(tareas, fechaFin) {
  return tareas.filter(task => task.endAt && new Date(task.endAt) <= new Date(fechaFin))
}

function filtrarTareasPorFecha(tareas, fecha) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) <= new Date(fecha) && task.endAt && new Date(task.endAt) >= new Date(fecha))
}

function filtrarTareasPorRangoDeFechas(tareas, fechaInicio, fechaFin) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio) && task.endAt && new Date(task.endAt) <= new Date(fechaFin))
}

function filtrarTareasPorRangoDeFechasYTag(tareas, fechaInicio, fechaFin, tag) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio) && task.endAt && new Date(task.endAt) <= new Date(fechaFin) && task.tag === tag)
}

function filtrarTareasPorRangoDeFechasYTitulo(tareas, fechaInicio, fechaFin, titulo) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio) && task.endAt && new Date(task.endAt) <= new Date(fechaFin) && task.title.toLowerCase().includes(titulo.toLowerCase()))
}

function filtrarTareasPorRangoDeFechasYTagYTitulo(tareas, fechaInicio, fechaFin, tag, titulo) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio) && task.endAt && new Date(task.endAt) <= new Date(fechaFin) && task.tag === tag && task.title.toLowerCase().includes(titulo.toLowerCase()))
}

function filtrarTareasPorRangoDeFechasYTagYTituloYCompletadas(tareas, fechaInicio, fechaFin, tag, titulo) {
  return tareas.filter(task => task.startAt && new Date(task.startAt) >= new Date(fechaInicio) && task.endAt && new Date(task.endAt) <= new Date(fechaFin) && task.tag === tag && task.title.toLowerCase().includes(titulo.toLowerCase()) && task.completed)
}

function renderTasks() {
  taskList.innerHTML = ""

  if (isLoading) {
    emptyMessage.textContent = "Cargando tareas..."
    emptyMessage.style.display = "block"
    updateStats()
    renderTagList()
    return
  }

  if (errorMessage) {
    emptyMessage.textContent = `Error: ${errorMessage}`
    emptyMessage.style.display = "block"
    updateStats()
    renderTagList()
    return
  }

  const filteredTasks = getFilteredTasks()

  emptyMessage.textContent = getEmptyMessage()
  emptyMessage.style.display = filteredTasks.length === 0 ? "block" : "none"

  filteredTasks.forEach(task => {
    const clone = taskTemplate.content.cloneNode(true)

    const taskItem = clone.querySelector(".task-item")
    const checkbox = clone.querySelector(".task-checkbox")
    const title = clone.querySelector(".task-title")
    const description = clone.querySelector(".task-description")
    const tag = clone.querySelector(".task-tag")
    const priority = clone.querySelector(".task-priority")
    const schedule = clone.querySelector(".task-schedule")
    const statusBadge = clone.querySelector(".task-status-badge")
    const editBtn = clone.querySelector(".edit-task")
    const deleteBtn = clone.querySelector(".delete-task")

    title.textContent = task.title

    if (task.description) {
      description.textContent = task.description
      description.className = "task-description text-sm text-slate-600 dark:text-slate-300"
    } else {
      description.textContent = ""
      description.className = "task-description hidden"
    }

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

    const priorityMeta = getPriorityMeta(task.priority)
    priority.textContent = priorityMeta.label
    priority.className = `task-priority ${priorityMeta.className}`

    const scheduleText = buildScheduleText(task)

    if (scheduleText) {
      schedule.textContent = scheduleText
      schedule.classList.remove("hidden")
    } else {
      schedule.textContent = ""
      schedule.classList.add("hidden")
    }

    const timingStatus = getTaskTimingStatus(task)

    if (timingStatus) {
      statusBadge.textContent = timingStatus.text
      statusBadge.className = `task-status-badge ${timingStatus.className}`
    } else {
      statusBadge.textContent = ""
      statusBadge.className = "task-status-badge hidden"
    }

    if (timingStatus && timingStatus.className === "status-overdue") {
      taskItem.classList.add("overdue")
    }

    checkbox.addEventListener("change", async () => {
      try {
        const updatedTask = await updateTaskRequest(task.id, {
          completed: checkbox.checked
        })

        const index = tasks.findIndex(item => item.id === task.id)

        if (index !== -1) {
          tasks[index] = updatedTask
        }

        renderTasks()
      } catch (error) {
        errorMessage = error.message
        checkbox.checked = !checkbox.checked
        renderTasks()
      }
    })

    editBtn.addEventListener("click", () => {
      editTask(task.id)
    })

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id)
    })

    taskList.appendChild(clone)
  })

  updateStats()
  renderTagList()
}

taskForm.addEventListener("submit", async function (e) {
  e.preventDefault()

  const title = taskInput.value.trim()
  const description = taskDescriptionInput.value.trim()
  const tag = taskTagInput.value.trim()
  const startAt = taskStartInput.value
  const endAt = taskEndInput.value
  const priority = taskPriorityInput.value

  if (title === "") return

  if (startAt && endAt && new Date(endAt) < new Date(startAt)) {
    alert("La fecha de fin no puede ser anterior a la fecha de inicio.")
    return
  }

  try {
    isLoading = true
    errorMessage = ""
    renderTasks()

    await createTask(title, description, tag, startAt, endAt, priority)

    taskInput.value = ""
    taskDescriptionInput.value = ""
    taskTagInput.value = ""
    taskStartInput.value = ""
    taskEndInput.value = ""
    taskPriorityInput.value = "media"
  } catch (error) {
    errorMessage = error.message
    renderTasks()
  } finally {
    isLoading = false
    renderTasks()
  }
})

statusFilter.addEventListener("change", renderTasks)
tagFilter.addEventListener("change", renderTasks)
searchInput.addEventListener("input", renderTasks)

completeAllBtn.addEventListener("click", completeAllTasks)
clearCompletedBtn.addEventListener("click", clearCompletedTasks)
themeToggleBtn.addEventListener("click", toggleTheme)

editTaskForm.addEventListener("submit", async function (e) {
  e.preventDefault()
  await saveEditTaskFromModal()
})

editTaskCancelBtn.addEventListener("click", closeEditTaskModal)
editTaskModalPanel.addEventListener("click", e => e.stopPropagation())
editTaskModal.addEventListener("click", closeEditTaskModal)

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return

  if (!confirmModal.hasAttribute("hidden")) {
    closeConfirmModal()
    return
  }

  if (!editTaskModal.hasAttribute("hidden")) {
    closeEditTaskModal()
  }
})

confirmModalConfirmBtn.addEventListener("click", () => {
  if (typeof confirmModalAction === "function") {
    confirmModalAction()
  }

  closeConfirmModal()
})

confirmModalCancelBtn.addEventListener("click", closeConfirmModal)
confirmModalPanel.addEventListener("click", e => e.stopPropagation())
confirmModal.addEventListener("click", closeConfirmModal)

loadTheme()
syncTasksFromApi()