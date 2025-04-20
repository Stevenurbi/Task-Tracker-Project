#! /usr/bin/env node
const [,, command, ...args] = process.argv;
const fs = require('fs');
const path = require('path');

const TASK_FILE = path.join(__dirname, 'tasks.json');

function main(){
    initTaskFile();
    const [,, command, ...args] = process.argv;

    switch (command) {
        case 'add':
            if (args.length === 0) {
                console.log("Error: Description is required");
                process.exit(1);
            }
            const tasksList = readTasks();
            const newTask = {
                id: tasks.length +1,
                description: args.join(' '),
                status: 'todo',
                createdAt: new Date(). toISOString(),
                updatedAt: new Date(). toISOString()
            };
            tasks.push(newTask);
            writeTasks(tasks);
            console.log(`Task added: (ID: ${newTask.id})`); // Backticks SÍ interpolan            break;
        case 'list':
            const tasks = readTasks();
            if (tasks.length === 0) {
                console.log("No tasks found.");
                break;
            }
            console.log('ID Status     Description');
            console.log('----------------------------------');
            tasks.forEach(task => {
                console.log(`${task.id}  ${task.status.padEnd(10)}  ${task.description}`);
            })
            break;
            case 'updated':
            if (args.length < 2) {
                console.log("Error: need ID and new description");
                process.exit(1);
            }
            const taskId = parseInt(args[0]);
            const newDescription = args.slice(1).join(' ');

            const task = tasks.find(t => t.id === taskID);

            if(!task) {
                console.error(`Task ${taskId} not found`);
                process.exit(1);
            }
            task.description = newDescription;
            task.updatedAt = new Date().toISOString();
            writeTasks(tasks);
            console.log(`Task ${taskId} updated`);
            break;

        default:
            console.log("Usage: task-cli [add|list] [arguments]");
    }
// Function to initialize the task file if it doesn't exist
function initTaskFile() {
    if  (!fs.existsSync(TASK_FILE)) {
        fs.writeFileSync(TASK_FILE, '[]');
    }
}
// Function to read tasks from the file
function readTasks() {
    return JSON.parse(fs.readFileSync(TASK_FILE, 'utf-8'));
}
// Function to write tasks to the file
function writeTasks(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}


//manejo de errores 

function readTasks() {
    try {
        return JSON.parse(fs.readFileSync(TASK_FILE, 'utf-8'));
    } catch (error) {
        console.log("Error reading tasks:", error.message);
        process.exit(1);
    }
}
}
main();