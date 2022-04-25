# Introduction

Projet d'API pour gérer un refuge pour chats

- Utilisation de web NodeJs avec express pour la partie server/API
- HTML5+Bootstrap pour l'affichage et de JS pour l'appel à l'API
- Utilisation de MySql pour stocker et lire les données

## MYSQL

## Schema

Un chat a :

- un nom (obligatoire)
- un age (obligatoire)
- une description
- un lien vers une photo (fonctionnalité pas developée)

**Requête de création de la table chat**

```sql
CREATE DATABASE tp_refuge;

create table chat
(
    id         int auto_increment,
    nom        varchar(50)   not null,
    age        int           not null,
    lien_image varchar(1000) null,
     description varchar(50) not null,
    constraint chat_pk
        primary key (id)
);
```

# API

## Node

Utilisation de Node pour la création de l'API

### Création du projet


Créer le projet (Le fichier package.json est crée)

```bash
npm init
```

Installer les dépendences

```bash
npm install mysql
npm install express
```

Installer le projet (crée le dossier node_modules)

```bash
npm install
```

Lancer le serveur

```bash
node code/app.js
```

Le serveur est accessible à l'adresse http://localhost:3000/

### Organisation

- ```code/app.js``` : code du serveur js, contient le code de chaque route
- ```code/refuge_mysql.js``` : code des requêtes SQL utilisées
- ```index.html``` : Page principale
- ```script.js``` : script js d'appel à l'API

## Routes

Liste des routes developpées

### Liste des chats

- GET : http://localhost:3000/chats

### Récupérer un chat

- GET : http://localhost:3000/chat/?id={id_chat}
- Exemple : http://localhost:3000/chat/?id=2

### Créer un chat

- POST : http://localhost:3000/chat/


### Modifier un chat

- PUT : http://localhost:3000/chat/

### Supprimer un chat

- DELETE : http://localhost:3000/chat/?id={id_chat}
- Exemple : http://localhost:3000/chat/?id=2

## Requête SQL

Une requête SQL est crée pour chaque appel à une route d'API :

### Requêtes SQL

- Liste des chats :

```sql
SELECT *
FROM chat
  ```

- Récupérer un chat

```sql
SELECT *
FROM chat
WHERE id = 2                              
  ```

- Ajouter un chat

```sql
INSERT INTO chat (id, nom, age, lien_image, description)
VALUES (null, 'tom', 5, null, 'dors beaucoup');                       
 ```

- Modifier un chat

```sql
UPDATE chat
SET nom         = 'Tom',
    age         = 16,
    description = 'Dors encore plus'
WHERE id = 9
```

- Supprimer un chat

```sql
DELETE
FROM chat
WHERE id = 9
```

## Front

Fonctions dans script.js : 

- ```appel_chats``` : Appel à l'API pour récupérer les chats, puis maj de la table HTML
- ```ajouter_chat```: Récupère les données du formulaire et appelle l'API pour ajouter un chat
- ```enlever_chat```: Appel l'API pour enlever le chat, maj de la table HTML

# FAQ

## MySQL8.0 et Node

Erreur

```bash
 ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

dans MySql lancer

```sql
ALTER USER 'utilisateur'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdp';
flush privileges;
```

https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

# Liens

- https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466277-creez-une-application-express
- https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-fr
- https://sql.sh/
- https://stackoverflow.com/questions/39876110/how-to-enable-delete-request
-https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
