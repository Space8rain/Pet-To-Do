const patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    form = document.querySelector('.create_new_task'),
    input = document.querySelector('.input');

  function createNewTask (taskText) {
  const taskHtml = `
  <li class="task">
    <div class="action">
      <img src="./images/icon_drag.svg" alt="icon drag task"
      class="btn_drag">
      <input type="checkbox" class="task_done">
    </div>
    <p class="task_text">${taskText}</p>
    <img src="./images/icon_task_del.svg" alt="icon delete task" class="task_del">
  </li>`

  return taskHtml
  };

  function tasksCheker () {
    patch.style.display = !container.childElementCount ? 'block' : 'none'
  };

  function addTask(event) {
    event.preventDefault()
    container.insertAdjacentHTML('beforeend', createNewTask(input.value));
    input.value = '';
    tasksCheker ();
  };

  function doneTask(event) {
    const btnDone = event.target.closest('.task_done')
    
  }

  function delTask(event) {
    const btnDel = event.target.closest('.task_del');
    if (!btnDel) return;
    btnDel.parentElement.remove();
    tasksCheker ();
  };

  form.addEventListener('submit', addTask)

  container.addEventListener('click', delTask)