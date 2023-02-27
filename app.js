let patch = document.querySelector('.patch'),
    temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    addButton = document.querySelector('.btn_add'),
    input = document.querySelector('.input');

  function createNewTask (taskText) {
  let cloneTemp = temp.content.querySelector('.task').cloneNode(true);
  cloneTemp.querySelector('.task_text').textContent = taskText;
  return cloneTemp
  };

  function tasksCheker () {
    patch.style.display = container.childElementCount < 1 ? 'block' : 'none'
  }

  addButton.addEventListener('click', (evt) => {
    container.prepend(createNewTask(input.value));
    console.log(createNewTask(input.value));
    input.value = ''
    tasksCheker ();
    console.log(container.childElementCount);
  })

  // setTimeout(() => {
  //   console.log(container.childElementCount);
  // }, 1000);
  tasksCheker ()