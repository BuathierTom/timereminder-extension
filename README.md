# Extension VSCode

## Extension développée (TimeReminder)

J'ai développé une petite extension VSCode qui s'appelle **timeReminder**. Cette extension permet à l'utilisateur lorsqu'il tape la commande `startTimer` de lancer un timer de 30 minutes et qui lui met une notification lorsque les 30 minutes sont écoulées qui demande à l'utilisateur s'il est encore sur son code. 

Il a alors le choix entre Oui ou Non, si il choisit :

- **Non**: alors VSCode se ferme
- **Oui**: alors la notification reviendra dans 30 minutes
- **Pas de réponse**: alors VSCode se fermera automatiquement au bout de 5 minutes

Vous avez aussi la possibilité de reset du timer quand il est lancer pour revenir à 0 grace à la commande `resetTimer`.


## **!!!** Important :

Pour que vous puissiez tester rapidement j'ai mis le temps d'attente pour la notification dans le programme à 2 minutes (lors de l'utilisation de la commande `startTimer`).

## Extension plus poussée (TaskReminder)

À la base je voulais faire une extension qui permet de créer des listes de tâches à faire directement dans VS Code. Cette extension aurait pu permettre :
- l'ajout de taches (avec des dates d'échéance); 
- La modification de la tâche (objet / date);
- La suppression de la tâche;
- Des notifications de rappel lorsque la date arrive à échéance
- Une fenêtre avec une liste de toutes les tâches créées

J'avais déjà pensé à ça mais j'ai rapidement vu que c'était très compliqué. Mais cette idée peut aller encore plus loin par exemple avec une personnalisation des notifications reçues, un sens de priorités dans les tâches ou même un système de marquage lié au code.

# Auteur

- Buathier Tom TP2 FI