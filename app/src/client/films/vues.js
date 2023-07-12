const creerEntete = () => {
    return `
    <button type="button" class="btn-close btn_fermer" onClick="location.href='/';" aria-label="Close"></button>
        <caption class="table_titre">LISTE DES FILMS </caption>

        <table class="table table-striped table-hover table_style table-dark">
            <thead>
                <tr>
                    <th scope="col">Numéro</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Classement</th>
                    <th scope="col">Catégorie</th>
                </tr>
            </thead>
            <tbody>
    `;
}

const creerLigneDonnees = (unFilm) => {
    return `
        <tr>
            <th scope="row">${unFilm.numFilm}</th>
            <td>${unFilm.Titre}</td>
            <td>${unFilm.Classement}</td>
            <td>${unFilm.Catégorie}</td>
        </tr>
    `;
}
const listerFilms = (listeFilms) => {
    let contenu = creerEntete();
    for (let unFilm of listeFilms) {
        contenu += creerLigneDonnees(unFilm);
    }
    contenu += "</tbody></table>";
    document.getElementById('contenu').innerHTML = contenu;
}

const montrerFormEnlever = () => {
    const formContainer = document.getElementById('idForms');
    formContainer.classList.remove("d-none");
    formContainer.classList.add("d-block");
    const form = `
        <form class="row g-3" id="formEnlever">
            <div class="col-md-4">
                <label for="num" class="form-label">Numéro</label>
                <input type="number" min="0" class="form-control" id="num" name="num" required>
            </div>
            <div class="col-12">
                <button class="btn btn-warning" type="button" onClick="enlever();">Envoyer</button>
                <p id="msgS" class="d-none p-3 mb-2 mt-2 bg-danger text-white rounded-1"></p>
            </div>
        </form>
    `;
    formContainer.innerHTML = form;
  req_Lister();
}
const montrerFormEnreg = () => {
    const formContainer = document.getElementById('idForms');
    formContainer.classList.remove("d-none");
    formContainer.classList.add("d-block");
    const form = `
                <form class="row g-3" id="formEnreg">
                <div class="col-md-3">
                    <label for="num" class="form-label">Numero</label>
                    <input type="number" min="0" class="form-control" id="num" name="num" required>
                </div>
                <div class="col-md-3">
                    <label for="titre" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="titre" name="titre" required>
                </div>
                <div class="col-md-3">
                    <label for="classement" class="form-label">Classement</label>
                    <input type="text" class="form-control" id="classement" name="classement" required>
                </div>
                <div class="col-md-3">
                    <label for="categorie" class="form-label">Categorie</label>
                    <input type="text" class="form-control" id="categorie" name="categorie" required>
                </div>
                <div class="col-12">
                    <button class="btn btn-warning" type="button"
                        onClick="enregistrer();">Enregister</button>
                    <p id="msgE" class="d-none p-3 mb-2 mt-2 bg-success text-white rounded-1"></p>
                </div>
            </form>
    `;
    formContainer.innerHTML = form;
  req_Lister();
}
