let temp = document.querySelector('.template_task'),
    container = document.querySelector('.tasks'),
    addButton = document.querySelector('.btn_add'),
    input = document.querySelector('.input');

  const createNewTask = (taskText) => {
  let cloneTemp = temp.content.querySelector('.task').cloneNode(true);
  cloneTemp.querySelector('.task_text').textContent = taskText;
  return cloneTemp
  };

  addButton.addEventListener('click', (evt) => {
    container.prepend(createNewTask(input.value));
    console.log(createNewTask(input.value));
  })

  console.log(temp);