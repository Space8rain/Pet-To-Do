let patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    addButton = document.querySelector('.btn_add'),
    input = document.querySelector('.input');

  function createNewTask (taskText) {
  let cloneTemp = temp.content.querySelector('.task').cloneNode(true);
  cloneTemp.querySelector('.task_text').textContent = taskText;
  cloneTemp.querySelector('.task_del').addEventListener('click', (evt) => {
    console.log(evt.target);
  })
  return cloneTemp
  };

  function addTask() {
    container.prepend(createNewTask(input.value));
    input.value = '';
    tasksCheker ();
  };

  function tasksCheker () {
    patch.style.display = !container.childElementCount ? 'block' : 'none'
  };

  addButton.addEventListener('click', addTask)
  tasksCheker ()

  