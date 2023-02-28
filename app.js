const patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    addButton = document.querySelector('.btn_add'),
    input = document.querySelector('.input');

  function createNewTask (taskText) {
  let cloneTemp = temp.content.querySelector('.task').cloneNode(true);
  cloneTemp.querySelector('.task_text').textContent = taskText;
  return cloneTemp
  };

  function addTask() {
    container.prepend(createNewTask(input.value));
    input.value = '';
    tasksCheker ();
  };

  function delTask(evt) {
    const btn_del = evt.target.closest('.task_del');
    if (!btn_del) return;
    btn_del.parentElement.remove();
    tasksCheker ();
  }

  function tasksCheker () {
    patch.style.display = !container.childElementCount ? 'block' : 'none'
  };

  addButton.addEventListener('click', addTask)

  container.addEventListener('click', delTask)