"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ctl_Films_gestionActions = exports.Mdl_Films_enlever = exports.Mdl_Films_lister = exports.Mdl_Films_enregistrer = void 0;
const dbconf_1 = require("../config/dbconf");
let reponse = { OK: true, msg: "", listeFilms: {} };
const Mdl_Films_enregistrer = async (req) => {
    let num = req.body.num;
    let titre = req.body.titre;
    let classement = req.body.classement;
    let categorie = req.body.categorie;
    try {
        const connexion = await (0, dbconf_1.obtenirConnexion)();
        const requete = "INSERT INTO films VALUES(?,?,?,?)";
        await connexion.query(requete, [num, titre, classement, categorie]);
        reponse.msg = "Film bien enregistré.";
    }
    catch (e) {
        reponse.OK = false;
        reponse.msg = "Problème pour enregistrer le film";
    }
    finally {
        return reponse;
    }
};
exports.Mdl_Films_enregistrer = Mdl_Films_enregistrer;
const Mdl_Films_lister = async () => {
    try {
        const connexion = await (0, dbconf_1.obtenirConnexion)();
        const requete = "SELECT * FROM films";
        let resultat = await connexion.query(requete, []);
        reponse.listeFilms = resultat[0];
    }
    catch (e) {
        reponse.OK = false;
        reponse.msg = "Problème pour lister les films.";
    }
    finally {
        return reponse;
    }
};
exports.Mdl_Films_lister = Mdl_Films_lister;
const Mdl_Films_enlever = async (req) => {
    const num = req.body.num;
    // console.log(num);
    try {
        const connexion = await (0, dbconf_1.obtenirConnexion)();
        const requete = "DELETE FROM films WHERE numFilm=?";
        let resultat = await connexion.query(requete, [num]);
        let resultatJSON = resultat[0];
        console.log(resultatJSON.affectedRows);
        if (resultatJSON.affectedRows > 0) {
            reponse.msg = "Film supprimé.";
        }
        else {
            reponse.msg = "Film introuvable.";
        }
    }
    catch (e) {
        reponse.OK = false;
        reponse.msg = "Problème pour enlever le film.";
    }
    finally {
        return reponse;
    }
};
exports.Mdl_Films_enlever = Mdl_Films_enlever;
// Le rapartiteur (dispatcher)
const Ctl_Films_gestionActions = async (req) => {
    let action = req.body.action;
    switch (action) {
        case "enregistrer":
            // Appel au modèle
            return await Mdl_Films_enregistrer(req);
        case "lister":
            // Appel au modèle
            return await Mdl_Films_lister();
        case "enlever":
            // Appel au modèle
            return await Mdl_Films_enlever(req);
        default:
            return {};
    }
};
exports.Ctl_Films_gestionActions = Ctl_Films_gestionActions;
