import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let tasks: string[] = loadTasks();

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "Task Reminder" is now active.');

  let disposable = vscode.commands.registerCommand('task-reminder.showTasks', () => {
    // Code pour créer une fenêtre de création de tâches
    const panel = vscode.window.createWebviewPanel(
      'taskCreator',
      'Create Task',
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = getWebviewContent();

    panel.onDidDispose(() => {
      // Gestion de la fermeture de la fenêtre
    });

    panel.webview.onDidReceiveMessage(message => {
      if (message.command === 'createTask') {
        // Récupérez les données de la tâche depuis message.taskData et traitez-les
        const taskData = message.taskData;
        tasks.push(taskData);
        saveTasks(tasks);
        vscode.window.showInformationMessage(`Tâche créée : ${taskData}`);
        updateWebviewContent(panel);
      }
    });
  });

  context.subscriptions.push(disposable);
}

function loadTasks(): string[] {
  const config = vscode.workspace.getConfiguration('task-reminder');
  return config.get('tasks', []);
}

function saveTasks(taskList: string[]): Thenable<void> {
  const config = vscode.workspace.getConfiguration('task-reminder');
  return config.update('tasks', taskList, vscode.ConfigurationTarget.Global);
}

function updateWebviewContent(panel: vscode.WebviewPanel) {
  // Mettez à jour le contenu HTML de la fenêtre avec les tâches actuelles
  panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
  // Code HTML pour la fenêtre de création de tâches
  const taskListHtml = tasks.map(task => `<li>${task}</li>`).join('');
  return `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      <h2>Créer une tâche</h2>
      <input type="text" id="taskInput" placeholder="Description de la tâche">
      <button id="createTaskButton">Créer la tâche</button>
      <h2>Tâches existantes</h2>
      <ul>
        ${taskListHtml}
      </ul>

      <script>
        const vscode = acquireVsCodeApi();

        const createTaskButton = document.getElementById('createTaskButton');
        createTaskButton.addEventListener('click', () => {
          const taskInput = document.getElementById('taskInput');
          const taskData = taskInput.value;
          vscode.postMessage({
            command: 'createTask',
            taskData: taskData
          });
          taskInput.value = ''; // Efface le champ de saisie après la création de la tâche
        });
      </script>
    </body>
    </html>
  `;
}

export function deactivate() {
  // Code de nettoyage ici
}
