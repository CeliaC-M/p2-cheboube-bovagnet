// Contient les accès à la base MYSQL

function searchCats(connection, callback) {

    // requête SQL pour récupérer tout les chats
    const sql = 'SELECT * FROM chat'

    connection.query(sql, function (err, rows, fields) {

        if (err)
            callback(err, null)    // erreur -> renvoi de l'erreur

        const cats = [];

        // transformation résultats SQL en objet js
        rows.forEach(row => {
            const cat = {
                id: row.id,
                nom: row.nom,
                age: row.age,
                description: row.description
            };

            cats.push(cat)
        })

        callback(null, cats) // ok -> envoi des résultats
    });
}

function getCat(connection, id, callback) {

    // requête SQL pour récupérer un chat par identifiant
    const sql = 'SELECT * FROM chat WHERE id = ?'

    connection.query(sql, [id],function (err, rows, fields) {

        if (err)
            callback(err, null)    // erreur -> renvoi de l'erreur

        if (rows.length === 0)
            callback("No cat", null)
        else {
            const row = rows[0] // requête par identifiant -> une seule ligne
            const cat = {
                id: row.id,
                nom: row.nom,
                age: row.age,
                description: row.description
            };

            callback(null, cat) // ok -> envoi du résultats
        }
    });
}

function postCat(connection, cat, callback) {
    const sql = 'INSERT INTO chat (id, nom, age, lien_image, description) VALUES (?,?,?,?,?)'

    console.log("postCat",cat)
    connection.query(
        sql,
        [null, cat.nom, cat.age, null, cat.description],
        function (err, rows, fields) {

            if (err)
                callback(err, null)    // erreur -> renvoi de l'erreur
            else
                callback(null, "The cat " + cat.nom + " is in the refuge")
        }
    );
}

function putCat(connection, cat, callback) {
    const sql = 'UPDATE chat SET nom=?, age=?, description=? WHERE id = ?'

    connection.query(
        sql,
        [cat.nom, cat.age, cat.description, cat.id],
        function (err, rows, fields) {

            if (err)
                callback(err, null)    // erreur -> renvoi de l'erreur
            else
                callback(null, "Chat mAj")
        }
    );
}

function deleteCat(connection, id, callback) {
    const sql = 'DELETE FROM chat WHERE id = ?'

    connection.query(
        sql,
        [id],
        function (err, rows, fields) {

            if (err)
                callback(err, null)    // erreur -> renvoi de l'erreur
            else
                callback(null, "Cat adopted")
        }
    );
}

// export de la fonction pour pouvoir la réutiliser dans d'autre scripts
exports.searchCats = searchCats
exports.getCat = getCat
exports.postCat = postCat
exports.putCat = putCat
exports.deleteCat = deleteCat

