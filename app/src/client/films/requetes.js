// let listePatients = null;

const formaterDonneesFormData = (formData) => {
    const conteneur = new URLSearchParams();
    for (const paire of formData) {
        conteneur.append(paire[0], paire[1]);
    }
    return conteneur;
}

let req_Lister = () => {
  document.getElementById('contenu').innerHTML = `
                                                  <div class="d-flex justify-content-center">
                                                     <h3 role="alert"> Merci de patienter , j'utilise une bdd à distance. Sa prends de temps pour se connecter !!</h3>
                                                  </div>
                                                  <div class="d-flex justify-content-center">
                                                    <div class="spinner-border text-warning" role="status">
                                                      <span class="sr-only"></span>
                                                    </div>
                                                  </div>
                                                `;
    $.ajax({
        url: "/film",
        type: "POST",
        data: { action: "lister" },
        dataType: "json"
    }).done(reponse => {
        listerFilms(reponse.listeFilms);
    }).fail(e => {
        alert(JSON.stringify(e));
    });
}

let enregistrer = () => {
    let formFilm = new FormData(document.getElementById('formEnreg'));
    formFilm.append("action", "enregistrer"); // Pour le contrôleur
    let donneesFilm = formaterDonneesFormData(formFilm);// Dans global.js
    $.ajax({
        url: "/film",
        type: "POST",
        data: donneesFilm,
        dataType: "json",
        processData: false
    }).done(reponse => {
        document.getElementById('msgE').classList.remove("d-none");
        document.getElementById('msgE').classList.add("d-block");
        document.getElementById('msgE').innerHTML = reponse.msg;
        req_Lister();
    }).fail(e => {
        document.getElementById('msgE').innerHTML = "Problème avec la requête enregistrer.";
    });
}

let enlever = () => {
    let formFilm = new FormData(document.getElementById('formEnlever'));
    formFilm.append("action", "enlever"); // Pour le contrôleur
    let donneesFilm = formaterDonneesFormData(formFilm);// Dans global.js
    $.ajax({
        url: "/film",
        type: "POST",
        data: donneesFilm,
        dataType: "json",
        processData: false
    }).done(reponse => {
        document.getElementById('msgS').classList.remove("d-none");
        document.getElementById('msgS').classList.add("d-block");
        document.getElementById('msgS').innerHTML = reponse.msg;
        req_Lister();
    }).fail(e => {
        document.getElementById('msgS').innerHTML = reponse.msg;
    });
}