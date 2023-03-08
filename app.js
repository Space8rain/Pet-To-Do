const patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    form = document.querySelector('.create_new_task'),
    input = document.querySelector('.input');

// Если в хранилище есть задачи записываем в массив, если нет, то создаем пустой
const todoList = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

// Если массив не пустой удаляем заплатку и добавляем в разметку задачи
if (todoList.length) {
  tasksCheker ()
  todoList.forEach(task => {
    container.insertAdjacentHTML('beforeend', createNewTask(task))
  })
};

// Создание разметки новой задачи
function createNewTask (data) {
  const taskHtml = `
  <li id="${data.id}" class="task">
    <div class="action">
      <img src="./images/icon_drag.svg" alt="icon drag task"
      class="btn_drag">
      <input type="checkbox" class="btn_task-done" ${data.done ? 'checked' : ''}>
    </div>
    <p class="task_text ${data.done ? 'task_text__done' : ''}">${data.text}</p>
    <img src="./images/icon_task_del.svg" alt="icon delete task" class="btn_task-del">
  </li>`;

  return taskHtml
};

// Отрисовка заплатки в зависимости от наличия задачи
function tasksCheker () {
  // patch.style.display = !container.childElementCount ? 'block' : 'none'
  patch.style.display = todoList.length ? 'none' : 'block'
};

// Проверяем заполнен ли input, если нет, то отображаем сообщение об ошибке
function validate () {
  if (input.value.length == 0) {
    input.classList.add('error');
    form.querySelector('.error_message').style.display = 'block';
    return
  };
};

// Сброс стилей ошибок
function resetError () {
  input.classList.remove('error');
  form.querySelector('.error_message').style.display = 'none';
};

// Добавляем задачу в разметку и массив задач для последующего сохранения в локальном хранилище
function addTask(event) {
  event.preventDefault();

// Проверяем заполнен ли input
  validate();

// Убираем отображение ошибок
  resetError();

  // Объект задачи для добавления в массив
  const newTask = {
    id: Date.now(),
    text: input.value,
    done: false,
  };

  // Добавляем задачу в массив
  todoList.push(newTask);

    // Перезаписываем массив задач в хранилище
  localStorage.setItem('tasks', JSON.stringify(todoList));

  // Добавляем задачу в разметку
  container.insertAdjacentHTML('beforeend', createNewTask(newTask));

  input.value = '';
  tasksCheker ();
};

// Меняем статус задачи
function doneTask(event) {
  resetError();
  const btnDone = event.target.closest('.btn_task-done');
  if (!btnDone) return;

  // Находим задачу на которой поймали событие
  const parentNode = btnDone.closest('.task');

  const taskText = parentNode.querySelector('.task_text');
  taskText.classList.toggle('task_text__done')
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
  resetError();
  const btnDel = event.target.closest('.btn_task-del');
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