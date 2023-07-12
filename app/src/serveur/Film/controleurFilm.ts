import express from "express";
import { obtenirConnexion } from "../config/dbconf";

let reponse = { OK: true, msg: "", listeFilms: {} };

const Mdl_Films_enregistrer = async (req: express.Request): Promise<object> => {
  let num = req.body.num;
  let titre = req.body.titre;
  let classement = req.body.classement;
  let categorie = req.body.categorie;
  try {
    const connexion = await obtenirConnexion();
    const requete = "INSERT INTO films VALUES(?,?,?,?)";
    await connexion.query(requete, [num, titre, classement, categorie]);
    reponse.msg = "Film bien enregistré.";
  } catch (e) {
    reponse.OK = false;
    reponse.msg = "Problème pour enregistrer le film";
  } finally {
    return reponse;
  }
}

const Mdl_Films_lister = async (): Promise<object> => {
  try {
    const connexion = await obtenirConnexion();
    const requete = "SELECT * FROM films";
    let resultat = await connexion.query(requete, []);
    reponse.listeFilms = resultat[0];
  } catch (e) {
    reponse.OK = false;
    reponse.msg = "Problème pour lister les films."
  } finally {
    return reponse;
  }
}

const Mdl_Films_enlever = async (req: express.Request): Promise<object> => {
  const num = req.body.num;
  // console.log(num);
  try {
    const connexion = await obtenirConnexion();
    const requete = "DELETE FROM films WHERE numFilm=?";
    let resultat: any = await connexion.query(requete, [num]);
    let resultatJSON = resultat[0];
    console.log(resultatJSON.affectedRows);
    if (resultatJSON.affectedRows > 0) {
      reponse.msg = "Film supprimé."
    } else {
      reponse.msg = "Film introuvable."
    }

  } catch (e) {
    reponse.OK = false;
    reponse.msg = "Problème pour enlever le film.";
  } finally {
    return reponse;
  }
}


// Le rapartiteur (dispatcher)
const Ctl_Films_gestionActions = async (req: express.Request): Promise<object> => {
  let action: string = req.body.action;
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

export {Mdl_Films_enregistrer, Mdl_Films_lister, Mdl_Films_enlever, Ctl_Films_gestionActions};