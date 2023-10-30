const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function listTasks() {
  tasks.forEach((task, index) => {
    const statusColor = task.completed ? chalk.green : chalk.red;
    console.log(`${index + 1}. ${statusColor(task.description)} [${task.completed ? 'Completada' : 'Pendiente'}]`);
  });
}

function addTask() {
  rl.question('Ingrese una descripción para la nueva tarea: ', (description) => {
    tasks.push({ description, completed: false });
    console.log(chalk.green('Tarea agregada con éxito.'));
    listTasks();
    menu();
  });
}

function removeTask() {
  listTasks();
  rl.question('Ingrese el número de la tarea que desea eliminar: ', (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks.splice(taskIndex, 1);
      console.log(chalk.green('Tarea eliminada con éxito.'));
    } else {
      console.log(chalk.red('Número de tarea no válido.'));
    }
    listTasks();
    menu();
  });
}

function completeTask() {
  listTasks();
  rl.question('Ingrese el número de la tarea que desea marcar como completada: ', (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks[taskIndex].completed = true;
      console.log(chalk.green('Tarea marcada como completada con éxito.'));
    } else {
      console.log(chalk.red('Número de tarea no válido.'));
    }
    listTasks();
    menu();
  });
}

function menu() {
  console.log('\nSeleccione una opción:');
  console.log('1. Listar tareas');
  console.log('2. Agregar tarea');
  console.log('3. Eliminar tarea');
  console.log('4. Marcar tarea como completada');
  console.log('5. Salir');
  rl.question('Opción: ', (option) => {
    switch (option) {
      case '1':
        listTasks();
        menu();
        break;
      case '2':
        addTask();
        break;
      case '3':
        removeTask();
        break;
      case '4':
        completeTask();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log(chalk.red('Opción no válida. Por favor, seleccione una opción válida.'));
        menu();
    }
  });
}

menu();
