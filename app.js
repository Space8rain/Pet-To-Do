const patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    form = document.querySelector('.create_new_task'),
    input = document.querySelector('.input');

// Массив с задачами для локального хранилища
const todoList = [];



// Создание разметки новой задачи
function createNewTask (data) {
  const taskHtml = `
  <li id="${data.id}" class="task">
    <div class="action">
      <img src="./images/icon_drag.svg" alt="icon drag task"
      class="btn_drag">
      <input type="checkbox" class="task_done" ${data.done ? 'checked' : ''}>
    </div>
    <p class="task_text">${data.text}</p>
    <img src="./images/icon_task_del.svg" alt="icon delete task" class="task_del">
  </li>`;

  return taskHtml
};

// Отрисовка заплатки в зависимости от наличия задачи
function tasksCheker () {
  patch.style.display = !container.childElementCount ? 'block' : 'none'
};

// Добавляем задачу в разметку и массив задач для последующего сохранения в локальном хранилище
function addTask(event) {
  event.preventDefault();

  // Объект задачи для добавления в массив
  const newTask = {
    id: Date.now(),
    text: input.value,
    done: false,
  };

  // Добавляем задачу в массив
  todoList.push(newTask);

    // Перезаписываем массив задач в хранилище
  localStorage.setItem('tasks', JSON.stringify(todoList))

  // Добавляем задачу в разметку
  container.insertAdjacentHTML('beforeend', createNewTask(newTask));

  input.value = '';
  tasksCheker ();
};

// Отмечаем выполненую задачу
function doneTask(event) {
  const btnDone = event.target.closest('.task_done');
  if (!btnDone) return;

  // Находим задачу на которой поймали событие
  const parentNode = btnDone.closest('.task');
  // Находим ИД задачи на которой поймали событие и задачу из массива и этим ИД
  const id = parentNode.id;
  const task = todoList.find((task) => task.id == id);
  
  // Меняем значение статуса задачи
  task.done = !task.done;
      // Перезаписываем массив задач в хранилище
  localStorage.setItem('tasks', JSON.stringify(todoList));
};

// Удаление задачи
function delTask(event) {
  const btnDel = event.target.closest('.task_del');
  if (!btnDel) return;

  // Находим задачу на которой поймали событие
  const parentNode = btnDel.parentElement;
  // Находим ИД задачи на которой поймали событие
  const id = parentNode.id;

  // Находим индекс задачи в массиве
  const index = todoList.findIndex((task) => task.id == id);

// Удаляем задачу из массива
  todoList.splice(index, 1);

  // Перезаписываем массив задач в хранилище
  localStorage.setItem('tasks', JSON.stringify(todoList))

  // Удаляем задачу из разметки
  parentNode.remove();
  tasksCheker ();
};

form.addEventListener('submit', addTask);
container.addEventListener('click', delTask);
container.addEventListener('click', doneTask);