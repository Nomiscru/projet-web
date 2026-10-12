# projet-web
-------Itération 1--------

---Tâche : 1.1 : Page Accueil---
Créer la structure HTML de la page d’accueil dans un fichier "index.html".
Voir la maquette d’écran (Page d’accueil - version avec affichage en liste)
Ne pas s’occuper de récupérer la liste des apprenants du fichier JSON pour l’instant. Renseigner des données de type Lorem.
Intégrer le logo ENI.
Ajouter un menu avec 4 liens : "Accueil", "Préférences", "Carte", "Informations". Les 3 derniers liens pointeront pour l’instant sur une page qui ne contiendra qu’un titre.
Positionner par défaut le type d’affichage à "Liste".

---Tâche : 1.2 : Page Informations---
Créer la page "Informations".
Voir la maquette d’écran (Page "Informations").
Vous avez la liberté du contenu.
Dans le cadre "Liens utiles", ajouter quelques liens de sites utiles pour apprendre le développement informatique.

---Tâche : 1.3 : Page Préférences---
Créer la page "Préférences".
Voir la maquette d’écran (Page "Préférences").
Dans cette page, il faudra intégrer un formulaire pour paramétrer les préférences du site :
Le thème : clair ou sombre (clair par défaut)
Le format d’affichage de la liste des apprenants dans la page d’accueil : liste ou cartes (liste par défaut)
L’ensemble de ces préférences devra être stocké dans le "LocalStorage" quand on clique sur le bouton "Enregistrer".
A chaque nouvel affichage de la page "Préférences", les données du LocalStorage devront être proposées.

---Tâche : 1.4 : Fichier JSON---
Créer le fichier JSON ("promo.json") qui contiendra la liste des apprenants de la promo. Ce fichier sera stocké à la racine du projet.
Pour chaque apprenant, on aura les données suivantes :
Un identifiant unique
Le nom
Le prénom
La ville du domicile
Une ou plusieurs anecdotes sur l’apprenant
Le nom d’un fichier image pour l’avatar (optionnel)
Les coordonnées géographiques (optionnelles)
La latitude
La longitude
Vous n’êtes pas obligé bien sûr de renseigner les coordonnées géographiques exactes. Pointer sur la rue de la mairie ou la place de l’église suffira 😅

Un fichier exemple du fichier JSON vous est fourni.

---Tâche : 1.5 : Page Accueil---
Maintenant que le fichier JSON est créé, mettre en place sa lecture pour afficher la liste des apprenants dans la page d’accueil, en format liste.
Conseil : Utiliser l’instruction fetch en Javascript.

---Tâche : 1.6 : Page Accueil---
Lire les préférences dans le LocalStorage pour positionner la valeur par défaut de la zone "Type d’affichage" et changer la présentation de la liste des apprenants (en liste ou en cartes).
L’utilisateur pourra modifier ponctuellement le type d’affichage en cliquant sur l’option "Type d’affichage".
Voir la maquette d’écran (Page d’accueil - version avec affichage avec des cartes)

---Tâche : 1.7 : Préférences---
Lire les préférences dans le LocalStorage pour changer dynamiquement le thème (clair ou sombre) dans chacune des pages du site.