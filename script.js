function affiche_chats(chats) {

    let table = document.getElementById('chats')
    table.innerHTML = ''; // la liste est effacée à chaque appel

    chats.forEach(chat => {

        // creation ligne
        let tr = document.createElement('tr')
        tr.setAttribute('id_chat', chat.id)

        // creation des colonnes nom,age,description pour la ligne
        let nom = document.createElement('td')
        nom.innerHTML = chat.nom
        tr.appendChild(nom)

        let age = document.createElement('td')
        age.innerHTML = chat.age
        tr.appendChild(age)

        let description = document.createElement('td')
        description.innerHTML = chat.description
        tr.appendChild(description)

        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-success')
        btn.innerText = 'Adopter'
        btn.addEventListener("click", function () {
            adopter_chat(chat.id)
        })

        let adopter = document.createElement('td')
        adopter.append(btn)
        tr.appendChild(adopter)

        table.append(tr)
    })
}

function appel_chats() {
    fetch('http://localhost:3000/chats')
        .then((resp) => resp.json())
        .then(function (data) {
            affiche_chats(data)
            return data;
        })
}

function adopter_chat(id) {
    fetch('http://localhost:3000/chat?id=' + id, {
        method: "DELETE",
    }).then(() => {
        alert("Cat adopted")
        appel_chats();

    })
}

function ajouter_chat() {
    let nom = document.getElementById('nom_chat')
    let description = document.getElementById('description_chat')
    let age = document.getElementById('age_chat')

    fetch('http://localhost:3000/chat', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom: nom.value,
            description: description.value,
            age: age.value,
        })
    }).then(() => {
        alert("Cat created")
        appel_chats();
    })
}

appel_chats()
