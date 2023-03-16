const mianToDo = document.querySelector('.main'),
      checkBoxTheme = document.querySelector('.switch_theme'),
      patch = document.querySelector('.patch'),
      temp = document.querySelector('.template_task'),
      container = document.querySelector('.tasks'),
      form = document.querySelector('.create_new_task'),
      input = document.querySelector('.input');

// Проверяем сохранен ли статус темы в хранилище и устанавливаем атрибут и значение переключателя
(function isTheme() {
  checkBoxTheme.checked = JSON.parse(localStorage.getItem('theme'));
  mianToDo.setAttribute('data-theme',
  localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : false);
})()

// Переключатель темы с сохранеием статуса в хранилище
function handleTheme () {
  if (this.checked) {
    mianToDo.setAttribute('data-theme', 'true');
  } else {
    mianToDo.setAttribute('data-theme', 'false');
  };
  localStorage.setItem('theme', checkBoxTheme.checked);
};

// Если в хранилище есть задачи записываем в массив, если нет, то создаем пустой
let todoList = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

// Если массив не пустой удаляем заплатку и добавляем в разметку задачи
if (todoList.length) {
  tasksCheker ()
  todoList.forEach(task => {
    container.insertAdjacentHTML('beforeend', createNewTask(task))
  })
};

// Перезаписываем массив задач в хранилище
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(todoList));
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
function validateInput () {
  if (input.value.length === 0) {
    input.classList.add('error');
    form.querySelector('.error_message').style.display = 'block';
    throw Error('Empty input');
  }
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
  validateInput();

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
  saveTasks();

  // Добавляем задачу в разметку
  container.insertAdjacentHTML('beforeend', createNewTask(newTask));

  input.value = '';
  input.focus();
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
  taskText.classList.toggle('task_text__done');
  // Находим ИД задачи на которой поймали событие и задачу из массива и этим ИД
  const id = parentNode.id;
  const task = todoList.find((task) => task.id == id);
  
  // Меняем значение статуса задачи
  task.done = !task.done;

  // Перезаписываем массив задач в хранилище
  saveTasks();
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
  saveTasks();

  // Удаляем задачу из разметки
  parentNode.remove();
  tasksCheker ();
};

// Слушатель на ввод в инпут и сброс ошибок
input.addEventListener('input', resetError)
// Слушатель на добавление задачи
form.addEventListener('submit', addTask);
// Слушатель на удаление задачи
container.addEventListener('click', delTask);
// Слушатель на выполненые задачи
container.addEventListener('click', doneTask);
// Слушатель на переключение темы
checkBoxTheme.addEventListener('change', handleTheme);

// Добавляем бибиотеку с Drag and Drop
new Sortable(container, {
  animation: 300,
  handle: '.btn_drag',
  ghostClass: 'ghost',
  store: {
    // get: function () {
    //   return JSON.parse(localStorage.getItem('tasks'))
    //   // return localStorage.getItem('tasks')
    //   // ? JSON.parse(localStorage.getItem('tasks'))
    //   // : [];;
    //   },

    // Пересохраняем массив с новым порядком
    set: () => {
      const arrTasks = container.children
      const newArray = [];
      
      for (task of arrTasks) {
        const newTask = {
          id: task.id,
          text: task.children[1].textContent,
          done: task.children[0].children[1].checked,
        };
        newArray.push(newTask);
      }
      todoList = newArray;
      localStorage.setItem('tasks', JSON.stringify(todoList));
    }
  },
});