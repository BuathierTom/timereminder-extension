import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let timer: NodeJS.Timeout;

    const showNotification = () => {
        vscode.window.showInformationMessage("Es-tu toujours sur le code?", { modal: false }, "Oui", "Non")
            .then((choice) => {
                if (choice === "Oui") {
                    resetTimer();
                } else {
                    clearInterval(timer!);
                }
            });
    };


    const showAndClose = () => {
        showNotification();
        setTimeout(() => {
            vscode.window.showInformationMessage("Fermeture de VSCode...");
            setTimeout(() => {
                vscode.commands.executeCommand('workbench.action.closeWindow');
            }, 1000);
        }, 60000);
    };
    
    const time = 120000; // 30 minutes -- 1800000 ms // 2 minutes -- 120000 ms

    // on transforme le temps en minutes
    const timeInMinutes = time / 60000;

    const resetTimer = () => {
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(() => showAndClose(), time); 
    };

    // Initialisation du timer
    resetTimer();

    // Écoute des événements d'activité de l'utilisateur
    vscode.window.onDidChangeActiveTextEditor(() => resetTimer());
    vscode.window.onDidChangeTextEditorSelection(() => resetTimer());

    // Écoute de l'enregistrement d'un document
    vscode.workspace.onDidSaveTextDocument(() => resetTimer());

    // Ajoute une commande pour réinitialiser manuellement le timer
    let disposable = vscode.commands.registerCommand('timereminder.resetTimer', () => {
        resetTimer();
        vscode.window.showInformationMessage("Timer réinitialisé!");
    });

    let disposableStartCommand = vscode.commands.registerCommand('timereminder.start', () => {
        vscode.window.showInformationMessage("Démarrage du timer de " + timeInMinutes + " minutes");
    });

    context.subscriptions.push(disposable, disposableStartCommand);
}

export function deactivate() {}
